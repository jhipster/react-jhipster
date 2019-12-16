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
var threads_modal_1 = require("./threads-modal");
var JvmThreads = /** @class */ (function (_super) {
    __extends(JvmThreads, _super);
    function JvmThreads() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            showModal: false,
            threadStats: {
                threadDumpAll: 0,
                threadDumpRunnable: 0,
                threadDumpTimedWaiting: 0,
                threadDumpWaiting: 0,
                threadDumpBlocked: 0
            }
        };
        _this.openModal = function () {
            _this.setState({
                showModal: true
            });
        };
        _this.handleClose = function () {
            _this.setState({
                showModal: false
            });
        };
        _this.renderModal = function () { return React.createElement(threads_modal_1.default, { handleClose: _this.handleClose, showModal: _this.state.showModal, threadDump: _this.props.jvmThreads }); };
        return _this;
    }
    JvmThreads.prototype.countThreadByState = function () {
        if (this.props.jvmThreads.threads) {
            var threadStats_1 = {
                threadDumpAll: 0,
                threadDumpRunnable: 0,
                threadDumpTimedWaiting: 0,
                threadDumpWaiting: 0,
                threadDumpBlocked: 0
            };
            this.props.jvmThreads.threads.forEach(function (thread) {
                if (thread.threadState === 'RUNNABLE') {
                    threadStats_1.threadDumpRunnable += 1;
                }
                else if (thread.threadState === 'WAITING') {
                    threadStats_1.threadDumpWaiting += 1;
                }
                else if (thread.threadState === 'TIMED_WAITING') {
                    threadStats_1.threadDumpTimedWaiting += 1;
                }
                else if (thread.threadState === 'BLOCKED') {
                    threadStats_1.threadDumpBlocked += 1;
                }
            });
            threadStats_1.threadDumpAll =
                threadStats_1.threadDumpRunnable + threadStats_1.threadDumpWaiting + threadStats_1.threadDumpTimedWaiting + threadStats_1.threadDumpBlocked;
            this.setState({ threadStats: threadStats_1 });
        }
    };
    JvmThreads.prototype.componentDidMount = function () {
        if (this.props.jvmThreads.threads) {
            this.countThreadByState();
        }
    };
    JvmThreads.prototype.componentDidUpdate = function (prevProps) {
        if (this.props.jvmThreads.threads && this.props.jvmThreads.threads !== prevProps.jvmThreads.threads) {
            this.countThreadByState();
        }
    };
    JvmThreads.prototype.render = function () {
        var wholeNumberFormat = this.props.wholeNumberFormat;
        var threadStats = this.state.threadStats;
        return (React.createElement("div", null,
            React.createElement("b", null, "Threads"),
            " (Total: ",
            threadStats.threadDumpAll,
            ")",
            ' ',
            React.createElement("p", null,
                React.createElement("span", null, "Runnable"),
                " ",
                threadStats.threadDumpRunnable),
            React.createElement(reactstrap_1.Progress, { animated: true, min: "0", value: threadStats.threadDumpRunnable, max: threadStats.threadDumpAll, color: "success" },
                React.createElement("span", null,
                    React.createElement(formatter_1.TextFormat, { value: threadStats.threadDumpRunnable * 100 / threadStats.threadDumpAll, type: "number", format: wholeNumberFormat }))),
            React.createElement("p", null,
                React.createElement("span", null, "Timed Waiting"),
                " (",
                threadStats.threadDumpTimedWaiting,
                ")"),
            React.createElement(reactstrap_1.Progress, { animated: true, min: "0", value: threadStats.threadDumpTimedWaiting, max: threadStats.threadDumpAll, color: "warning" },
                React.createElement("span", null,
                    React.createElement(formatter_1.TextFormat, { value: threadStats.threadDumpTimedWaiting * 100 / threadStats.threadDumpAll, type: "number", format: wholeNumberFormat }))),
            React.createElement("p", null,
                React.createElement("span", null, "Waiting"),
                " (",
                threadStats.threadDumpWaiting,
                ")"),
            React.createElement(reactstrap_1.Progress, { animated: true, min: "0", value: threadStats.threadDumpWaiting, max: threadStats.threadDumpAll, color: "warning" },
                React.createElement("span", null,
                    React.createElement(formatter_1.TextFormat, { value: threadStats.threadDumpWaiting * 100 / threadStats.threadDumpAll, type: "number", format: wholeNumberFormat }))),
            React.createElement("p", null,
                React.createElement("span", null, "Blocked"),
                " (",
                threadStats.threadDumpBlocked,
                ")"),
            React.createElement(reactstrap_1.Progress, { animated: true, min: "0", value: threadStats.threadDumpBlocked, max: threadStats.threadDumpAll, color: "success" },
                React.createElement("span", null,
                    React.createElement(formatter_1.TextFormat, { value: threadStats.threadDumpBlocked * 100 / threadStats.threadDumpAll, type: "number", format: wholeNumberFormat }))),
            this.renderModal(),
            React.createElement(reactstrap_1.Button, { color: "primary", size: "sm", className: "hand", onClick: this.openModal }, "Expand")));
    };
    return JvmThreads;
}(React.Component));
exports.JvmThreads = JvmThreads;
//# sourceMappingURL=jvmThreads.js.map