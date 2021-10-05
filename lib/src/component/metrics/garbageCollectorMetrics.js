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
exports.GarbageCollectorMetrics = void 0;
var react_1 = __importDefault(require("react"));
var formatter_1 = require("../../formatter");
var reactstrap_1 = require("reactstrap");
var GarbageCollectorMetrics = /** @class */ (function (_super) {
    __extends(GarbageCollectorMetrics, _super);
    function GarbageCollectorMetrics() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GarbageCollectorMetrics.prototype.render = function () {
        var _a = this.props, garbageCollectorMetrics = _a.garbageCollectorMetrics, wholeNumberFormat = _a.wholeNumberFormat;
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("h3", null, "Garbage Collection"),
            react_1.default.createElement(reactstrap_1.Row, null,
                react_1.default.createElement(reactstrap_1.Col, { md: "4" },
                    react_1.default.createElement("span", null,
                        "GC Live Data Size/GC Max Data Size (",
                        react_1.default.createElement(formatter_1.TextFormat, { value: garbageCollectorMetrics['jvm.gc.live.data.size'] / 1048576, type: 'number', format: wholeNumberFormat }),
                        "M /",
                        ' ',
                        react_1.default.createElement(formatter_1.TextFormat, { value: garbageCollectorMetrics['jvm.gc.max.data.size'] / 1048576, type: 'number', format: wholeNumberFormat }),
                        "M)"),
                    react_1.default.createElement(reactstrap_1.Progress, { animated: true, color: "success", value: 100 * garbageCollectorMetrics['jvm.gc.live.data.size'] / garbageCollectorMetrics['jvm.gc.max.data.size'] },
                        react_1.default.createElement(formatter_1.TextFormat, { value: 100 * garbageCollectorMetrics['jvm.gc.live.data.size'] / garbageCollectorMetrics['jvm.gc.max.data.size'], type: 'number', format: wholeNumberFormat }),
                        "%")),
                react_1.default.createElement(reactstrap_1.Col, { md: "4" },
                    react_1.default.createElement("span", null,
                        "GC Memory Promoted/GC Memory Allocated (",
                        react_1.default.createElement(formatter_1.TextFormat, { value: garbageCollectorMetrics['jvm.gc.memory.promoted'] / 1048576, type: 'number', format: wholeNumberFormat }),
                        "M /",
                        ' ',
                        react_1.default.createElement(formatter_1.TextFormat, { value: garbageCollectorMetrics['jvm.gc.memory.allocated'] / 1048576, type: 'number', format: wholeNumberFormat }),
                        "M)"),
                    react_1.default.createElement(reactstrap_1.Progress, { animated: true, color: "success", value: 100 * garbageCollectorMetrics['jvm.gc.memory.promoted'] / garbageCollectorMetrics['jvm.gc.memory.allocated'] },
                        react_1.default.createElement(formatter_1.TextFormat, { value: 100 * garbageCollectorMetrics['jvm.gc.memory.promoted'] / garbageCollectorMetrics['jvm.gc.memory.allocated'], type: 'number', format: wholeNumberFormat }),
                        "%")),
                react_1.default.createElement(reactstrap_1.Col, { md: "4" },
                    react_1.default.createElement(reactstrap_1.Row, null,
                        react_1.default.createElement(reactstrap_1.Col, { md: "9" }, "Classes loaded"),
                        react_1.default.createElement(reactstrap_1.Col, { md: "3" }, garbageCollectorMetrics.classesLoaded)),
                    react_1.default.createElement(reactstrap_1.Row, null,
                        react_1.default.createElement(reactstrap_1.Col, { md: "9" }, "Classes unloaded"),
                        react_1.default.createElement(reactstrap_1.Col, { md: "3" }, garbageCollectorMetrics.classesUnloaded)))),
            react_1.default.createElement(reactstrap_1.Table, null,
                react_1.default.createElement("thead", null,
                    react_1.default.createElement("tr", null,
                        react_1.default.createElement("th", null),
                        react_1.default.createElement("th", { className: "text-end" }, "Count"),
                        react_1.default.createElement("th", { className: "text-end" }, "Mean"),
                        react_1.default.createElement("th", { className: "text-end" }, "Min"),
                        react_1.default.createElement("th", { className: "text-end" }, "p50"),
                        react_1.default.createElement("th", { className: "text-end" }, "p75"),
                        react_1.default.createElement("th", { className: "text-end" }, "p95"),
                        react_1.default.createElement("th", { className: "text-end" }, "p99"),
                        react_1.default.createElement("th", { className: "text-end" }, "Max"))),
                react_1.default.createElement("tbody", null,
                    react_1.default.createElement("tr", null,
                        react_1.default.createElement("td", null, "jvm.gc.pause"),
                        react_1.default.createElement("td", { className: "text-end" },
                            react_1.default.createElement(formatter_1.TextFormat, { value: garbageCollectorMetrics.count, type: 'number', format: '0,0.[000]' })),
                        react_1.default.createElement("td", { className: "text-end" },
                            react_1.default.createElement(formatter_1.TextFormat, { value: garbageCollectorMetrics.mean, type: 'number', format: '0,0.[000]' })),
                        react_1.default.createElement("td", { className: "text-end" },
                            react_1.default.createElement(formatter_1.TextFormat, { value: garbageCollectorMetrics['0.0'], type: 'number', format: '0,0.[000]' })),
                        react_1.default.createElement("td", { className: "text-end" },
                            react_1.default.createElement(formatter_1.TextFormat, { value: garbageCollectorMetrics['0.5'], type: 'number', format: '0,0.[000]' })),
                        react_1.default.createElement("td", { className: "text-end" },
                            react_1.default.createElement(formatter_1.TextFormat, { value: garbageCollectorMetrics['0.75'], type: 'number', format: '0,0.[000]' })),
                        react_1.default.createElement("td", { className: "text-end" },
                            react_1.default.createElement(formatter_1.TextFormat, { value: garbageCollectorMetrics['0.95'], type: 'number', format: '0,0.[000]' })),
                        react_1.default.createElement("td", { className: "text-end" },
                            react_1.default.createElement(formatter_1.TextFormat, { value: garbageCollectorMetrics['0.99'], type: 'number', format: '0,0.[000]' })),
                        react_1.default.createElement("td", { className: "text-end" },
                            react_1.default.createElement(formatter_1.TextFormat, { value: garbageCollectorMetrics.max, type: 'number', format: '0,0.[000]' })))))));
    };
    return GarbageCollectorMetrics;
}(react_1.default.Component));
exports.GarbageCollectorMetrics = GarbageCollectorMetrics;
//# sourceMappingURL=garbageCollectorMetrics.js.map