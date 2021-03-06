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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GarbageCollectorMetrics = void 0;
var React = require("react");
var formatter_1 = require("../../formatter");
var reactstrap_1 = require("reactstrap");
var GarbageCollectorMetrics = /** @class */ (function (_super) {
    __extends(GarbageCollectorMetrics, _super);
    function GarbageCollectorMetrics() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GarbageCollectorMetrics.prototype.render = function () {
        var _a = this.props, garbageCollectorMetrics = _a.garbageCollectorMetrics, wholeNumberFormat = _a.wholeNumberFormat;
        return (React.createElement("div", null,
            React.createElement("h3", null, "Garbage Collection"),
            React.createElement(reactstrap_1.Row, null,
                React.createElement(reactstrap_1.Col, { md: "4" },
                    React.createElement("span", null,
                        "GC Live Data Size/GC Max Data Size (",
                        React.createElement(formatter_1.TextFormat, { value: garbageCollectorMetrics['jvm.gc.live.data.size'] / 1048576, type: 'number', format: wholeNumberFormat }),
                        "M /",
                        ' ',
                        React.createElement(formatter_1.TextFormat, { value: garbageCollectorMetrics['jvm.gc.max.data.size'] / 1048576, type: 'number', format: wholeNumberFormat }),
                        "M)"),
                    React.createElement(reactstrap_1.Progress, { animated: true, color: "success", value: 100 * garbageCollectorMetrics['jvm.gc.live.data.size'] / garbageCollectorMetrics['jvm.gc.max.data.size'] },
                        React.createElement(formatter_1.TextFormat, { value: 100 * garbageCollectorMetrics['jvm.gc.live.data.size'] / garbageCollectorMetrics['jvm.gc.max.data.size'], type: 'number', format: wholeNumberFormat }),
                        "%")),
                React.createElement(reactstrap_1.Col, { md: "4" },
                    React.createElement("span", null,
                        "GC Memory Promoted/GC Memory Allocated (",
                        React.createElement(formatter_1.TextFormat, { value: garbageCollectorMetrics['jvm.gc.memory.promoted'] / 1048576, type: 'number', format: wholeNumberFormat }),
                        "M /",
                        ' ',
                        React.createElement(formatter_1.TextFormat, { value: garbageCollectorMetrics['jvm.gc.memory.allocated'] / 1048576, type: 'number', format: wholeNumberFormat }),
                        "M)"),
                    React.createElement(reactstrap_1.Progress, { animated: true, color: "success", value: 100 * garbageCollectorMetrics['jvm.gc.memory.promoted'] / garbageCollectorMetrics['jvm.gc.memory.allocated'] },
                        React.createElement(formatter_1.TextFormat, { value: 100 * garbageCollectorMetrics['jvm.gc.memory.promoted'] / garbageCollectorMetrics['jvm.gc.memory.allocated'], type: 'number', format: wholeNumberFormat }),
                        "%")),
                React.createElement(reactstrap_1.Col, { md: "4" },
                    React.createElement(reactstrap_1.Row, null,
                        React.createElement(reactstrap_1.Col, { md: "9" }, "Classes loaded"),
                        React.createElement(reactstrap_1.Col, { md: "3" }, garbageCollectorMetrics.classesLoaded)),
                    React.createElement(reactstrap_1.Row, null,
                        React.createElement(reactstrap_1.Col, { md: "9" }, "Classes unloaded"),
                        React.createElement(reactstrap_1.Col, { md: "3" }, garbageCollectorMetrics.classesUnloaded)))),
            React.createElement(reactstrap_1.Table, null,
                React.createElement("thead", null,
                    React.createElement("tr", null,
                        React.createElement("th", null),
                        React.createElement("th", { className: "text-right" }, "Count"),
                        React.createElement("th", { className: "text-right" }, "Mean"),
                        React.createElement("th", { className: "text-right" }, "Min"),
                        React.createElement("th", { className: "text-right" }, "p50"),
                        React.createElement("th", { className: "text-right" }, "p75"),
                        React.createElement("th", { className: "text-right" }, "p95"),
                        React.createElement("th", { className: "text-right" }, "p99"),
                        React.createElement("th", { className: "text-right" }, "Max"))),
                React.createElement("tbody", null,
                    React.createElement("tr", null,
                        React.createElement("td", null, "jvm.gc.pause"),
                        React.createElement("td", { className: "text-right" },
                            React.createElement(formatter_1.TextFormat, { value: garbageCollectorMetrics.count, type: 'number', format: '0,0.[000]' })),
                        React.createElement("td", { className: "text-right" },
                            React.createElement(formatter_1.TextFormat, { value: garbageCollectorMetrics.mean, type: 'number', format: '0,0.[000]' })),
                        React.createElement("td", { className: "text-right" },
                            React.createElement(formatter_1.TextFormat, { value: garbageCollectorMetrics['0.0'], type: 'number', format: '0,0.[000]' })),
                        React.createElement("td", { className: "text-right" },
                            React.createElement(formatter_1.TextFormat, { value: garbageCollectorMetrics['0.5'], type: 'number', format: '0,0.[000]' })),
                        React.createElement("td", { className: "text-right" },
                            React.createElement(formatter_1.TextFormat, { value: garbageCollectorMetrics['0.75'], type: 'number', format: '0,0.[000]' })),
                        React.createElement("td", { className: "text-right" },
                            React.createElement(formatter_1.TextFormat, { value: garbageCollectorMetrics['0.95'], type: 'number', format: '0,0.[000]' })),
                        React.createElement("td", { className: "text-right" },
                            React.createElement(formatter_1.TextFormat, { value: garbageCollectorMetrics['0.99'], type: 'number', format: '0,0.[000]' })),
                        React.createElement("td", { className: "text-right" },
                            React.createElement(formatter_1.TextFormat, { value: garbageCollectorMetrics.max, type: 'number', format: '0,0.[000]' })))))));
    };
    return GarbageCollectorMetrics;
}(React.Component));
exports.GarbageCollectorMetrics = GarbageCollectorMetrics;
//# sourceMappingURL=garbageCollectorMetrics.js.map