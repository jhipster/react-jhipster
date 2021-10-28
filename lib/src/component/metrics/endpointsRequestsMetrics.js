"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EndpointsRequestsMetrics = void 0;
var tslib_1 = require("tslib");
var react_1 = (0, tslib_1.__importDefault)(require("react"));
var formatter_1 = require("../../formatter");
var reactstrap_1 = require("reactstrap");
var EndpointsRequestsMetrics = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(EndpointsRequestsMetrics, _super);
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