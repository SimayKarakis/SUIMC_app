// src/i18n/index.jsx
import tr from "./tr.json";
import en from "./en.json";

const dictionaries = {
  tr,
  en,
};

export function createTranslator(lang = "tr") {
  const dict = dictionaries[lang] || dictionaries.tr;

  return function t(path) {
    const parts = path.split(".");
    let value = dict;

    for (const p of parts) {
      if (value && Object.prototype.hasOwnProperty.call(value, p)) {
        value = value[p];
      } else {
        // key bulunamazsa orijinal path'i göster
        return path;
      }
    }

    return typeof value === "string" ? value : path;
  };
}