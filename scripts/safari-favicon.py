"""Native Safari smoke check. Use synchronous commands and bounded image polling."""
import json
import os
import time
import urllib.error
import urllib.request

BASE = "http://127.0.0.1:4444"
SITE = "https://jigsawstudio.ir"
REV = os.environ["EXPECTED_RELEASE"]

def request(path, body=None, method=None):
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(BASE+path, data=data, headers={"Content-Type":"application/json"}, method=method)
    try:
        with urllib.request.urlopen(req, timeout=100) as response:
            return json.load(response)["value"]
    except urllib.error.HTTPError as exc:
        raise RuntimeError(f"Safari WebDriver {exc.code}: {exc.read().decode(errors='replace')}") from exc

def start_session():
    for attempt in range(3):
        try:
            request("/status")
            value = request("/session", {"capabilities":{"alwaysMatch":{"browserName":"safari","pageLoadStrategy":"normal"}}})
            return value["sessionId"]
        except Exception as exc:
            print(f"Safari session attempt {attempt+1}/3: {exc}", flush=True)
            if attempt == 2:
                raise
            time.sleep(4)

def execute(root, script):
    return request(root+"/execute/sync", {"script":script,"args":[]})

def check_page(root, route):
    request(root+"/url", {"url":SITE+route+"?rev="+REV})
    meta = execute(root, """
const links = [...document.querySelectorAll('link[rel="icon"],link[rel="apple-touch-icon"],link[rel="mask-icon"]')];
const png = links.find(l=>l.getAttribute('sizes')==='32x32' && l.type==='image/png');
const revision = document.querySelector('meta[name="jigsaw-release"]')?.content;
if (!png) return {ok:false, reason:'Missing 32px PNG', revision};
const image=document.createElement('img');
image.id='jigsaw-safari-icon-probe';
image.loading='eager';
image.alt='';
image.style.cssText='position:absolute;left:0;top:0;width:32px;height:32px;pointer-events:none;opacity:0.01';
document.body.appendChild(image);
image.src=png.href;
return {ok:links.some(l=>l.rel==='apple-touch-icon') && links.some(l=>l.rel==='mask-icon'), revision, url:png.href, userAgent:navigator.userAgent};
""")
    assert meta["ok"] and meta["revision"] == REV, (route, meta)
    deadline = time.monotonic()+45
    while time.monotonic()<deadline:
        result=execute(root, """
const image=document.getElementById('jigsaw-safari-icon-probe');
if(!image || !image.complete) return {state:'loading'};
if(!image.naturalWidth) return {state:'error',reason:'Image could not be decoded'};
try {
  const canvas=document.createElement('canvas');
  canvas.width=image.naturalWidth;canvas.height=image.naturalHeight;
  const ctx=canvas.getContext('2d');
  ctx.drawImage(image,0,0);
  return {state:'ready',width:canvas.width,height:canvas.height,alpha:ctx.getImageData(0,0,1,1).data[3]};
} catch(e) {return {state:'error',reason:String(e)};}
""")
        if result["state"]=="ready":
            assert (result["width"],result["height"],result["alpha"]) == (32,32,0), (route,result)
            print("PASS native Safari favicon decoding",route,meta["userAgent"],flush=True)
            return
        if result["state"]=="error":
            raise AssertionError((route,result))
        time.sleep(1)
    raise TimeoutError(f"Safari image loading did not finish: {route}")

session = start_session()
root = "/session/"+session
try:
    request(root+"/timeouts", {"script":60000,"pageLoad":90000,"implicit":0})
    request(root+"/url", {"url":"about:blank"})
    assert execute(root, "return 2+2") == 4, "Native Safari empty-page preflight failed"
    print("PASS native Safari session preflight",flush=True)
    for route in ["/","/fa/contact/","/en/contact/","/ar/contact/"]:
        check_page(root,route)
finally:
    try:
        request(root,method="DELETE")
    except Exception as exc:
        print("Safari cleanup:",exc,flush=True)
