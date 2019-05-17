"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var formatter_1 = require("../../formatter");
var reactstrap_1 = require("reactstrap");
var EndpointsRequestsMetrics = /** @class */ (function (_super) {
    __extends(EndpointsRequestsMetrics, _super);
    function EndpointsRequestsMetrics() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EndpointsRequestsMetrics.prototype.render = function () {
        var _a = this.props, endpointsRequestsMetrics = _a.endpointsRequestsMetrics, wholeNumberFormat = _a.wholeNumberFormat;
        return (React.createElement("div", null,
            React.createElement("h3", null, "Endpoints requests (time in millisecond)"),
            React.createElement(reactstrap_1.Table, null,
                React.createElement("thead", null,
                    React.createElement("tr", null,
                        React.createElement("th", null, "Method"),
                        React.createElement("th", null, "Endpoint url"),
                        React.createElement("th", null, "Count"),
                        React.createElement("th", null, "Mean"))),
                React.createElement("tbody", null, Object.entries(endpointsRequestsMetrics).map(function (_a) {
                    var key = _a[0], entry = _a[1];
                    return Object.entries(entry).map(function (_a) {
                        var method = _a[0], methodValue = _a[1];
                        return (React.createElement("tr", { key: key + '-' + method },
                            React.createElement("td", null, method),
                            React.createElement("td", null, key),
                            React.createElement("td", null, methodValue.count),
                            React.createElement("td", null,
                                React.createElement(formatter_1.TextFormat, { value: methodValue.mean, type: "number", format: wholeNumberFormat }))));
                    });
                })))));
    };
    return EndpointsRequestsMetrics;
}(React.Component));
exports.EndpointsRequestsMetrics = EndpointsRequestsMetrics;
//# sourceMappingURL=endpointsRequestsMetrics.js.map