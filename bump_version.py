#!/usr/bin/env python3
"""Incrémente le numéro de version affiché dans le jeu (v.N) et le cache du service worker.
Usage : python3 bump_version.py        (N -> N+1)
        python3 bump_version.py 50     (fixe N à 50)"""
import re, sys
html = open("index.html", encoding="utf8").read()
cur = int(re.search(r"const GAME_VERSION = (\d+);", html).group(1))
new = int(sys.argv[1]) if len(sys.argv) > 1 else cur + 1
html = re.sub(r"const GAME_VERSION = \d+;", f"const GAME_VERSION = {new};", html, count=1)
open("index.html", "w", encoding="utf8").write(html)
sw = open("sw.js", encoding="utf8").read()
sw = re.sub(r'const CACHE = "nine-heavens-[^"]*";', f'const CACHE = "nine-heavens-v{new}";', sw, count=1)
open("sw.js", "w", encoding="utf8").write(sw)
print(f"v.{cur} -> v.{new}")
