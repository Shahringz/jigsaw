import json, os, time, urllib.request, urllib.error
BASE="http://127.0.0.1:4444"
SITE="https://jigsawstudio.ir"
def request(path, body=None, method=None):
    r=urllib.request.Request(BASE+path, data=json.dumps(body).encode() if body is not None else None,headers={"Content-Type":"application/json"},method=method)
    try:
        with urllib.request.urlopen(r, timeout=60) as response: return json.load(response)["value"]
    except urllib.error.HTTPError as error:
        raise RuntimeError(f"Safari WebDriver {error.code}: {error.read().decode(errors='replace')}") from error
session=None
for i in range(10):
    try:
        session=request("/session",{"capabilities":{"alwaysMatch":{"browserName":"safari"}}})["sessionId"]
        break
    except Exception as exc:
        print(f"Safari startup attempt {i+1}/10: {exc}", flush=True)
        if i==9: raise
        time.sleep(2)
try:
    root="/session/"+session
    for route in ["/","/fa/contact/","/en/contact/","/ar/contact/"]:
        request(root+"/url",{"url":SITE+route+"?rev="+os.environ["EXPECTED_RELEASE"]})
        result=request(root+"/execute/async",{"script":"""
const done=arguments[arguments.length-1];
const links=[...document.querySelectorAll('link[rel="icon"],link[rel="apple-touch-icon"],link[rel="mask-icon"]')];
const png=links.find(l=>l.getAttribute('sizes')==='32x32'&&l.type==='image/png');
if(!png){done({ok:false,reason:'Missing PNG favicon'});return;}
const image=new Image();
image.onload=()=>{const c=document.createElement('canvas');c.width=image.width;c.height=image.height;const ctx=c.getContext('2d');ctx.drawImage(image,0,0);const p=ctx.getImageData(0,0,c.width,c.height).data;done({ok:image.width===32&&image.height===32&&p[3]===0&&links.some(l=>l.rel==='apple-touch-icon')&&links.some(l=>l.rel==='mask-icon'),revision:document.querySelector('meta[name="jigsaw-release"]')?.content,userAgent:navigator.userAgent});};
image.onerror=()=>done({ok:false,reason:'PNG did not load'});
image.src=png.href;
""","args":[]})
        assert result["ok"] and result["revision"]==os.environ["EXPECTED_RELEASE"],result
        print("PASS Safari document and favicon decoding",route,result["userAgent"],flush=True)
finally:
    if session: request("/session/"+session,method="DELETE")
