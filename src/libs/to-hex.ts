export const toHex = (stringToConvert = "Pham Hoang Phuc Test CI/CD") =>
    stringToConvert
        .split("")
        .map((c) => c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join("");
