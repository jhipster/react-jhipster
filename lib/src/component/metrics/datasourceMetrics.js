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
exports.DatasourceMetrics = void 0;
var react_1 = __importDefault(require("react"));
var formatter_1 = require("../../formatter");
var reactstrap_1 = require("reactstrap");
var DatasourceMetrics = /** @class */ (function (_super) {
    __extends(DatasourceMetrics, _super);
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