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
var DatasourceMetrics = /** @class */ (function (_super) {
    __extends(DatasourceMetrics, _super);
    function DatasourceMetrics() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.filterNaN = function (input) { return (isNaN(input) ? 0 : input); };
        return _this;
    }
    DatasourceMetrics.prototype.render = function () {
        var _a = this.props, datasourceMetrics = _a.datasourceMetrics, twoDigitAfterPointFormat = _a.twoDigitAfterPointFormat;
        return (React.createElement("div", null,
            React.createElement("h3", null, "DataSource statistics (time in millisecond)"),
            React.createElement(reactstrap_1.Table, null,
                React.createElement("thead", null,
                    React.createElement("tr", null,
                        React.createElement("th", null,
                            React.createElement("span", null, "Connection Pool Usage "),
                            "(active: ",
                            datasourceMetrics.active.value,
                            ", min: ",
                            datasourceMetrics.min.value,
                            ", max: ",
                            datasourceMetrics.max.value,
                            ", idle:",
                            ' ',
                            datasourceMetrics.idle.value,
                            ")"),
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
                        React.createElement("td", null, "Acquire"),
                        React.createElement("td", { className: "text-right" }, datasourceMetrics.acquire.count),
                        React.createElement("td", { className: "text-right" },
                            React.createElement(formatter_1.TextFormat, { value: datasourceMetrics.acquire.mean, type: 'number', format: twoDigitAfterPointFormat })),
                        React.createElement("td", { className: "text-right" },
                            React.createElement(formatter_1.TextFormat, { value: datasourceMetrics.acquire['0.0'], type: 'number', format: twoDigitAfterPointFormat })),
                        React.createElement("td", { className: "text-right" },
                            React.createElement(formatter_1.TextFormat, { value: datasourceMetrics.acquire['0.5'], type: 'number', format: twoDigitAfterPointFormat })),
                        React.createElement("td", { className: "text-right" },
                            React.createElement(formatter_1.TextFormat, { value: datasourceMetrics.acquire['0.75'], type: 'number', format: twoDigitAfterPointFormat })),
                        React.createElement("td", { className: "text-right" },
                            React.createElement(formatter_1.TextFormat, { value: datasourceMetrics.acquire['0.95'], type: 'number', format: twoDigitAfterPointFormat })),
                        React.createElement("td", { className: "text-right" },
                            React.createElement(formatter_1.TextFormat, { value: datasourceMetrics.acquire['0.99'], type: 'number', format: twoDigitAfterPointFormat })),
                        React.createElement("td", { className: "text-right" },
                            React.createElement(formatter_1.TextFormat, { value: datasourceMetrics.acquire.max, type: 'number', format: twoDigitAfterPointFormat }))),
                    React.createElement("tr", null,
                        React.createElement("td", null, "Creation"),
                        React.createElement("td", { className: "text-right" }, datasourceMetrics.creation.count),
                        React.createElement("td", { className: "text-right" },
                            React.createElement(formatter_1.TextFormat, { value: datasourceMetrics.creation.mean, type: 'number', format: twoDigitAfterPointFormat })),
                        React.createElement("td", { className: "text-right" },
                            React.createElement(formatter_1.TextFormat, { value: datasourceMetrics.creation['0.0'], type: 'number', format: twoDigitAfterPointFormat })),
                        React.createElement("td", { className: "text-right" },
                            React.createElement(formatter_1.TextFormat, { value: datasourceMetrics.creation['0.5'], type: 'number', format: twoDigitAfterPointFormat })),
                        React.createElement("td", { className: "text-right" },
                            React.createElement(formatter_1.TextFormat, { value: datasourceMetrics.creation['0.75'], type: 'number', format: twoDigitAfterPointFormat })),
                        React.createElement("td", { className: "text-right" },
                            React.createElement(formatter_1.TextFormat, { value: datasourceMetrics.creation['0.95'], type: 'number', format: twoDigitAfterPointFormat })),
                        React.createElement("td", { className: "text-right" },
                            React.createElement(formatter_1.TextFormat, { value: datasourceMetrics.creation['0.99'], type: 'number', format: twoDigitAfterPointFormat })),
                        React.createElement("td", { className: "text-right" },
                            React.createElement(formatter_1.TextFormat, { value: datasourceMetrics.creation.max, type: 'number', format: twoDigitAfterPointFormat }))),
                    React.createElement("tr", null,
                        React.createElement("td", null, "Usage"),
                        React.createElement("td", { className: "text-right" }, datasourceMetrics.usage.count),
                        React.createElement("td", { className: "text-right" },
                            React.createElement(formatter_1.TextFormat, { value: datasourceMetrics.usage.mean, type: 'number', format: twoDigitAfterPointFormat })),
                        React.createElement("td", { className: "text-right" },
                            React.createElement(formatter_1.TextFormat, { value: datasourceMetrics.usage['0.0'], type: 'number', format: twoDigitAfterPointFormat })),
                        React.createElement("td", { className: "text-right" },
                            React.createElement(formatter_1.TextFormat, { value: datasourceMetrics.usage['0.5'], type: 'number', format: twoDigitAfterPointFormat })),
                        React.createElement("td", { className: "text-right" },
                            React.createElement(formatter_1.TextFormat, { value: datasourceMetrics.usage['0.75'], type: 'number', format: twoDigitAfterPointFormat })),
                        React.createElement("td", { className: "text-right" },
                            React.createElement(formatter_1.TextFormat, { value: datasourceMetrics.usage['0.95'], type: 'number', format: twoDigitAfterPointFormat })),
                        React.createElement("td", { className: "text-right" },
                            React.createElement(formatter_1.TextFormat, { value: datasourceMetrics.usage['0.99'], type: 'number', format: twoDigitAfterPointFormat })),
                        React.createElement("td", { className: "text-right" },
                            React.createElement(formatter_1.TextFormat, { value: datasourceMetrics.usage.max, type: 'number', format: twoDigitAfterPointFormat })))))));
    };
    return DatasourceMetrics;
}(React.Component));
exports.DatasourceMetrics = DatasourceMetrics;
//# sourceMappingURL=datasourceMetrics.js.map