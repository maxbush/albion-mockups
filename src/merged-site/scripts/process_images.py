"""Prepare watercolour assets for the ALBION hero scene.

- keyed(): removes the paper-white background so a wash layer can be
  composited over other layers (alpha from luminance distance to paper).
- flat(): crops deckle edges and re-saves as an optimised JPEG plate.
- silhouette(): placeholder portrait studies (replaced by painted portraits later).
"""
from PIL import Image, ImageFilter, ImageDraw
import os

SRC = "/home/user"
OUT = "/home/user/albion/public/img"
os.makedirs(OUT, exist_ok=True)


def load(name):
    return Image.open(os.path.join(SRC, name)).convert("RGB")


def resize(im, max_w):
    if im.width > max_w:
        h = round(im.height * max_w / im.width)
        im = im.resize((max_w, h), Image.LANCZOS)
    return im


def paper_level(grey, pct=0.88):
    hist = grey.histogram()
    total = sum(hist)
    acc = 0
    for v, c in enumerate(hist):
        acc += c
        if acc >= total * pct:
            return v
    return 250


def keyed(name, out, max_w=2200, margin=0.045, floor_ratio=0.52, gamma=0.9, blur=0.7):
    im = load(name)
    w, h = im.size
    m_x, m_y = int(w * margin), int(h * margin)
    im = im.crop((m_x, m_y, w - m_x, h - m_y))
    im = resize(im, max_w)
    grey = im.convert("L")
    pl = paper_level(grey)
    floor = pl * floor_ratio
    span = max(1.0, pl - floor)
    lut = []
    for v in range(256):
        a = (pl - v) / span
        a = 0.0 if a < 0 else (1.0 if a > 1 else a)
        lut.append(int((a ** gamma) * 255))
    alpha = grey.point(lut).filter(ImageFilter.GaussianBlur(blur))
    rgba = im.convert("RGBA")
    rgba.putalpha(alpha)
    rgba.save(os.path.join(OUT, out), optimize=True)
    print(out, rgba.size, os.path.getsize(os.path.join(OUT, out)) // 1024, "KB")


def flat(name, out, max_w=1600, margin=0.012, quality=84):
    im = load(name)
    w, h = im.size
    m_x, m_y = int(w * margin), int(h * margin)
    im = im.crop((m_x, m_y, w - m_x, h - m_y))
    im = resize(im, max_w)
    im.save(os.path.join(OUT, out), quality=quality, optimize=True, progressive=True)
    print(out, im.size, os.path.getsize(os.path.join(OUT, out)) // 1024, "KB")


def silhouette(out, tint, seed):
    W, H = 900, 1125
    paper = (246, 242, 231)
    im = Image.new("RGB", (W, H), paper)
    # soft vertical wash
    wash = Image.new("L", (1, H))
    for y in range(H):
        wash.putpixel((0, y), int(10 * (y / H)))
    wash = wash.resize((W, H))
    im = Image.composite(Image.new("RGB", (W, H), (233, 228, 214)), im, wash)
    mask = Image.new("L", (W, H), 0)
    d = ImageDraw.Draw(mask)
    d.ellipse((450 - 148, 400 - 182, 450 + 148, 400 + 182), fill=255)          # head
    d.rectangle((450 - 78, 540, 450 + 78, 720), fill=255)                     # neck
    d.ellipse((450 - 330, 700 - 120, 450 + 330, 700 + 560), fill=255)         # shoulders
    mask = mask.filter(ImageFilter.GaussianBlur(6))
    layer = Image.new("RGB", (W, H), tint)
    im = Image.composite(layer, im, mask)
    # granulation
    noise = Image.effect_noise((W, H), 18).convert("L")
    noise = noise.point(lambda v: 128 + (v - 128) // 3)
    im = Image.composite(Image.new("RGB", (W, H), (120, 118, 108)), im,
                         noise.point(lambda v: max(0, v - 118)))
    im.save(os.path.join(OUT, out), quality=86, optimize=True, progressive=True)
    print(out, im.size, os.path.getsize(os.path.join(OUT, out)) // 1024, "KB")


# hero scene layers
keyed("hero-mid.png", "hero-mid.png", max_w=2200, floor_ratio=0.55)
keyed("hero-near.png", "hero-near.png", max_w=2200, floor_ratio=0.46, gamma=1.0)
keyed("route-spires.png", "route-spires.png", max_w=2000, floor_ratio=0.50)
flat("hero-far.png", "hero-far.jpg", max_w=2200)
# dossier / editorial plates
flat("route-school.png", "route-school.jpg", max_w=1200)
flat("route-study.png", "route-study.jpg", max_w=1200)
flat("route-campus.png", "route-campus.jpg", max_w=1200)
flat("quad-wide.png", "quad-wide.jpg", max_w=1600)
flat("oxford-detail.png", "oxford-detail.jpg", max_w=1200)
# portraits
flat("portrait-1.png", "portrait-1.jpg", max_w=900)
silhouette("portrait-2.jpg", (176, 181, 160), 2)
silhouette("portrait-3.jpg", (178, 172, 164), 3)
silhouette("portrait-4.jpg", (196, 181, 153), 4)
print("done")
