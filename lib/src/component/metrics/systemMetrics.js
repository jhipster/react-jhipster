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
        return (React.createElement("div", null,
            React.createElement("h4", null, "System"),
            React.createElement(reactstrap_1.Row, null,
                React.createElement(reactstrap_1.Col, { md: "4" }, "Uptime"),
                React.createElement(reactstrap_1.Col, { md: "8", className: "text-right" }, SystemMetrics.convertMillisecondsToDuration(systemMetrics['process.uptime']))),
            React.createElement(reactstrap_1.Row, null,
                React.createElement(reactstrap_1.Col, { md: "4" }, "Start time"),
                React.createElement(reactstrap_1.Col, { md: "8", className: "text-right" },
                    React.createElement(formatter_1.TextFormat, { value: systemMetrics['process.start.time'], type: "date", format: timestampFormat }))),
            React.createElement(reactstrap_1.Row, null,
                React.createElement(reactstrap_1.Col, { md: "9" }, "Process CPU usage"),
                React.createElement(reactstrap_1.Col, { md: "3", className: "text-right" },
                    React.createElement(formatter_1.TextFormat, { value: 100 * systemMetrics['process.cpu.usage'], type: "number", format: wholeNumberFormat }),
                    " %")),
            React.createElement(reactstrap_1.Progress, { animated: true, value: 100 * systemMetrics['process.cpu.usage'], color: "success" },
                React.createElement("span", null,
                    React.createElement(formatter_1.TextFormat, { value: 100 * systemMetrics['process.cpu.usage'], type: "number", format: wholeNumberFormat }),
                    " %")),
            React.createElement(reactstrap_1.Row, null,
                React.createElement(reactstrap_1.Col, { md: "9" }, "System CPU usage"),
                React.createElement(reactstrap_1.Col, { md: "3", className: "text-right" },
                    React.createElement(formatter_1.TextFormat, { value: 100 * systemMetrics['system.cpu.usage'], type: "number", format: wholeNumberFormat }),
                    " %")),
            React.createElement(reactstrap_1.Progress, { animated: true, value: 100 * systemMetrics['system.cpu.usage'], color: "success" },
                React.createElement("span", null,
                    React.createElement(formatter_1.TextFormat, { value: 100 * systemMetrics['system.cpu.usage'], type: "number", format: wholeNumberFormat }),
                    " %")),
            React.createElement(reactstrap_1.Row, null,
                React.createElement(reactstrap_1.Col, { md: "9" }, "System CPU count"),
                React.createElement(reactstrap_1.Col, { md: "3", className: "text-right" }, systemMetrics['system.cpu.count'])),
            React.createElement(reactstrap_1.Row, null,
                React.createElement(reactstrap_1.Col, { md: "9" }, "System 1m Load average"),
                React.createElement(reactstrap_1.Col, { md: "3", className: "text-right" },
                    React.createElement(formatter_1.TextFormat, { value: systemMetrics['system.load.average.1m'], type: "number", format: wholeNumberFormat }))),
            React.createElement(reactstrap_1.Row, null,
                React.createElement(reactstrap_1.Col, { md: "7" }, "Process files max"),
                React.createElement(reactstrap_1.Col, { md: "5", className: "text-right" },
                    React.createElement(formatter_1.TextFormat, { value: systemMetrics['process.files.max'], type: "number", format: wholeNumberFormat }))),
            React.createElement(reactstrap_1.Row, null,
                React.createElement(reactstrap_1.Col, { md: "4" }, "Process files open"),
                React.createElement(reactstrap_1.Col, { md: "8", className: "text-right" },
                    React.createElement(formatter_1.TextFormat, { value: systemMetrics['process.files.open'], type: "number", format: wholeNumberFormat })))));
    };
    return SystemMetrics;
}(React.Component));
exports.SystemMetrics = SystemMetrics;
//# sourceMappingURL=systemMetrics.js.map