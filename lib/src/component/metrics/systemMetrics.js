"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemMetrics = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const formatter_1 = require("../../formatter");
const reactstrap_1 = require("reactstrap");
class SystemMetrics extends react_1.default.Component {
    static convertMillisecondsToDuration(ms) {
        const times = {
            year: 31557600000,
            month: 2629746000,
            day: 86400000,
            hour: 3600000,
            minute: 60000,
            second: 1000,
        };
        let timeString = '';
        let plural = '';
        for (const key in times) {
            if (Math.floor(ms / times[key]) > 0) {
                plural = Math.floor(ms / times[key]) > 1 ? 's' : '';
                timeString += Math.floor(ms / times[key]).toString() + ' ' + key.toString() + plural + ' ';
                ms = ms - times[key] * Math.floor(ms / times[key]);
            }
        }
        return timeString;
    }
    render() {
        const { systemMetrics, wholeNumberFormat, timestampFormat } = this.props;
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
    }
}
exports.SystemMetrics = SystemMetrics;
//# sourceMappingURL=systemMetrics.js.map