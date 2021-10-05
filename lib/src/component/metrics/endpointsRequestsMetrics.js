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
exports.EndpointsRequestsMetrics = void 0;
var react_1 = __importDefault(require("react"));
var formatter_1 = require("../../formatter");
var reactstrap_1 = require("reactstrap");
var EndpointsRequestsMetrics = /** @class */ (function (_super) {
    __extends(EndpointsRequestsMetrics, _super);
    function EndpointsRequestsMetrics() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EndpointsRequestsMetrics.prototype.render = function () {
        var _a = this.props, endpointsRequestsMetrics = _a.endpointsRequestsMetrics, wholeNumberFormat = _a.wholeNumberFormat;
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("h3", null, "Endpoints requests (time in millisecond)"),
            react_1.default.createElement(reactstrap_1.Table, null,
                react_1.default.createElement("thead", null,
                    react_1.default.createElement("tr", null,
                        react_1.default.createElement("th", null, "Method"),
                        react_1.default.createElement("th", null, "Endpoint url"),
                        react_1.default.createElement("th", null, "Count"),
                        react_1.default.createElement("th", null, "Mean"))),
                react_1.default.createElement("tbody", null, Object.entries(endpointsRequestsMetrics).map(function (_a) {
                    var key = _a[0], entry = _a[1];
                    return Object.entries(entry).map(function (_a) {
                        var method = _a[0], methodValue = _a[1];
                        return (react_1.default.createElement("tr", { key: key + '-' + method },
                            react_1.default.createElement("td", null, method),
                            react_1.default.createElement("td", null, key),
                            react_1.default.createElement("td", null, methodValue.count),
                            react_1.default.createElement("td", null,
                                react_1.default.createElement(formatter_1.TextFormat, { value: methodValue.mean, type: "number", format: wholeNumberFormat }))));
                    });
                })))));
    };
    return EndpointsRequestsMetrics;
}(react_1.default.Component));
exports.EndpointsRequestsMetrics = EndpointsRequestsMetrics;
//# sourceMappingURL=endpointsRequestsMetrics.js.map