"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslatorContext = exports.Translate = exports.translate = void 0;
const tslib_1 = require("tslib");
const translate_1 = tslib_1.__importStar(require("./translate"));
exports.Translate = translate_1.default;
Object.defineProperty(exports, "translate", { enumerable: true, get: function () { return translate_1.translate; } });
const translator_context_1 = tslib_1.__importDefault(require("./translator-context"));
exports.TranslatorContext = translator_context_1.default;
//# sourceMappingURL=index.js.map