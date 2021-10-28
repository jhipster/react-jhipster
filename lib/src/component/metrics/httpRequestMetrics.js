"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpRequestMetrics = void 0;
var tslib_1 = require("tslib");
var react_1 = (0, tslib_1.__importDefault)(require("react"));
var formatter_1 = require("../../formatter");
var reactstrap_1 = require("reactstrap");
var number_utils_1 = require("../../util/number-utils");
var HttpRequestMetrics = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(HttpRequestMetrics, _super);
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