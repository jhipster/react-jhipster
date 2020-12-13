"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpRequestMetrics = void 0;
var React = require("react");
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
        return (React.createElement("div", null,
            React.createElement("h3", null, "HTTP requests (time in milliseconds)"),
            React.createElement("p", null,
                React.createElement("span", null, "Total requests:"),
                ' ',
                React.createElement("b", null,
                    React.createElement(formatter_1.TextFormat, { value: requestMetrics.all.count, type: "number", format: wholeNumberFormat }))),
            React.createElement(reactstrap_1.Table, null,
                React.createElement("thead", null,
                    React.createElement("tr", null,
                        React.createElement("th", null, "Code"),
                        React.createElement("th", null, "Count"),
                        React.createElement("th", { className: "text-right" }, "Mean"),
                        React.createElement("th", { className: "text-right" }, "Max"))),
                React.createElement("tbody", null, Object.keys(requestMetrics.percode).map(function (key, index) { return (React.createElement("tr", { key: index },
                    React.createElement("td", null, key),
                    React.createElement("td", null,
                        React.createElement(reactstrap_1.Progress, { min: "0", max: requestMetrics.all.count, value: requestMetrics.percode[key].count, color: "success", animated: true },
                            React.createElement("span", null,
                                React.createElement(formatter_1.TextFormat, { value: requestMetrics.percode[key].count, type: "number", format: wholeNumberFormat })))),
                    React.createElement("td", { className: "text-right" },
                        React.createElement(formatter_1.TextFormat, { value: number_utils_1.nanToZero(requestMetrics.percode[key].mean), type: "number", format: twoDigitAfterPointFormat })),
                    React.createElement("td", { className: "text-right" },
                        React.createElement(formatter_1.TextFormat, { value: number_utils_1.nanToZero(requestMetrics.percode[key].max), type: "number", format: twoDigitAfterPointFormat })))); })))));
    };
    return HttpRequestMetrics;
}(React.Component));
exports.HttpRequestMetrics = HttpRequestMetrics;
//# sourceMappingURL=httpRequestMetrics.js.map