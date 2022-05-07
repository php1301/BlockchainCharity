const path = require("path");
module.exports = {
    i18n: {
        locales: ["en", "de", "es", "ar", "he", "zh", "tr", "vi"],
        defaultLocale: "vi",
        localeDetection: false,
    },
    react: {
        useSuspense: false,
        // wait: true,
    },
    localePath: path.resolve("./public/locales"),
};
