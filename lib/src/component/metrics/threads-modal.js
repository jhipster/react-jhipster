"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreadsModal = void 0;
var tslib_1 = require("tslib");
var react_1 = (0, tslib_1.__importDefault)(require("react"));
var reactstrap_1 = require("reactstrap");
var thread_item_1 = (0, tslib_1.__importDefault)(require("./thread-item"));
var ThreadsModal = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(ThreadsModal, _super);
    function ThreadsModal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            badgeFilter: '',
            searchFilter: ''
        };
        _this.computeFilteredList = function () {
            var _a = _this.state, badgeFilter = _a.badgeFilter, searchFilter = _a.searchFilter;
            var filteredList = _this.props.threadDump.threads;
            if (badgeFilter !== '') {
                filteredList = filteredList.filter(function (t) { return t.threadState === badgeFilter; });
            }
            if (searchFilter !== '') {
                filteredList = filteredList.filter(function (t) { return t.lockName && t.lockName.toLowerCase().includes(searchFilter.toLowerCase()); });
            }
            return filteredList;
        };
        _this.computeCounters = function () {
            var threadDumpAll = 0;
            var threadDumpRunnable = 0;
            var threadDumpWaiting = 0;
            var threadDumpTimedWaiting = 0;
            var threadDumpBlocked = 0;
            _this.props.threadDump.threads.forEach(function (t) {
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
            return { threadDumpAll: threadDumpAll, threadDumpRunnable: threadDumpRunnable, threadDumpWaiting: threadDumpWaiting, threadDumpTimedWaiting: threadDumpTimedWaiting, threadDumpBlocked: threadDumpBlocked };
        };
        _this.getBadgeClass = function (threadState) {
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
        _this.updateBadgeFilter = function (badge) { return function () { return _this.setState({ badgeFilter: badge }); }; };
        _this.updateSearchFilter = function (event) { return _this.setState({ searchFilter: event.target.value }); };
        return _this;
    }
    ThreadsModal.prototype.render = function () {
        var _this = this;
        var _a = this.props, showModal = _a.showModal, handleClose = _a.handleClose, threadDump = _a.threadDump;
        var counters = {};
        var filteredList = null;
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
                    ? filteredList.map(function (threadDumpInfo, i) { return (react_1.default.createElement("div", { key: "dump-" + i },
                        react_1.default.createElement("h6", null,
                            ' ',
                            react_1.default.createElement("span", { className: 'badge ' + _this.getBadgeClass(threadDumpInfo.threadState) }, threadDumpInfo.threadState),
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
                                            react_1.default.createElement("code", null, threadDumpInfo.lockName)))))))); })
                    : null)),
            react_1.default.createElement(reactstrap_1.ModalFooter, null,
                react_1.default.createElement(reactstrap_1.Button, { color: "primary", onClick: handleClose }, "Close"))));
    };
    return ThreadsModal;
}(react_1.default.Component));
exports.ThreadsModal = ThreadsModal;
exports.default = ThreadsModal;
//# sourceMappingURL=threads-modal.js.map