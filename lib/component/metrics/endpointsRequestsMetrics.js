"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EndpointsRequestsMetrics = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const formatter_1 = require("../../formatter");
const reactstrap_1 = require("reactstrap");
class EndpointsRequestsMetrics extends react_1.default.Component {
    render() {
        const { endpointsRequestsMetrics, wholeNumberFormat } = this.props;
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("h3", null, "Endpoints requests (time in millisecond)"),
            react_1.default.createElement(reactstrap_1.Table, null,
                react_1.default.createElement("thead", null,
                    react_1.default.createElement("tr", null,
                        react_1.default.createElement("th", null, "Method"),
                        react_1.default.createElement("th", null, "Endpoint url"),
                        react_1.default.createElement("th", null, "Count"),
                        react_1.default.createElement("th", null, "Mean"))),
                react_1.default.createElement("tbody", null, Object.entries(endpointsRequestsMetrics).map(([key, entry]) => Object.entries(entry).map(([method, methodValue]) => (react_1.default.createElement("tr", { key: key + '-' + method },
                    react_1.default.createElement("td", null, method),
                    react_1.default.createElement("td", null, key),
                    react_1.default.createElement("td", null, methodValue.count),
                    react_1.default.createElement("td", null,
                        react_1.default.createElement(formatter_1.TextFormat, { value: methodValue.mean, type: "number", format: wholeNumberFormat }))))))))));
    }
}
exports.EndpointsRequestsMetrics = EndpointsRequestsMetrics;
//# sourceMappingURL=endpointsRequestsMetrics.js.map