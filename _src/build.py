#!/usr/bin/env python3
"""Generatore del sito labussoladigitale.it.

Legge i file Markdown in _src/content, applica i template in _src/templates
e scrive l'HTML statico nella radice del repository (che Hostinger pubblica).

Uso:  python3 _src/build.py
"""
from __future__ import annotations

import datetime as dt
import html
import json
import re
import shutil
from pathlib import Path

import markdown
from jinja2 import Environment, FileSystemLoader, select_autoescape

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "_src"
CONTENT = SRC / "content"
TEMPLATES = SRC / "templates"
STATIC = SRC / "static"

CONFIG = json.loads((SRC / "config.json").read_text(encoding="utf-8"))
SITE_URL = CONFIG["site_url"].rstrip("/")
AMAZON_TAG = CONFIG.get("amazon_tag", "").strip()
AFFILIATE_LINKS = CONFIG.get("affiliate_links", {})

MD = markdown.Markdown(
    extensions=["tables", "toc", "attr_list", "sane_lists", "md_in_html"],
    extension_configs={"toc": {"toc_depth": "2-3", "permalink": False}},
    output_format="html5",
)

env = Environment(
    loader=FileSystemLoader(str(TEMPLATES)),
    autoescape=select_autoescape(["html"]),
    trim_blocks=True,
    lstrip_blocks=True,
)


# ---------------------------------------------------------------- utilities
def parse_front_matter(text: str) -> tuple[dict, str]:
    """Front matter minimale: righe `chiave: valore` fra due `---`."""
    if not text.startswith("---"):
        return {}, text
    _, fm, body = text.split("---", 2)
    meta: dict = {}
    for line in fm.strip().splitlines():
        if ":" not in line:
            continue
        key, value = line.split(":", 1)
        value = value.strip()
        if value.startswith("[") and value.endswith("]"):
            value = [v.strip().strip("'\"") for v in value[1:-1].split(",") if v.strip()]
        meta[key.strip()] = value
    return meta, body.lstrip("\n")


def render_markdown(body: str) -> tuple[str, str]:
    MD.reset()
    html_out = MD.convert(body)
    toc = MD.toc if getattr(MD, "toc_tokens", None) else ""
    return html_out, toc


def add_amazon_tag(html_out: str) -> str:
    """Aggiunge il tag di affiliazione a ogni link amazon.it, quando configurato."""
    if not AMAZON_TAG:
        return html_out

    def repl(m: re.Match) -> str:
        url = m.group(1)
        if "tag=" in url:
            return m.group(0)
        sep = "&" if "?" in url else "?"
        return f'href="{url}{sep}tag={AMAZON_TAG}"'

    return re.sub(r'href="(https?://(?:www\.)?amazon\.it[^"]*)"', repl, html_out)


def apply_affiliate_links(html_out: str) -> str:
    """Sostituisce i link ai produttori con il link di affiliazione, quando configurato.
    La chiave in config.json è il dominio (es. "systeme.io"); vale per home e sottopagine."""
    def repl(m: re.Match) -> str:
        url = m.group(1)
        host = re.sub(r"^https?://(www\.)?", "", url).split("/")[0]
        for domain, aff in AFFILIATE_LINKS.items():
            if host == domain or host.endswith("." + domain):
                return f'href="{aff}"'
        return m.group(0)
    return re.sub(r'href="(https?://[^"]+)"', repl, html_out)


def mark_external_links(html_out: str) -> str:
    return re.sub(
        r'<a href="(https?://(?!labussoladigitale\.it)[^"]+)"',
        r'<a href="\1" rel="nofollow sponsored noopener" target="_blank"',
        html_out,
    )


def reading_time(body: str) -> int:
    words = len(re.findall(r"\w+", body))
    return max(1, round(words / 200))


def iso(d: str) -> str:
    return dt.date.fromisoformat(d).isoformat()


