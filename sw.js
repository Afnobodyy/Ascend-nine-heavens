// Service worker : met tout le jeu en cache pour jouer hors ligne.
const CACHE = "nine-heavens-v112"; // synchronisé avec GAME_VERSION (index.html) par bump_version.py
const FILES = ["./", "index.html", "pixelfx.js", "manifest.webmanifest", "icon-192.png", "icones-sorts.png", "icon-512.png", "apple-touch-icon.png", "fonts/ShipporiMinchoB1-600-0.woff2", "fonts/ShipporiMinchoB1-600-1.woff2", "fonts/ShipporiMinchoB1-600-10.woff2", "fonts/ShipporiMinchoB1-600-11.woff2", "fonts/ShipporiMinchoB1-600-12.woff2", "fonts/ShipporiMinchoB1-600-13.woff2", "fonts/ShipporiMinchoB1-600-14.woff2", "fonts/ShipporiMinchoB1-600-15.woff2", "fonts/ShipporiMinchoB1-600-16.woff2", "fonts/ShipporiMinchoB1-600-17.woff2", "fonts/ShipporiMinchoB1-600-18.woff2", "fonts/ShipporiMinchoB1-600-19.woff2", "fonts/ShipporiMinchoB1-600-2.woff2", "fonts/ShipporiMinchoB1-600-20.woff2", "fonts/ShipporiMinchoB1-600-21.woff2", "fonts/ShipporiMinchoB1-600-22.woff2", "fonts/ShipporiMinchoB1-600-23.woff2", "fonts/ShipporiMinchoB1-600-24.woff2", "fonts/ShipporiMinchoB1-600-25.woff2", "fonts/ShipporiMinchoB1-600-3.woff2", "fonts/ShipporiMinchoB1-600-4.woff2", "fonts/ShipporiMinchoB1-600-5.woff2", "fonts/ShipporiMinchoB1-600-6.woff2", "fonts/ShipporiMinchoB1-600-7.woff2", "fonts/ShipporiMinchoB1-600-8.woff2", "fonts/ShipporiMinchoB1-600-9.woff2", "fonts/ShipporiMinchoB1-800-26.woff2", "fonts/ShipporiMinchoB1-800-27.woff2", "fonts/ShipporiMinchoB1-800-28.woff2", "fonts/ShipporiMinchoB1-800-29.woff2", "fonts/ShipporiMinchoB1-800-30.woff2", "fonts/ShipporiMinchoB1-800-31.woff2", "fonts/ShipporiMinchoB1-800-32.woff2", "fonts/ShipporiMinchoB1-800-33.woff2", "fonts/ShipporiMinchoB1-800-34.woff2", "fonts/ShipporiMinchoB1-800-35.woff2", "fonts/ShipporiMinchoB1-800-36.woff2", "fonts/ShipporiMinchoB1-800-37.woff2", "fonts/ShipporiMinchoB1-800-38.woff2", "fonts/ShipporiMinchoB1-800-39.woff2", "fonts/ShipporiMinchoB1-800-40.woff2", "fonts/ShipporiMinchoB1-800-41.woff2", "fonts/ShipporiMinchoB1-800-42.woff2", "fonts/ShipporiMinchoB1-800-43.woff2", "fonts/ShipporiMinchoB1-800-44.woff2", "fonts/ShipporiMinchoB1-800-45.woff2", "fonts/ShipporiMinchoB1-800-46.woff2", "fonts/ShipporiMinchoB1-800-47.woff2", "fonts/ShipporiMinchoB1-800-48.woff2", "fonts/ShipporiMinchoB1-800-49.woff2", "fonts/ShipporiMinchoB1-800-50.woff2", "fonts/ShipporiMinchoB1-800-51.woff2", "fonts/ZenKakuGothicNew-400-52.woff2", "fonts/ZenKakuGothicNew-400-53.woff2", "fonts/ZenKakuGothicNew-400-54.woff2", "fonts/ZenKakuGothicNew-400-55.woff2", "fonts/ZenKakuGothicNew-400-56.woff2", "fonts/ZenKakuGothicNew-400-57.woff2", "fonts/ZenKakuGothicNew-400-58.woff2", "fonts/ZenKakuGothicNew-400-59.woff2", "fonts/ZenKakuGothicNew-400-60.woff2", "fonts/ZenKakuGothicNew-400-61.woff2", "fonts/ZenKakuGothicNew-400-62.woff2", "fonts/ZenKakuGothicNew-400-63.woff2", "fonts/ZenKakuGothicNew-400-64.woff2", "fonts/ZenKakuGothicNew-400-65.woff2", "fonts/ZenKakuGothicNew-400-66.woff2", "fonts/ZenKakuGothicNew-400-67.woff2", "fonts/ZenKakuGothicNew-400-68.woff2", "fonts/ZenKakuGothicNew-400-69.woff2", "fonts/ZenKakuGothicNew-400-70.woff2", "fonts/ZenKakuGothicNew-400-71.woff2", "fonts/ZenKakuGothicNew-400-72.woff2", "fonts/ZenKakuGothicNew-400-73.woff2", "fonts/ZenKakuGothicNew-400-74.woff2", "fonts/ZenKakuGothicNew-400-75.woff2", "fonts/ZenKakuGothicNew-400-76.woff2", "fonts/ZenKakuGothicNew-400-77.woff2", "fonts/ZenKakuGothicNew-500-100.woff2", "fonts/ZenKakuGothicNew-500-101.woff2", "fonts/ZenKakuGothicNew-500-102.woff2", "fonts/ZenKakuGothicNew-500-103.woff2", "fonts/ZenKakuGothicNew-500-78.woff2", "fonts/ZenKakuGothicNew-500-79.woff2", "fonts/ZenKakuGothicNew-500-80.woff2", "fonts/ZenKakuGothicNew-500-81.woff2", "fonts/ZenKakuGothicNew-500-82.woff2", "fonts/ZenKakuGothicNew-500-83.woff2", "fonts/ZenKakuGothicNew-500-84.woff2", "fonts/ZenKakuGothicNew-500-85.woff2", "fonts/ZenKakuGothicNew-500-86.woff2", "fonts/ZenKakuGothicNew-500-87.woff2", "fonts/ZenKakuGothicNew-500-88.woff2", "fonts/ZenKakuGothicNew-500-89.woff2", "fonts/ZenKakuGothicNew-500-90.woff2", "fonts/ZenKakuGothicNew-500-91.woff2", "fonts/ZenKakuGothicNew-500-92.woff2", "fonts/ZenKakuGothicNew-500-93.woff2", "fonts/ZenKakuGothicNew-500-94.woff2", "fonts/ZenKakuGothicNew-500-95.woff2", "fonts/ZenKakuGothicNew-500-96.woff2", "fonts/ZenKakuGothicNew-500-97.woff2", "fonts/ZenKakuGothicNew-500-98.woff2", "fonts/ZenKakuGothicNew-500-99.woff2", "fonts/ZenKakuGothicNew-700-104.woff2", "fonts/ZenKakuGothicNew-700-105.woff2", "fonts/ZenKakuGothicNew-700-106.woff2", "fonts/ZenKakuGothicNew-700-107.woff2", "fonts/ZenKakuGothicNew-700-108.woff2", "fonts/ZenKakuGothicNew-700-109.woff2", "fonts/ZenKakuGothicNew-700-110.woff2", "fonts/ZenKakuGothicNew-700-111.woff2", "fonts/ZenKakuGothicNew-700-112.woff2", "fonts/ZenKakuGothicNew-700-113.woff2", "fonts/ZenKakuGothicNew-700-114.woff2", "fonts/ZenKakuGothicNew-700-115.woff2", "fonts/ZenKakuGothicNew-700-116.woff2", "fonts/ZenKakuGothicNew-700-117.woff2", "fonts/ZenKakuGothicNew-700-118.woff2", "fonts/ZenKakuGothicNew-700-119.woff2", "fonts/ZenKakuGothicNew-700-120.woff2", "fonts/ZenKakuGothicNew-700-121.woff2", "fonts/ZenKakuGothicNew-700-122.woff2", "fonts/ZenKakuGothicNew-700-123.woff2", "fonts/ZenKakuGothicNew-700-124.woff2", "fonts/ZenKakuGothicNew-700-125.woff2", "fonts/ZenKakuGothicNew-700-126.woff2", "fonts/ZenKakuGothicNew-700-127.woff2", "fonts/ZenKakuGothicNew-700-128.woff2", "fonts/ZenKakuGothicNew-700-129.woff2", "music/aluna-1.mp3", "music/aluna-3.mp3", "music/menu-theme-1.mp3", "music/menu-theme-2.mp3"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES.map(f => new Request(f, { cache: "reload" })))).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.startsWith("nine-heavens-") && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// Les musiques sont lues avec <audio>, qui demande des morceaux (Range) : on les découpe depuis le cache.
async function rangeResponse(req, res) {
  const buf = await res.arrayBuffer();
  const m = /bytes=(\d*)-(\d*)/.exec(req.headers.get("range") || "");
  const size = buf.byteLength;
  let start = m && m[1] ? +m[1] : 0;
  let end = m && m[2] ? +m[2] : size - 1;
  if (m && !m[1] && m[2]) { start = size - +m[2]; end = size - 1; }
  return new Response(buf.slice(start, end + 1), {
    status: 206,
    headers: {
      "Content-Type": res.headers.get("Content-Type") || "audio/mpeg",
      "Content-Range": `bytes ${start}-${end}/${size}`,
      "Content-Length": String(end - start + 1),
      "Accept-Ranges": "bytes"
    }
  });
}

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const key = req.mode === "navigate" ? "./" : req.url.split("#")[0];
    // Le jeu lui-même (page) : réseau d'abord, pour toujours avoir la dernière version quand on est en ligne.
    if (req.mode === "navigate") {
      try {
        const res = await fetch(req, { cache: "no-cache" });
        if (res.ok) { cache.put("./", res.clone()); cache.put("index.html", res.clone()); }
        return res;
      } catch (err) { /* hors ligne : on retombe sur le cache */ }
    }
    // pixelfx.js (effets de combat) : réseau d'abord aussi, sinon la page neuve joue avec d'anciens effets tant que le nouveau cache n'est pas actif.
    if (/\/pixelfx\.js$/.test(new URL(req.url).pathname)) {
      try { const res = await fetch(req, { cache: "no-cache" }); if (res.ok) { cache.put(key, res.clone()); return res; } } catch (err) { /* hors ligne : cache */ }
    }
    const hit = await cache.match(key, { ignoreSearch: true });
    if (hit) return req.headers.has("range") ? rangeResponse(req, hit) : hit;
    if (/\/celestial\/[^/]+\.mp4$/.test(req.url)) {   // vidéos Celestial : mises en cache à la première lecture
      try { const net = await fetch(req.url); if (net.ok) { cache.put(req.url, net.clone()); return req.headers.has("range") ? rangeResponse(req, net) : net; } return net; } catch (err) { return Response.error(); }
    }
    try { return await fetch(req); }
    catch (err) { return (await cache.match("./")) || Response.error(); }
  })());
});
