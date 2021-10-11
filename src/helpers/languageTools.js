"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.l = void 0;
function l(list, lang) {
    if ((lang === 'en') || (lang === 'fr')) {
        return list[lang];
    }
    else {
        return '';
    }
}
exports.l = l;
