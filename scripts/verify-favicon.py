import hashlib, pathlib, re, struct, time, urllib.request, json, os
from html.parser import HTMLParser
from xml.etree import ElementTree
BASE = os.environ.get("SITE_URL", "https://jigsawstudio.ir").rstrip("/")
REV = os.environ["EXPECTED_RELEASE"]
ROOT = pathlib.Path("public/icons/jigsaw-a")
FILES = {"favicon.ico":None,"favicon.svg":None,"favicon-16x16.png":16,"favicon-32x32.png":32,"favicon-48x48.png":48,"apple-touch-icon.png":180,"android-chrome-192x192.png":192,"android-chrome-512x512.png":512,"safari-pinned-tab-v2.svg":None,"site.webmanifest":None}
def fetch(path):
    req=urllib.request.Request(BASE+path,headers={"User-Agent":"JIGSAW-Favicon-Check/1.0","Cache-Control":"no-cache"})
    with urllib.request.urlopen(req,timeout=20) as r:
        return r.read(),r.headers.get_content_type()
class Head(HTMLParser):
    def __init__(self): super().__init__(); self.links=[]; self.revision=None
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if tag=="link": self.links.append(a)
        if tag=="meta" and a.get("name")=="jigsaw-release": self.revision=a.get("content")
def head(path):
    h=Head(); h.feed(fetch(path+"?rev="+REV)[0].decode()); return h
for attempt in range(24):
    try:
        revisions = {p: head(p).revision for p in ["/","/fa/contact/","/en/contact/","/ar/contact/"]}
        assert all(value==REV for value in revisions.values()), f"Expected {REV}; received {revisions}"
        break
    except Exception as exc:
        print(f"Release check {attempt+1}/24: {exc}", flush=True)
        if attempt==23: raise
        time.sleep(10)
for path in ["/","/fa/contact/","/en/contact/","/ar/contact/"]:
    h=head(path)
    for rel,name in [("icon","favicon.ico"),("icon","favicon.svg"),("icon","favicon-16x16.png"),("icon","favicon-32x32.png"),("icon","favicon-48x48.png"),("apple-touch-icon","apple-touch-icon.png"),("mask-icon","safari-pinned-tab-v2.svg"),("manifest","site.webmanifest")]:
        assert any(l.get("rel")==rel and l.get("href","").endswith("/icons/jigsaw-a/"+name) for l in h.links),(path,rel,name)
    assert not any("media/mark.webp" in l.get("href","") and l.get("rel")=="icon" for l in h.links)
    print("PASS icon declarations",path,flush=True)
for name,size in FILES.items():
    content,mime=fetch("/icons/jigsaw-a/"+name+"?rev="+REV)
    assert content==(ROOT/name).read_bytes(),("Live asset differs",name)
    if size:
        assert mime=="image/png",(name,mime)
        assert content[:8]==b"\x89PNG\r\n\x1a\n" and struct.unpack(">II",content[16:24])==(size,size),name
        if name.startswith("favicon-"): assert content[25] in (4,6) or b"tRNS" in content,("No alpha",name)
    if name.endswith(".svg"):
        assert mime=="image/svg+xml",(name,mime)
        svg=ElementTree.fromstring(content)
        if name.startswith("safari"): assert svg.attrib["viewBox"]=="0 0 16 16" and len(svg)==1 and svg[0].attrib["fill"]=="#000"
    if name.endswith(".ico"):
        assert content[:4]==b"\x00\x00\x01\x00"
        count=struct.unpack("<H",content[4:6])[0]
        assert {16,32,48}.issubset({content[6+16*i] for i in range(count)})
    print("PASS public asset",name,mime,flush=True)
print("All favicon assets verified on the live domain.",flush=True)
