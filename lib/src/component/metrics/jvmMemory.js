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
var JvmMemory = /** @class */ (function (_super) {
    __extends(JvmMemory, _super);
    function JvmMemory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JvmMemory.prototype.render = function () {
        var _a = this.props, jvmMetrics = _a.jvmMetrics, wholeNumberFormat = _a.wholeNumberFormat;
        return (React.createElement("div", null,
            React.createElement("h3", null, "Memory"),
            Object.keys(jvmMetrics).map(function (key, index) { return (React.createElement("div", { key: index },
                jvmMetrics[key].max !== -1 ? (React.createElement("span", null,
                    React.createElement("span", null, key),
                    " (",
                    React.createElement(formatter_1.TextFormat, { value: jvmMetrics[key].used / 1048576, type: "number", format: wholeNumberFormat }),
                    "M /",
                    ' ',
                    React.createElement(formatter_1.TextFormat, { value: jvmMetrics[key].max / 1048576, type: "number", format: wholeNumberFormat }),
                    "M)")) : (React.createElement("span", null,
                    React.createElement("span", null, key),
                    " ",
                    React.createElement(formatter_1.TextFormat, { value: jvmMetrics[key].used / 1048576, type: "number", format: wholeNumberFormat }),
                    "M")),
                React.createElement("div", null,
                    "Committed : ",
                    React.createElement(formatter_1.TextFormat, { value: jvmMetrics[key].committed / 1048576, type: "number", format: wholeNumberFormat }),
                    "M"),
                jvmMetrics[key].max !== -1 ? (React.createElement(reactstrap_1.Progress, { animated: true, value: jvmMetrics[key].used, min: "0", max: jvmMetrics[key].max, color: "success" },
                    React.createElement("span", null,
                        React.createElement(formatter_1.TextFormat, { value: jvmMetrics[key].used * 100 / jvmMetrics[key].max, type: "number", format: wholeNumberFormat }),
                        "%"))) : (''))); })));
    };
    return JvmMemory;
}(React.Component));
exports.JvmMemory = JvmMemory;
//# sourceMappingURL=jvmMemory.js.map