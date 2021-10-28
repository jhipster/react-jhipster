"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JvmMemory = void 0;
var tslib_1 = require("tslib");
var react_1 = (0, tslib_1.__importDefault)(require("react"));
var formatter_1 = require("../../formatter");
var reactstrap_1 = require("reactstrap");
var JvmMemory = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(JvmMemory, _super);
    function JvmMemory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JvmMemory.prototype.render = function () {
        var _a = this.props, jvmMetrics = _a.jvmMetrics, wholeNumberFormat = _a.wholeNumberFormat;
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("h3", null, "Memory"),
            Object.keys(jvmMetrics).map(function (key, index) { return (react_1.default.createElement("div", { key: index },
                jvmMetrics[key].max !== -1 ? (react_1.default.createElement("span", null,
                    react_1.default.createElement("span", null, key),
                    " (",
                    react_1.default.createElement(formatter_1.TextFormat, { value: jvmMetrics[key].used / 1048576, type: "number", format: wholeNumberFormat }),
                    "M /",
                    ' ',
                    react_1.default.createElement(formatter_1.TextFormat, { value: jvmMetrics[key].max / 1048576, type: "number", format: wholeNumberFormat }),
                    "M)")) : (react_1.default.createElement("span", null,
                    react_1.default.createElement("span", null, key),
                    " ",
                    react_1.default.createElement(formatter_1.TextFormat, { value: jvmMetrics[key].used / 1048576, type: "number", format: wholeNumberFormat }),
                    "M")),
                react_1.default.createElement("div", null,
                    "Committed : ",
                    react_1.default.createElement(formatter_1.TextFormat, { value: jvmMetrics[key].committed / 1048576, type: "number", format: wholeNumberFormat }),
                    "M"),
                jvmMetrics[key].max !== -1 ? (react_1.default.createElement(reactstrap_1.Progress, { animated: true, value: jvmMetrics[key].used, min: "0", max: jvmMetrics[key].max, color: "success" },
                    react_1.default.createElement("span", null,
                        react_1.default.createElement(formatter_1.TextFormat, { value: jvmMetrics[key].used * 100 / jvmMetrics[key].max, type: "number", format: wholeNumberFormat }),
                        "%"))) : (''))); })));
    };
    return JvmMemory;
}(react_1.default.Component));
exports.JvmMemory = JvmMemory;
//# sourceMappingURL=jvmMemory.js.map