if (!self.define) {
    let e,
        s = {};
    const i = (i, n) => (
        (i = new URL(i + ".js", n).href),
        s[i] ||
            new Promise((s) => {
                if ("document" in self) {
                    const e = document.createElement("script");
                    (e.src = i), (e.onload = s), document.head.appendChild(e);
                } else (e = i), importScripts(i), s();
            }).then(() => {
                let e = s[i];
                if (!e)
                    throw new Error(`Module ${i} didn’t register its module`);
                return e;
            })
    );
    self.define = (n, a) => {
        const t =
            e ||
            ("document" in self ? document.currentScript.src : "") ||
            location.href;
        if (s[t]) return;
        let c = {};
        const r = (e) => i(e, t),
            o = { module: { uri: t }, exports: c, require: r };
        s[t] = Promise.all(n.map((e) => o[e] || r(e))).then(
            (e) => (a(...e), c),
        );
    };
}
define(["./workbox-62f137f2"], function (e) {
    "use strict";
    importScripts(),
        self.skipWaiting(),
        e.clientsClaim(),
        e.precacheAndRoute(
            [
                {
                    url: "/_next/static/TYuzkCB4arH2dAWiki4uj/_buildManifest.js",
                    revision: "TYuzkCB4arH2dAWiki4uj",
                },
                {
                    url: "/_next/static/TYuzkCB4arH2dAWiki4uj/_middlewareManifest.js",
                    revision: "TYuzkCB4arH2dAWiki4uj",
                },
                {
                    url: "/_next/static/TYuzkCB4arH2dAWiki4uj/_ssgManifest.js",
                    revision: "TYuzkCB4arH2dAWiki4uj",
                },
                {
                    url: "/_next/static/chunks/120-b5f3f96f96eaf3a6.js",
                    revision: "TYuzkCB4arH2dAWiki4uj",
                },
                {
                    url: "/_next/static/chunks/1bfc9850-f45dfd11c9418b44.js",
                    revision: "TYuzkCB4arH2dAWiki4uj",
                },
                {
                    url: "/_next/static/chunks/632-df5a0f0162bf8f8a.js",
                    revision: "TYuzkCB4arH2dAWiki4uj",
                },
                {
                    url: "/_next/static/chunks/651.243d23442247d286.js",
                    revision: "TYuzkCB4arH2dAWiki4uj",
                },
                {
                    url: "/_next/static/chunks/710-128b002bcfa3e4b8.js",
                    revision: "TYuzkCB4arH2dAWiki4uj",
                },
                {
                    url: "/_next/static/chunks/b98bc7c3-8014a7899f060039.js",
                    revision: "TYuzkCB4arH2dAWiki4uj",
                },
                {
                    url: "/_next/static/chunks/framework-5f4595e5518b5600.js",
                    revision: "TYuzkCB4arH2dAWiki4uj",
                },
                {
                    url: "/_next/static/chunks/main-e907f3763a1f5d39.js",
                    revision: "TYuzkCB4arH2dAWiki4uj",
                },
                {
                    url: "/_next/static/chunks/pages/_app-bd85c3a8d89b0293.js",
                    revision: "TYuzkCB4arH2dAWiki4uj",
                },
                {
                    url: "/_next/static/chunks/pages/_error-2f883067a14f4c4a.js",
                    revision: "TYuzkCB4arH2dAWiki4uj",
                },
                {
                    url: "/_next/static/chunks/pages/campaign/%5Bid%5D-9624c9dd62231041.js",
                    revision: "TYuzkCB4arH2dAWiki4uj",
                },
                {
                    url: "/_next/static/chunks/pages/campaign/%5Bid%5D/withdrawal-a86e3050ee519f39.js",
                    revision: "TYuzkCB4arH2dAWiki4uj",
                },
                {
                    url: "/_next/static/chunks/pages/campaign/%5Bid%5D/withdrawal/new-5208725712736be3.js",
                    revision: "TYuzkCB4arH2dAWiki4uj",
                },
                {
                    url: "/_next/static/chunks/pages/campaign/new-d92dda6487c26a19.js",
                    revision: "TYuzkCB4arH2dAWiki4uj",
                },
                {
                    url: "/_next/static/chunks/pages/index-b77c11b019014790.js",
                    revision: "TYuzkCB4arH2dAWiki4uj",
                },
                {
                    url: "/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",
                    revision: "TYuzkCB4arH2dAWiki4uj",
                },
                {
                    url: "/_next/static/chunks/webpack-f326a12238227d2f.js",
                    revision: "TYuzkCB4arH2dAWiki4uj",
                },
                {
                    url: "/_next/static/css/58f74cec8272dae0.css",
                    revision: "TYuzkCB4arH2dAWiki4uj",
                },
                {
                    url: "/_next/static/css/7d1aee8bd4d59227.css",
                    revision: "TYuzkCB4arH2dAWiki4uj",
                },
                {
                    url: "/_next/static/media/space-grotesk-all-400-normal.9ac98ca6.woff",
                    revision: "TYuzkCB4arH2dAWiki4uj",
                },
                {
                    url: "/_next/static/media/space-grotesk-latin-400-normal.49e536a0.woff2",
                    revision: "TYuzkCB4arH2dAWiki4uj",
                },
                {
                    url: "/_next/static/media/space-grotesk-latin-ext-400-normal.0ecb7be0.woff2",
                    revision: "TYuzkCB4arH2dAWiki4uj",
                },
                {
                    url: "/_next/static/media/space-grotesk-vietnamese-400-normal.50a4c534.woff2",
                    revision: "TYuzkCB4arH2dAWiki4uj",
                },
                {
                    url: "/icons/github-icon.svg",
                    revision: "f7208e5aa6c004a74c28ae55f5ea9a20",
                },
                {
                    url: "/icons/linkedin-icon.svg",
                    revision: "d40192afd85eb7fadb84fdccc00ce587",
                },
                {
                    url: "/icons/moon-icon.svg",
                    revision: "d4c74f9bf1e514b7ce5e99dafdc38faf",
                },
                {
                    url: "/icons/nextjs-icon.svg",
                    revision: "216415684148edcd841fb3f31de71418",
                },
                {
                    url: "/icons/pankod-icon.svg",
                    revision: "176e6ccfea951905114d0c9552be18a6",
                },
                {
                    url: "/icons/sun-icon.svg",
                    revision: "4a2f0ab3afe1b8801e0b2af3ba143428",
                },
                {
                    url: "/icons/twitter-icon.svg",
                    revision: "96694b8fd7b2aebcf9d6ad10309bfb48",
                },
                {
                    url: "/icons/youtube-icon.svg",
                    revision: "08cbf01bf1fde60568ec3a55bfd5d902",
                },
                {
                    url: "/locales/en/common.json",
                    revision: "2bdb45838d23d9193f1f98e93706d39e",
                },
                {
                    url: "/locales/en/home.json",
                    revision: "af9bdba4d77ee03ce17c4afe01e15df7",
                },
                {
                    url: "/locales/tr/common.json",
                    revision: "48965914db76babe14b33149a9cc0f16",
                },
                {
                    url: "/locales/tr/home.json",
                    revision: "31dc6a647d8916ff2909893e4d394322",
                },
                {
                    url: "/meta.json",
                    revision: "e93966c878ed21afe3811a4d64ae2553",
                },
            ],
            { ignoreURLParametersMatching: [] },
        ),
        e.cleanupOutdatedCaches(),
        e.registerRoute(
            "/",
            new e.NetworkFirst({
                cacheName: "start-url",
                plugins: [
                    {
                        cacheWillUpdate: async ({
                            request: e,
                            response: s,
                            event: i,
                            state: n,
                        }) =>
                            s && "opaqueredirect" === s.type
                                ? new Response(s.body, {
                                      status: 200,
                                      statusText: "OK",
                                      headers: s.headers,
                                  })
                                : s,
                    },
                ],
            }),
            "GET",
        ),
        e.registerRoute(
            /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
            new e.CacheFirst({
                cacheName: "google-fonts-webfonts",
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 4,
                        maxAgeSeconds: 31536e3,
                    }),
                ],
            }),
            "GET",
        ),
        e.registerRoute(
            /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
            new e.StaleWhileRevalidate({
                cacheName: "google-fonts-stylesheets",
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 4,
                        maxAgeSeconds: 604800,
                    }),
                ],
            }),
            "GET",
        ),
        e.registerRoute(
            /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
            new e.StaleWhileRevalidate({
                cacheName: "static-font-assets",
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 4,
                        maxAgeSeconds: 604800,
                    }),
                ],
            }),
            "GET",
        ),
        e.registerRoute(
            /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
            new e.StaleWhileRevalidate({
                cacheName: "static-image-assets",
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 64,
                        maxAgeSeconds: 86400,
                    }),
                ],
            }),
            "GET",
        ),
        e.registerRoute(
            /\/_next\/image\?url=.+$/i,
            new e.StaleWhileRevalidate({
                cacheName: "next-image",
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 64,
                        maxAgeSeconds: 86400,
                    }),
                ],
            }),
            "GET",
        ),
        e.registerRoute(
            /\.(?:mp3|wav|ogg)$/i,
            new e.CacheFirst({
                cacheName: "static-audio-assets",
                plugins: [
                    new e.RangeRequestsPlugin(),
                    new e.ExpirationPlugin({
                        maxEntries: 32,
                        maxAgeSeconds: 86400,
                    }),
                ],
            }),
            "GET",
        ),
        e.registerRoute(
            /\.(?:mp4)$/i,
            new e.CacheFirst({
                cacheName: "static-video-assets",
                plugins: [
                    new e.RangeRequestsPlugin(),
                    new e.ExpirationPlugin({
                        maxEntries: 32,
                        maxAgeSeconds: 86400,
                    }),
                ],
            }),
            "GET",
        ),
        e.registerRoute(
            /\.(?:js)$/i,
            new e.StaleWhileRevalidate({
                cacheName: "static-js-assets",
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 32,
                        maxAgeSeconds: 86400,
                    }),
                ],
            }),
            "GET",
        ),
        e.registerRoute(
            /\.(?:css|less)$/i,
            new e.StaleWhileRevalidate({
                cacheName: "static-style-assets",
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 32,
                        maxAgeSeconds: 86400,
                    }),
                ],
            }),
            "GET",
        ),
        e.registerRoute(
            /\/_next\/data\/.+\/.+\.json$/i,
            new e.StaleWhileRevalidate({
                cacheName: "next-data",
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 32,
                        maxAgeSeconds: 86400,
                    }),
                ],
            }),
            "GET",
        ),
        e.registerRoute(
            /\.(?:json|xml|csv)$/i,
            new e.NetworkFirst({
                cacheName: "static-data-assets",
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 32,
                        maxAgeSeconds: 86400,
                    }),
                ],
            }),
            "GET",
        ),
        e.registerRoute(
            ({ url: e }) => {
                if (!(self.origin === e.origin)) return !1;
                const s = e.pathname;
                return !s.startsWith("/api/auth/") && !!s.startsWith("/api/");
            },
            new e.NetworkFirst({
                cacheName: "apis",
                networkTimeoutSeconds: 10,
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 16,
                        maxAgeSeconds: 86400,
                    }),
                ],
            }),
            "GET",
        ),
        e.registerRoute(
            ({ url: e }) => {
                if (!(self.origin === e.origin)) return !1;
                return !e.pathname.startsWith("/api/");
            },
            new e.NetworkFirst({
                cacheName: "others",
                networkTimeoutSeconds: 10,
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 32,
                        maxAgeSeconds: 86400,
                    }),
                ],
            }),
            "GET",
        ),
        e.registerRoute(
            ({ url: e }) => !(self.origin === e.origin),
            new e.NetworkFirst({
                cacheName: "cross-origin",
                networkTimeoutSeconds: 10,
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 32,
                        maxAgeSeconds: 3600,
                    }),
                ],
            }),
            "GET",
        );
});
