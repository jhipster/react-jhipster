"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JvmThreads = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const formatter_1 = require("../../formatter");
const reactstrap_1 = require("reactstrap");
const threads_modal_1 = tslib_1.__importDefault(require("./threads-modal"));
class JvmThreads extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.state = {
            showModal: false,
            threadStats: {
                threadDumpAll: 0,
                threadDumpRunnable: 0,
                threadDumpTimedWaiting: 0,
                threadDumpWaiting: 0,
                threadDumpBlocked: 0,
            },
        };
        this.openModal = () => {
            this.setState({
                showModal: true,
            });
        };
        this.handleClose = e => {
            this.setState({
                showModal: false,
            });
        };
        this.renderModal = () => react_1.default.createElement(threads_modal_1.default, { handleClose: this.handleClose, showModal: this.state.showModal, threadDump: this.props.jvmThreads });
    }
    countThreadByState() {
        if (this.props.jvmThreads.threads) {
            const threadStats = {
                threadDumpAll: 0,
                threadDumpRunnable: 0,
                threadDumpTimedWaiting: 0,
                threadDumpWaiting: 0,
                threadDumpBlocked: 0,
            };
            this.props.jvmThreads.threads.forEach(thread => {
                if (thread.threadState === 'RUNNABLE') {
                    threadStats.threadDumpRunnable += 1;
                }
                else if (thread.threadState === 'WAITING') {
                    threadStats.threadDumpWaiting += 1;
                }
                else if (thread.threadState === 'TIMED_WAITING') {
                    threadStats.threadDumpTimedWaiting += 1;
                }
                else if (thread.threadState === 'BLOCKED') {
                    threadStats.threadDumpBlocked += 1;
                }
            });
            threadStats.threadDumpAll =
                threadStats.threadDumpRunnable + threadStats.threadDumpWaiting + threadStats.threadDumpTimedWaiting + threadStats.threadDumpBlocked;
            this.setState({ threadStats });
        }
    }
    componentDidMount() {
        if (this.props.jvmThreads.threads) {
            this.countThreadByState();
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.jvmThreads.threads && this.props.jvmThreads.threads !== prevProps.jvmThreads.threads) {
            this.countThreadByState();
        }
    }
    render() {
        const { wholeNumberFormat } = this.props;
        const { threadStats } = this.state;
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("b", null, "Threads"),
            " (Total: ",
            threadStats.threadDumpAll,
            ")",
            ' ',
            react_1.default.createElement("p", null,
                react_1.default.createElement("span", null, "Runnable"),
                " ",
                threadStats.threadDumpRunnable),
            react_1.default.createElement(reactstrap_1.Progress, { animated: true, min: "0", value: threadStats.threadDumpRunnable, max: threadStats.threadDumpAll, color: "success" },
                react_1.default.createElement("span", null,
                    react_1.default.createElement(formatter_1.TextFormat, { value: (threadStats.threadDumpRunnable * 100) / threadStats.threadDumpAll, type: "number", format: wholeNumberFormat }))),
            react_1.default.createElement("p", null,
                react_1.default.createElement("span", null, "Timed Waiting"),
                " (",
                threadStats.threadDumpTimedWaiting,
                ")"),
            react_1.default.createElement(reactstrap_1.Progress, { animated: true, min: "0", value: threadStats.threadDumpTimedWaiting, max: threadStats.threadDumpAll, color: "warning" },
                react_1.default.createElement("span", null,
                    react_1.default.createElement(formatter_1.TextFormat, { value: (threadStats.threadDumpTimedWaiting * 100) / threadStats.threadDumpAll, type: "number", format: wholeNumberFormat }))),
            react_1.default.createElement("p", null,
                react_1.default.createElement("span", null, "Waiting"),
                " (",
                threadStats.threadDumpWaiting,
                ")"),
            react_1.default.createElement(reactstrap_1.Progress, { animated: true, min: "0", value: threadStats.threadDumpWaiting, max: threadStats.threadDumpAll, color: "warning" },
                react_1.default.createElement("span", null,
                    react_1.default.createElement(formatter_1.TextFormat, { value: (threadStats.threadDumpWaiting * 100) / threadStats.threadDumpAll, type: "number", format: wholeNumberFormat }))),
            react_1.default.createElement("p", null,
                react_1.default.createElement("span", null, "Blocked"),
                " (",
                threadStats.threadDumpBlocked,
                ")"),
            react_1.default.createElement(reactstrap_1.Progress, { animated: true, min: "0", value: threadStats.threadDumpBlocked, max: threadStats.threadDumpAll, color: "success" },
                react_1.default.createElement("span", null,
                    react_1.default.createElement(formatter_1.TextFormat, { value: (threadStats.threadDumpBlocked * 100) / threadStats.threadDumpAll, type: "number", format: wholeNumberFormat }))),
            this.renderModal(),
            react_1.default.createElement(reactstrap_1.Button, { color: "primary", size: "sm", className: "hand", onClick: this.openModal }, "Expand")));
    }
}
exports.JvmThreads = JvmThreads;
//# sourceMappingURL=jvmThreads.js.map