"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatasourceMetrics = void 0;
var tslib_1 = require("tslib");
var react_1 = (0, tslib_1.__importDefault)(require("react"));
var formatter_1 = require("../../formatter");
var reactstrap_1 = require("reactstrap");
var DatasourceMetrics = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(DatasourceMetrics, _super);
    function DatasourceMetrics() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DatasourceMetrics.prototype.render = function () {
        var _a = this.props, datasourceMetrics = _a.datasourceMetrics, twoDigitAfterPointFormat = _a.twoDigitAfterPointFormat;
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("h3", null, "DataSource statistics (time in millisecond)"),
            react_1.default.createElement(reactstrap_1.Table, null,
                react_1.default.createElement("thead", null,
                    react_1.default.createElement("tr", null,
                        react_1.default.createElement("th", null,
                            react_1.default.createElement("span", null, "Connection Pool Usage "),
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
                        react_1.default.createElement("td", null, "Acquire"),
                        react_1.default.createElement("td", { className: "text-end" }, datasourceMetrics.acquire.count),
                        react_1.default.createElement("td", { className: "text-end" },
                            react_1.default.createElement(formatter_1.TextFormat, { value: datasourceMetrics.acquire.mean, type: 'number', format: twoDigitAfterPointFormat })),
                        react_1.default.createElement("td", { className: "text-end" },
                            react_1.default.createElement(formatter_1.TextFormat, { value: datasourceMetrics.acquire['0.0'], type: 'number', format: twoDigitAfterPointFormat })),
                        react_1.default.createElement("td", { className: "text-end" },
                            react_1.default.createElement(formatter_1.TextFormat, { value: datasourceMetrics.acquire['0.5'], type: 'number', format: twoDigitAfterPointFormat })),
                        react_1.default.createElement("td", { className: "text-end" },
                            react_1.default.createElement(formatter_1.TextFormat, { value: datasourceMetrics.acquire['0.75'], type: 'number', format: twoDigitAfterPointFormat })),
                        react_1.default.createElement("td", { className: "text-end" },
                            react_1.default.createElement(formatter_1.TextFormat, { value: datasourceMetrics.acquire['0.95'], type: 'number', format: twoDigitAfterPointFormat })),
                        react_1.default.createElement("td", { className: "text-end" },
                            react_1.default.createElement(formatter_1.TextFormat, { value: datasourceMetrics.acquire['0.99'], type: 'number', format: twoDigitAfterPointFormat })),
                        react_1.default.createElement("td", { className: "text-end" },
                            react_1.default.createElement(formatter_1.TextFormat, { value: datasourceMetrics.acquire.max, type: 'number', format: twoDigitAfterPointFormat }))),
                    react_1.default.createElement("tr", null,
                        react_1.default.createElement("td", null, "Creation"),
                        react_1.default.createElement("td", { className: "text-end" }, datasourceMetrics.creation.count),
                        react_1.default.createElement("td", { className: "text-end" },
                            react_1.default.createElement(formatter_1.TextFormat, { value: datasourceMetrics.creation.mean, type: 'number', format: twoDigitAfterPointFormat })),
                        react_1.default.createElement("td", { className: "text-end" },
                            react_1.default.createElement(formatter_1.TextFormat, { value: datasourceMetrics.creation['0.0'], type: 'number', format: twoDigitAfterPointFormat })),
                        react_1.default.createElement("td", { className: "text-end" },
                            react_1.default.createElement(formatter_1.TextFormat, { value: datasourceMetrics.creation['0.5'], type: 'number', format: twoDigitAfterPointFormat })),
                        react_1.default.createElement("td", { className: "text-end" },
                            react_1.default.createElement(formatter_1.TextFormat, { value: datasourceMetrics.creation['0.75'], type: 'number', format: twoDigitAfterPointFormat })),
                        react_1.default.createElement("td", { className: "text-end" },
                            react_1.default.createElement(formatter_1.TextFormat, { value: datasourceMetrics.creation['0.95'], type: 'number', format: twoDigitAfterPointFormat })),
                        react_1.default.createElement("td", { className: "text-end" },
                            react_1.default.createElement(formatter_1.TextFormat, { value: datasourceMetrics.creation['0.99'], type: 'number', format: twoDigitAfterPointFormat })),
                        react_1.default.createElement("td", { className: "text-end" },
                            react_1.default.createElement(formatter_1.TextFormat, { value: datasourceMetrics.creation.max, type: 'number', format: twoDigitAfterPointFormat }))),
                    react_1.default.createElement("tr", null,
                        react_1.default.createElement("td", null, "Usage"),
                        react_1.default.createElement("td", { className: "text-end" }, datasourceMetrics.usage.count),
                        react_1.default.createElement("td", { className: "text-end" },
                            react_1.default.createElement(formatter_1.TextFormat, { value: datasourceMetrics.usage.mean, type: 'number', format: twoDigitAfterPointFormat })),
                        react_1.default.createElement("td", { className: "text-end" },
                            react_1.default.createElement(formatter_1.TextFormat, { value: datasourceMetrics.usage['0.0'], type: 'number', format: twoDigitAfterPointFormat })),
                        react_1.default.createElement("td", { className: "text-end" },
                            react_1.default.createElement(formatter_1.TextFormat, { value: datasourceMetrics.usage['0.5'], type: 'number', format: twoDigitAfterPointFormat })),
                        react_1.default.createElement("td", { className: "text-end" },
                            react_1.default.createElement(formatter_1.TextFormat, { value: datasourceMetrics.usage['0.75'], type: 'number', format: twoDigitAfterPointFormat })),
                        react_1.default.createElement("td", { className: "text-end" },
                            react_1.default.createElement(formatter_1.TextFormat, { value: datasourceMetrics.usage['0.95'], type: 'number', format: twoDigitAfterPointFormat })),
                        react_1.default.createElement("td", { className: "text-end" },
                            react_1.default.createElement(formatter_1.TextFormat, { value: datasourceMetrics.usage['0.99'], type: 'number', format: twoDigitAfterPointFormat })),
                        react_1.default.createElement("td", { className: "text-end" },
                            react_1.default.createElement(formatter_1.TextFormat, { value: datasourceMetrics.usage.max, type: 'number', format: twoDigitAfterPointFormat })))))));
    };
    return DatasourceMetrics;
}(react_1.default.Component));
exports.DatasourceMetrics = DatasourceMetrics;
//# sourceMappingURL=datasourceMetrics.js.map