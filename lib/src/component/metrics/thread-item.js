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
var reactstrap_1 = require("reactstrap");
var ThreadItem = /** @class */ (function (_super) {
    __extends(ThreadItem, _super);
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
        return (React.createElement("div", null,
            React.createElement("a", { onClick: this.toggleStackTrace, style: { color: 'hotpink' } }, this.state.collapse ? React.createElement("span", null, "Hide StackTrace") : React.createElement("span", null, "Show StackTrace")),
            React.createElement(reactstrap_1.Collapse, { isOpen: this.state.collapse },
                React.createElement(reactstrap_1.Card, null,
                    React.createElement(reactstrap_1.CardBody, null,
                        React.createElement(reactstrap_1.Row, { className: "break", style: { overflowX: 'scroll' } },
                            Object.entries(threadDumpInfo.stackTrace).map(function (_a) {
                                var stK = _a[0], stV = _a[1];
                                return (React.createElement("samp", { key: "detail-" + stK },
                                    stV.className,
                                    ".",
                                    stV.methodName,
                                    React.createElement("code", null,
                                        "(",
                                        stV.fileName,
                                        ":",
                                        stV.lineNumber,
                                        ")")));
                            }),
                            React.createElement("span", { className: "mt-1" })))))));
    };
    return ThreadItem;
}(React.Component));
exports.ThreadItem = ThreadItem;
exports.default = ThreadItem;
//# sourceMappingURL=thread-item.js.map