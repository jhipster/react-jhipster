"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreadItem = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const reactstrap_1 = require("reactstrap");
class ThreadItem extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.state = {
            collapse: false,
        };
        this.toggleStackTrace = () => {
            this.setState({
                collapse: !this.state.collapse,
            });
        };
    }
    render() {
        const { threadDumpInfo } = this.props;
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("a", { onClick: this.toggleStackTrace, style: { color: 'hotpink' } }, this.state.collapse ? react_1.default.createElement("span", null, "Hide StackTrace") : react_1.default.createElement("span", null, "Show StackTrace")),
            react_1.default.createElement(reactstrap_1.Collapse, { isOpen: this.state.collapse },
                react_1.default.createElement(reactstrap_1.Card, null,
                    react_1.default.createElement(reactstrap_1.CardBody, null,
                        react_1.default.createElement(reactstrap_1.Row, { className: "break", style: { overflowX: 'scroll' } },
                            Object.entries(threadDumpInfo.stackTrace).map(([stK, stV]) => (react_1.default.createElement("samp", { key: `detail-${stK}` },
                                stV.className,
                                ".",
                                stV.methodName,
                                react_1.default.createElement("code", null,
                                    "(",
                                    stV.fileName,
                                    ":",
                                    stV.lineNumber,
                                    ")")))),
                            react_1.default.createElement("span", { className: "mt-1" })))))));
    }
}
exports.ThreadItem = ThreadItem;
exports.default = ThreadItem;
//# sourceMappingURL=thread-item.js.map