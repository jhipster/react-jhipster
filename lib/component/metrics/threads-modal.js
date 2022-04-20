"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreadsModal = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const reactstrap_1 = require("reactstrap");
const thread_item_1 = tslib_1.__importDefault(require("./thread-item"));
class ThreadsModal extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.state = {
            badgeFilter: '',
            searchFilter: '',
        };
        this.computeFilteredList = () => {
            const { badgeFilter, searchFilter } = this.state;
            let filteredList = this.props.threadDump.threads;
            if (badgeFilter !== '') {
                filteredList = filteredList.filter(t => t.threadState === badgeFilter);
            }
            if (searchFilter !== '') {
                filteredList = filteredList.filter(t => t.lockName && t.lockName.toLowerCase().includes(searchFilter.toLowerCase()));
            }
            return filteredList;
        };
        this.computeCounters = () => {
            let threadDumpAll = 0;
            let threadDumpRunnable = 0;
            let threadDumpWaiting = 0;
            let threadDumpTimedWaiting = 0;
            let threadDumpBlocked = 0;
            this.props.threadDump.threads.forEach(t => {
                switch (t.threadState) {
                    case 'RUNNABLE':
                        threadDumpRunnable++;
                        break;
                    case 'WAITING':
                        threadDumpWaiting++;
                        break;
                    case 'TIMED_WAITING':
                        threadDumpTimedWaiting++;
                        break;
                    case 'BLOCKED':
                        threadDumpBlocked++;
                        break;
                    default:
                        break;
                }
            });
            threadDumpAll = threadDumpRunnable + threadDumpWaiting + threadDumpTimedWaiting + threadDumpBlocked;
            return { threadDumpAll, threadDumpRunnable, threadDumpWaiting, threadDumpTimedWaiting, threadDumpBlocked };
        };
        this.getBadgeClass = threadState => {
            if (threadState === 'RUNNABLE') {
                return 'badge-success';
            }
            else if (threadState === 'WAITING') {
                return 'badge-info';
            }
            else if (threadState === 'TIMED_WAITING') {
                return 'badge-warning';
            }
            else if (threadState === 'BLOCKED') {
                return 'badge-danger';
            }
        };
        this.updateBadgeFilter = badge => () => this.setState({ badgeFilter: badge });
        this.updateSearchFilter = event => this.setState({ searchFilter: event.target.value });
    }
    render() {
        const { showModal, handleClose, threadDump } = this.props;
        let counters = {};
        let filteredList = null;
        if (threadDump && threadDump.threads) {
            counters = this.computeCounters();
            filteredList = this.computeFilteredList();
        }
        return (react_1.default.createElement(reactstrap_1.Modal, { isOpen: showModal, toggle: handleClose, className: "modal-lg" },
            react_1.default.createElement(reactstrap_1.ModalHeader, { toggle: handleClose }, "Threads dump"),
            react_1.default.createElement(reactstrap_1.ModalBody, null,
                react_1.default.createElement(reactstrap_1.Badge, { color: "primary", className: "hand", onClick: this.updateBadgeFilter('') },
                    "All\u00A0",
                    react_1.default.createElement(reactstrap_1.Badge, { pill: true }, counters.threadDumpAll || 0)),
                "\u00A0",
                react_1.default.createElement(reactstrap_1.Badge, { color: "success", className: "hand", onClick: this.updateBadgeFilter('RUNNABLE') },
                    "Runnable\u00A0",
                    react_1.default.createElement(reactstrap_1.Badge, { pill: true }, counters.threadDumpRunnable || 0)),
                "\u00A0",
                react_1.default.createElement(reactstrap_1.Badge, { color: "info", className: "hand", onClick: this.updateBadgeFilter('WAITING') },
                    "Waiting\u00A0",
                    react_1.default.createElement(reactstrap_1.Badge, { pill: true }, counters.threadDumpWaiting || 0)),
                "\u00A0",
                react_1.default.createElement(reactstrap_1.Badge, { color: "warning", className: "hand", onClick: this.updateBadgeFilter('TIMED_WAITING') },
                    "Timed Waiting\u00A0",
                    react_1.default.createElement(reactstrap_1.Badge, { pill: true }, counters.threadDumpTimedWaiting || 0)),
                "\u00A0",
                react_1.default.createElement(reactstrap_1.Badge, { color: "danger", className: "hand", onClick: this.updateBadgeFilter('BLOCKED') },
                    "Blocked\u00A0",
                    react_1.default.createElement(reactstrap_1.Badge, { pill: true }, counters.threadDumpBlocked || 0)),
                "\u00A0",
                react_1.default.createElement("div", { className: "mt-2" }, "\u00A0"),
                react_1.default.createElement(reactstrap_1.Input, { type: "text", className: "form-control", placeholder: "Filter by Lock Name...", onChange: this.updateSearchFilter }),
                react_1.default.createElement("div", { style: { padding: '10px' } }, filteredList
                    ? filteredList.map((threadDumpInfo, i) => (react_1.default.createElement("div", { key: `dump-${i}` },
                        react_1.default.createElement("h6", null,
                            ' ',
                            react_1.default.createElement("span", { className: 'badge ' + this.getBadgeClass(threadDumpInfo.threadState) }, threadDumpInfo.threadState),
                            "\u00A0",
                            threadDumpInfo.threadName,
                            " (ID ",
                            threadDumpInfo.threadId,
                            ")\u00A0"),
                        react_1.default.createElement(thread_item_1.default, { threadDumpInfo: threadDumpInfo }),
                        react_1.default.createElement(reactstrap_1.Row, null,
                            react_1.default.createElement(reactstrap_1.Table, { responsive: true },
                                react_1.default.createElement("thead", null,
                                    react_1.default.createElement("tr", null,
                                        react_1.default.createElement("th", null, "Blocked Time"),
                                        react_1.default.createElement("th", null, "Blocked Count"),
                                        react_1.default.createElement("th", null, "Waited Time"),
                                        react_1.default.createElement("th", null, "Waited Count"),
                                        react_1.default.createElement("th", null, "Lock Name"))),
                                react_1.default.createElement("tbody", null,
                                    react_1.default.createElement("tr", { key: threadDumpInfo.lockName },
                                        react_1.default.createElement("td", null, threadDumpInfo.blockedTime),
                                        react_1.default.createElement("td", null, threadDumpInfo.blockedCount),
                                        react_1.default.createElement("td", null, threadDumpInfo.waitedTime),
                                        react_1.default.createElement("td", null, threadDumpInfo.waitedCount),
                                        react_1.default.createElement("td", { className: "thread-dump-modal-lock", title: threadDumpInfo.lockName },
                                            react_1.default.createElement("code", null, threadDumpInfo.lockName)))))))))
                    : null)),
            react_1.default.createElement(reactstrap_1.ModalFooter, null,
                react_1.default.createElement(reactstrap_1.Button, { color: "primary", onClick: handleClose }, "Close"))));
    }
}
exports.ThreadsModal = ThreadsModal;
exports.default = ThreadsModal;
//# sourceMappingURL=threads-modal.js.map