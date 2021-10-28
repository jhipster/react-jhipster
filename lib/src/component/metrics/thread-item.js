"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreadItem = void 0;
var tslib_1 = require("tslib");
var react_1 = (0, tslib_1.__importDefault)(require("react"));
var reactstrap_1 = require("reactstrap");
var ThreadItem = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(ThreadItem, _super);
    function ThreadItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            collapse: false
        };
        _this.toggleStackTrace = function () {
            _this.setState({
                collapse: !_this.state.collapse
            });
        };
        return _this;
    }
    ThreadItem.prototype.render = function () {
        var threadDumpInfo = this.props.threadDumpInfo;
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("a", { onClick: this.toggleStackTrace, style: { color: 'hotpink' } }, this.state.collapse ? react_1.default.createElement("span", null, "Hide StackTrace") : react_1.default.createElement("span", null, "Show StackTrace")),
            react_1.default.createElement(reactstrap_1.Collapse, { isOpen: this.state.collapse },
                react_1.default.createElement(reactstrap_1.Card, null,
                    react_1.default.createElement(reactstrap_1.CardBody, null,
                        react_1.default.createElement(reactstrap_1.Row, { className: "break", style: { overflowX: 'scroll' } },
                            Object.entries(threadDumpInfo.stackTrace).map(function (_a) {
                                var stK = _a[0], stV = _a[1];
                                return (react_1.default.createElement("samp", { key: "detail-" + stK },
                                    stV.className,
                                    ".",
                                    stV.methodName,
                                    react_1.default.createElement("code", null,
                                        "(",
                                        stV.fileName,
                                        ":",
                                        stV.lineNumber,
                                        ")")));
                            }),
                            react_1.default.createElement("span", { className: "mt-1" })))))));
    };
    return ThreadItem;
}(react_1.default.Component));
exports.ThreadItem = ThreadItem;
exports.default = ThreadItem;
//# sourceMappingURL=thread-item.js.map