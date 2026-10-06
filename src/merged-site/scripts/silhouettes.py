"""Painterly placeholder portrait studies (stand-ins until painted portraits land).

Each study: paper sheet, loose halo wash, a bust silhouette with broken
watercolour edges, granulation and a few darker stroke accents.
"""
from PIL import Image, ImageDraw, ImageFilter, ImageChops
import math, os, random

OUT = "/home/user/albion/public/img"


def study(out, tint, seed):
    rnd = random.Random(seed)
    W, H = 900, 1125
    paper = (247, 243, 232)
    im = Image.new("RGB", (W, H), paper)

    # faint paper wash gradient
    grad = Image.new("L", (1, H))
    for y in range(H):
        grad.putpixel((0, y), int(14 * math.sin(y / H * math.pi * 0.9)))
    im = Image.composite(Image.new("RGB", (W, H), (236, 231, 217)), im, grad.resize((W, H)))

    # loose halo wash behind the bust
    halo = Image.new("L", (W, H), 0)
    hd = ImageDraw.Draw(halo)
    hd.ellipse((150, 170, 760, 830), fill=70)
    hd.ellipse((210, 240, 700, 760), fill=95)
    halo = halo.filter(ImageFilter.GaussianBlur(60))
    halo = halo.point(lambda v: int(v * 0.55))
    im = Image.composite(Image.new("RGB", (W, H), tint), im, halo)

    # bust mask with broken edges
    mask = Image.new("L", (W, H), 0)
    d = ImageDraw.Draw(mask)
    d.ellipse((450 - 118, 430 - 148, 450 + 118, 430 + 148), fill=255)   # head
    d.polygon([(390, 545), (510, 545), (522, 700), (378, 700)], fill=255)  # neck
    d.ellipse((450 - 250, 700 - 90, 450 + 250, 700 + 470), fill=255)   # shoulders
    # bite irregular chunks out of the edge (dry brush)
    for _ in range(26):
        x = rnd.randint(140, W - 140)
        y = rnd.choice([rnd.randint(250, 340), rnd.randint(660, 760), rnd.randint(470, 570)])
        r = rnd.randint(12, 38)
        d.ellipse((x - r, y - r, x + r, y + r), fill=0)
    mask = mask.filter(ImageFilter.GaussianBlur(3))
    # re-soften: keep body solid but edges painterly
    mask = mask.point(lambda v: 255 if v > 150 else int(v * 1.2))
    mask = mask.filter(ImageFilter.GaussianBlur(1.4))

    # body wash: vertical gradient of the tint + side shadow
    body = Image.new("RGB", (W, H), tint)
    shade = Image.new("L", (W, 1))
    for x in range(W):
        shade.putpixel((x, 0), int(46 * math.exp(-((x - W * 0.78) ** 2) / (2 * (W * 0.34) ** 2))))
    shade = shade.resize((W, H))
    body = ImageChops.subtract(body, Image.merge("RGB", (shade, shade, shade)))
    light = Image.new("L", (W, 1))
    for x in range(W):
        light.putpixel((x, 0), int(30 * math.exp(-((x - W * 0.3) ** 2) / (2 * (W * 0.22) ** 2))))
    light = light.resize((W, H))
    body = ImageChops.add(body, Image.merge("RGB", (light, light, light)))

    im = Image.composite(body, im, mask)

    # sketch outline: eroded mask difference = contour line in muted ochre
    eroded = mask.filter(ImageFilter.MinFilter(9))
    edge = ImageChops.subtract(mask, eroded).filter(ImageFilter.GaussianBlur(0.8))
    edge = edge.point(lambda v: int(v * 0.8))
    im = Image.composite(Image.new("RGB", (W, H), (122, 100, 66)), im, edge)

    # granulation + bloom
    noise = Image.effect_noise((W, H), 22).convert("L")
    grain = noise.point(lambda v: max(0, v - 121) // 2)
    im = Image.composite(Image.new("RGB", (W, H), (126, 124, 112)), im, grain)
    bloom = noise.filter(ImageFilter.GaussianBlur(30)).point(lambda v: max(0, v - 140) // 3)
    im = Image.composite(Image.new("RGB", (W, H), (252, 250, 242)), im, bloom)

    # a couple of darker accent strokes on the shoulder line
    acc = Image.new("L", (W, H), 0)
    ad = ImageDraw.Draw(acc)
    ad.arc((120, 620, 560, 1000), 200, 340, fill=90, width=10)
    ad.arc((420, 600, 860, 980), 200, 340, fill=70, width=8)
    acc = acc.filter(ImageFilter.GaussianBlur(7))
    im = Image.composite(Image.new("RGB", (W, H), (96, 98, 88)), im, acc)

    im.save(os.path.join(OUT, out), quality=86, optimize=True, progressive=True)
    print(out, os.path.getsize(os.path.join(OUT, out)) // 1024, "KB")


study("portrait-2.jpg", (168, 176, 152), 7)
study("portrait-3.jpg", (172, 166, 158), 11)
study("portrait-4.jpg", (188, 172, 142), 23)