def human_date(d: str) -> str:
    months = ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio",
              "agosto", "settembre", "ottobre", "novembre", "dicembre"]
    date = dt.date.fromisoformat(d)
    return f"{date.day} {months[date.month - 1]} {date.year}"


def write(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


def clean_output() -> None:
    """Rimuove l'HTML generato in precedenza, lasciando sorgenti e git."""
    keep = {"_src", ".git", ".gitignore", "README.md", ".htaccess", "CNAME"}
    for item in ROOT.iterdir():
        if item.name in keep:
            continue
        if item.is_dir():
            shutil.rmtree(item)
        else:
            item.unlink()


# ---------------------------------------------------------------- content
def load_articles() -> list[dict]:
    articles = []
    for path in sorted((CONTENT / "articoli").glob("*.md")):
        meta, body = parse_front_matter(path.read_text(encoding="utf-8"))
        if meta.get("draft") == "true":
            continue
        html_body, toc = render_markdown(body)
        html_body = mark_external_links(apply_affiliate_links(add_amazon_tag(html_body)))
        cat = next(c for c in CONFIG["categories"] if c["slug"] == meta["category"])
        article = {
            **meta,
            "body": html_body,
            "toc": toc,
            "category_obj": cat,
            "url": f"/{cat['slug']}/{meta['slug']}/",
            "date_iso": iso(meta["date"]),
            "date_human": human_date(meta["date"]),
            "updated_iso": iso(meta.get("updated", meta["date"])),
            "updated_human": human_date(meta.get("updated", meta["date"])),
            "minutes": reading_time(body),
            "pillar": meta.get("pillar") == "true",
        }
        articles.append(article)
    articles.sort(key=lambda a: a["date_iso"], reverse=True)
    return articles


def load_pages() -> list[dict]:
    pages = []
    for path in sorted((CONTENT / "pagine").glob("*.md")):
        meta, body = parse_front_matter(path.read_text(encoding="utf-8"))
        html_body, _ = render_markdown(body)
        pages.append({**meta, "body": html_body, "url": f"/{meta['slug']}/"})
    return pages


# ---------------------------------------------------------------- build
def build() -> None:
    clean_output()
    articles = load_articles()
    pages = load_pages()
    categories = []
    for c in CONFIG["categories"]:
        items = [a for a in articles if a["category"] == c["slug"]]
        categories.append({**c, "url": f"/{c['slug']}/", "articles": items,
                           "pillar": next((a for a in items if a["pillar"]), None)})

    percorsi = []
    for p in CONFIG.get("percorsi", []):
        ppath = CONTENT / "percorsi" / f"{p['slug']}.md"
        body = ""
        if ppath.exists():
            _, raw = parse_front_matter(ppath.read_text(encoding="utf-8"))
            body, _ = render_markdown(raw)
        percorsi.append({**p, "url": f"/{p['slug']}/", "body": body,
                         "sezioni_obj": [c for s in p["sezioni"] for c in categories if c["slug"] == s]})

    base_ctx = {
        "site": CONFIG,
        "site_url": SITE_URL,
        "categories": categories,
        "percorsi": percorsi,
        "year": dt.date.today().year,
        "build_date": dt.date.today().isoformat(),
    }

    # assets
    shutil.copytree(STATIC, ROOT / "assets")
    # file di verifica Google Search Console (deve stare nella radice)
    for v in STATIC.glob("google*.html"):
        shutil.copy(v, ROOT / v.name)

    # home
    write(ROOT / "index.html", env.get_template("home.html").render(
        **base_ctx, articles=articles, page_url="/", title=CONFIG["title"],
        description=CONFIG["description"]))

    # categorie
    for c in categories:
        write(ROOT / c["slug"] / "index.html", env.get_template("category.html").render(
            **base_ctx, cat=c, page_url=c["url"],
            title=f"{c['name']} · {CONFIG['name']}", description=c["description"]))

    # articoli
    for a in articles:
        related = [x for x in articles if x["category"] == a["category"] and x is not a][:4]
        write(ROOT / a["category"] / a["slug"] / "index.html", env.get_template("article.html").render(
            **base_ctx, a=a, related=related, page_url=a["url"],
            title=f"{a['title']} · {CONFIG['name']}", description=a["description"]))

    # percorsi
    for p in percorsi:
        write(ROOT / p["slug"] / "index.html", env.get_template("percorso.html").render(
            **base_ctx, p=p, page_url=p["url"],
            title=f"{p['name']} · {CONFIG['name']}", description=p["text"]))

    # pagine fisse
    for p in pages:
        write(ROOT / p["slug"] / "index.html", env.get_template("page.html").render(
            **base_ctx, p=p, page_url=p["url"],
            title=f"{p['title']} · {CONFIG['name']}", description=p.get("description", "")))

    # 404
    write(ROOT / "404.html", env.get_template("404.html").render(
        **base_ctx, page_url="/404.html", title=f"Pagina non trovata · {CONFIG['name']}",
        description=""))

    # sitemap, robots, feed
    urls = ["/"] + [c["url"] for c in categories] + [p["url"] for p in percorsi] + [a["url"] for a in articles] + [p["url"] for p in pages]
    sitemap = ['<?xml version="1.0" encoding="UTF-8"?>',
               '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for u in urls:
        last = next((a["updated_iso"] for a in articles if a["url"] == u), base_ctx["build_date"])
        sitemap.append(f"  <url><loc>{SITE_URL}{u}</loc><lastmod>{last}</lastmod></url>")
    sitemap.append("</urlset>")
    write(ROOT / "sitemap.xml", "\n".join(sitemap))
    write(ROOT / "robots.txt", f"User-agent: *\nAllow: /\nDisallow: /_src/\nSitemap: {SITE_URL}/sitemap.xml\n")

    feed = [f'<?xml version="1.0" encoding="UTF-8"?>',
            '<rss version="2.0"><channel>',
            f"<title>{html.escape(CONFIG['name'])}</title>",
            f"<link>{SITE_URL}/</link>",
            f"<description>{html.escape(CONFIG['description'])}</description>",
            "<language>it-it</language>"]
    for a in articles[:20]:
        feed.append("<item>"
                    f"<title>{html.escape(a['title'])}</title>"
                    f"<link>{SITE_URL}{a['url']}</link>"
                    f"<guid>{SITE_URL}{a['url']}</guid>"
                    f"<pubDate>{dt.datetime.fromisoformat(a['date_iso']).strftime('%a, %d %b %Y 08:00:00 +0100')}</pubDate>"
                    f"<description>{html.escape(a['description'])}</description>"
                    "</item>")
    feed.append("</channel></rss>")
    write(ROOT / "feed.xml", "\n".join(feed))

    # .htaccess: protegge i sorgenti, pagina 404, compressione e cache
    write(ROOT / ".htaccess", "\n".join([
        "RedirectMatch 404 ^/_src/",
        "ErrorDocument 404 /404.html",
        "AddDefaultCharset UTF-8",
        "<IfModule mod_deflate.c>",
        "  AddOutputFilterByType DEFLATE text/html text/css application/javascript image/svg+xml application/xml",
        "</IfModule>",
        "<IfModule mod_expires.c>",
        "  ExpiresActive On",
        "  ExpiresByType text/css \"access plus 7 days\"",
        "  ExpiresByType image/svg+xml \"access plus 30 days\"",
        "  ExpiresByType image/png \"access plus 30 days\"",
        "  ExpiresByType image/webp \"access plus 30 days\"",
        "</IfModule>",
        "",
    ]))

    print(f"Sito generato: {len(articles)} articoli, {len(categories)} categorie, {len(pages)} pagine.")


if __name__ == "__main__":
    build()
