"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpRequestMetrics = void 0;
var react_1 = __importDefault(require("react"));
var formatter_1 = require("../../formatter");
var reactstrap_1 = require("reactstrap");
var number_utils_1 = require("../../util/number-utils");
var HttpRequestMetrics = /** @class */ (function (_super) {
    __extends(HttpRequestMetrics, _super);
    function HttpRequestMetrics() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HttpRequestMetrics.prototype.render = function () {
        var _a = this.props, requestMetrics = _a.requestMetrics, wholeNumberFormat = _a.wholeNumberFormat, twoDigitAfterPointFormat = _a.twoDigitAfterPointFormat;
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("h3", null, "HTTP requests (time in milliseconds)"),
            react_1.default.createElement("p", null,
                react_1.default.createElement("span", null, "Total requests:"),
                ' ',
                react_1.default.createElement("b", null,
                    react_1.default.createElement(formatter_1.TextFormat, { value: requestMetrics.all.count, type: "number", format: wholeNumberFormat }))),
            react_1.default.createElement(reactstrap_1.Table, null,
                react_1.default.createElement("thead", null,
                    react_1.default.createElement("tr", null,
                        react_1.default.createElement("th", null, "Code"),
                        react_1.default.createElement("th", null, "Count"),
                        react_1.default.createElement("th", { className: "text-end" }, "Mean"),
                        react_1.default.createElement("th", { className: "text-end" }, "Max"))),
                react_1.default.createElement("tbody", null, Object.keys(requestMetrics.percode).map(function (key, index) { return (react_1.default.createElement("tr", { key: index },
                    react_1.default.createElement("td", null, key),
                    react_1.default.createElement("td", null,
                        react_1.default.createElement(reactstrap_1.Progress, { min: "0", max: requestMetrics.all.count, value: requestMetrics.percode[key].count, color: "success", animated: true },
                            react_1.default.createElement("span", null,
                                react_1.default.createElement(formatter_1.TextFormat, { value: requestMetrics.percode[key].count, type: "number", format: wholeNumberFormat })))),
                    react_1.default.createElement("td", { className: "text-end" },
                        react_1.default.createElement(formatter_1.TextFormat, { value: (0, number_utils_1.nanToZero)(requestMetrics.percode[key].mean), type: "number", format: twoDigitAfterPointFormat })),
                    react_1.default.createElement("td", { className: "text-end" },
                        react_1.default.createElement(formatter_1.TextFormat, { value: (0, number_utils_1.nanToZero)(requestMetrics.percode[key].max), type: "number", format: twoDigitAfterPointFormat })))); })))));
    };
    return HttpRequestMetrics;
}(react_1.default.Component));
exports.HttpRequestMetrics = HttpRequestMetrics;
//# sourceMappingURL=httpRequestMetrics.js.map