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
exports.SystemMetrics = void 0;
var react_1 = __importDefault(require("react"));
var formatter_1 = require("../../formatter");
var reactstrap_1 = require("reactstrap");
var SystemMetrics = /** @class */ (function (_super) {
    __extends(SystemMetrics, _super);
    function SystemMetrics() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SystemMetrics.convertMillisecondsToDuration = function (ms) {
        var times = {
            year: 31557600000,
            month: 2629746000,
            day: 86400000,
            hour: 3600000,
            minute: 60000,
            second: 1000
        };
        var timeString = '';
        var plural = '';
        for (var key in times) {
            if (Math.floor(ms / times[key]) > 0) {
                plural = Math.floor(ms / times[key]) > 1 ? 's' : '';
                timeString += Math.floor(ms / times[key]).toString() + ' ' + key.toString() + plural + ' ';
                ms = ms - times[key] * Math.floor(ms / times[key]);
            }
        }
        return timeString;
    };
    SystemMetrics.prototype.render = function () {
        var _a = this.props, systemMetrics = _a.systemMetrics, wholeNumberFormat = _a.wholeNumberFormat, timestampFormat = _a.timestampFormat;
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("h4", null, "System"),
            react_1.default.createElement(reactstrap_1.Row, null,
                react_1.default.createElement(reactstrap_1.Col, { md: "4" }, "Uptime"),
                react_1.default.createElement(reactstrap_1.Col, { md: "8", className: "text-end" }, SystemMetrics.convertMillisecondsToDuration(systemMetrics['process.uptime']))),
            react_1.default.createElement(reactstrap_1.Row, null,
                react_1.default.createElement(reactstrap_1.Col, { md: "4" }, "Start time"),
                react_1.default.createElement(reactstrap_1.Col, { md: "8", className: "text-end" },
                    react_1.default.createElement(formatter_1.TextFormat, { value: systemMetrics['process.start.time'], type: "date", format: timestampFormat }))),
            react_1.default.createElement(reactstrap_1.Row, null,
                react_1.default.createElement(reactstrap_1.Col, { md: "9" }, "Process CPU usage"),
                react_1.default.createElement(reactstrap_1.Col, { md: "3", className: "text-end" },
                    react_1.default.createElement(formatter_1.TextFormat, { value: 100 * systemMetrics['process.cpu.usage'], type: "number", format: wholeNumberFormat }),
                    " %")),
            react_1.default.createElement(reactstrap_1.Progress, { animated: true, value: 100 * systemMetrics['process.cpu.usage'], color: "success" },
                react_1.default.createElement("span", null,
                    react_1.default.createElement(formatter_1.TextFormat, { value: 100 * systemMetrics['process.cpu.usage'], type: "number", format: wholeNumberFormat }),
                    " %")),
            react_1.default.createElement(reactstrap_1.Row, null,
                react_1.default.createElement(reactstrap_1.Col, { md: "9" }, "System CPU usage"),
                react_1.default.createElement(reactstrap_1.Col, { md: "3", className: "text-end" },
                    react_1.default.createElement(formatter_1.TextFormat, { value: 100 * systemMetrics['system.cpu.usage'], type: "number", format: wholeNumberFormat }),
                    " %")),
            react_1.default.createElement(reactstrap_1.Progress, { animated: true, value: 100 * systemMetrics['system.cpu.usage'], color: "success" },
                react_1.default.createElement("span", null,
                    react_1.default.createElement(formatter_1.TextFormat, { value: 100 * systemMetrics['system.cpu.usage'], type: "number", format: wholeNumberFormat }),
                    " %")),
            react_1.default.createElement(reactstrap_1.Row, null,
                react_1.default.createElement(reactstrap_1.Col, { md: "9" }, "System CPU count"),
                react_1.default.createElement(reactstrap_1.Col, { md: "3", className: "text-end" }, systemMetrics['system.cpu.count'])),
            react_1.default.createElement(reactstrap_1.Row, null,
                react_1.default.createElement(reactstrap_1.Col, { md: "9" }, "System 1m Load average"),
                react_1.default.createElement(reactstrap_1.Col, { md: "3", className: "text-end" },
                    react_1.default.createElement(formatter_1.TextFormat, { value: systemMetrics['system.load.average.1m'], type: "number", format: wholeNumberFormat }))),
            react_1.default.createElement(reactstrap_1.Row, null,
                react_1.default.createElement(reactstrap_1.Col, { md: "7" }, "Process files max"),
                react_1.default.createElement(reactstrap_1.Col, { md: "5", className: "text-end" },
                    react_1.default.createElement(formatter_1.TextFormat, { value: systemMetrics['process.files.max'], type: "number", format: wholeNumberFormat }))),
            react_1.default.createElement(reactstrap_1.Row, null,
                react_1.default.createElement(reactstrap_1.Col, { md: "4" }, "Process files open"),
                react_1.default.createElement(reactstrap_1.Col, { md: "8", className: "text-end" },
                    react_1.default.createElement(formatter_1.TextFormat, { value: systemMetrics['process.files.open'], type: "number", format: wholeNumberFormat })))));
    };
    return SystemMetrics;
}(react_1.default.Component));
exports.SystemMetrics = SystemMetrics;
//# sourceMappingURL=systemMetrics.js.map