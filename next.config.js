const withPlugins = require("next-compose-plugins");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});
const { i18n } = require("./next-i18next.config");
const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
    pwa: {
        disable: process.env.NODE_ENV !== "production",
        dest: "public",
        runtimeCaching,
    },
    i18n,
});

// const { nextI18NextRewrites } = require("next-i18next/rewrites");

const localeSubpaths = {
    tr: "tr",
    en: "en",
};

const config = {
    // webpack5: true,
    // webpack: (config) => {
    //     config.resolve.fallback = { fs: false };

    //     return config;
    // },
    devServer: {
        proxy: {
            "/api": "http://localhost:3000",
        },
    },
    eslint: {
        // Warning: Dangerously allow production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    // rewrites: async () => {
    //     return {
    //         beforeFiles: [
    //             {
    //                 source: "/hang-moi-ve",
    //                 has: [
    //                     {
    //                         type: "query",
    //                         key: "category",
    //                         value: "%2C", // Named capture group to match anything on the value
    //                     },
    //                 ],
    //                 destination: "/hang-moi-ve/:cmsId",
    //             },
    //         ],
    //     };
    // },
    redirects: async () => {
        return [
            {
                source: "/categories",
                destination: "/hang-moi-ve",
                permanent: true,
            },
            {
                source: "/my-account",
                destination: "/my-account/info",
                permanent: true,
            },
            {
                source: "/promotions",
                destination: "/hang-moi-ve",
                permanent: true,
            },
        ];
    },
    publicRuntimeConfig: {
        localeSubpaths,
    },
    images: {
        domains: [
            "assets.vercel.com",
            "old.joolux.com",
            "images.ctfassets.net",
            "joolux.com",
            "joolux-client.ml",
            "i.imgur.com",
            "usercontent.funipos.net",
        ],
    },
};

module.exports = withPlugins([[withBundleAnalyzer, withPWA]], config);
