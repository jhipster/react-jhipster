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
var thread_item_1 = require("./thread-item");
var ThreadsModal = /** @class */ (function (_super) {
    __extends(ThreadsModal, _super);
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
        return (React.createElement(reactstrap_1.Modal, { isOpen: showModal, toggle: handleClose, className: "modal-lg" },
            React.createElement(reactstrap_1.ModalHeader, { toggle: handleClose }, "Threads dump"),
            React.createElement(reactstrap_1.ModalBody, null,
                React.createElement(reactstrap_1.Badge, { color: "primary", className: "hand", onClick: this.updateBadgeFilter('') },
                    "All\u00A0",
                    React.createElement(reactstrap_1.Badge, { pill: true }, counters.threadDumpAll || 0)),
                "\u00A0",
                React.createElement(reactstrap_1.Badge, { color: "success", className: "hand", onClick: this.updateBadgeFilter('RUNNABLE') },
                    "Runnable\u00A0",
                    React.createElement(reactstrap_1.Badge, { pill: true }, counters.threadDumpRunnable || 0)),
                "\u00A0",
                React.createElement(reactstrap_1.Badge, { color: "info", className: "hand", onClick: this.updateBadgeFilter('WAITING') },
                    "Waiting\u00A0",
                    React.createElement(reactstrap_1.Badge, { pill: true }, counters.threadDumpWaiting || 0)),
                "\u00A0",
                React.createElement(reactstrap_1.Badge, { color: "warning", className: "hand", onClick: this.updateBadgeFilter('TIMED_WAITING') },
                    "Timed Waiting\u00A0",
                    React.createElement(reactstrap_1.Badge, { pill: true }, counters.threadDumpTimedWaiting || 0)),
                "\u00A0",
                React.createElement(reactstrap_1.Badge, { color: "danger", className: "hand", onClick: this.updateBadgeFilter('BLOCKED') },
                    "Blocked\u00A0",
                    React.createElement(reactstrap_1.Badge, { pill: true }, counters.threadDumpBlocked || 0)),
                "\u00A0",
                React.createElement("div", { className: "mt-2" }, "\u00A0"),
                React.createElement(reactstrap_1.Input, { type: "text", className: "form-control", placeholder: "Filter by Lock Name...", onChange: this.updateSearchFilter }),
                React.createElement("div", { style: { padding: '10px' } }, filteredList
                    ? filteredList.map(function (threadDumpInfo, i) { return (React.createElement("div", { key: "dump-" + i },
                        React.createElement("h6", null,
                            ' ',
                            React.createElement("span", { className: 'badge ' + _this.getBadgeClass(threadDumpInfo.threadState) }, threadDumpInfo.threadState),
                            "\u00A0",
                            threadDumpInfo.threadName,
                            " (ID ",
                            threadDumpInfo.threadId,
                            ")\u00A0"),
                        React.createElement(thread_item_1.default, { threadDumpInfo: threadDumpInfo }),
                        React.createElement(reactstrap_1.Row, null,
                            React.createElement(reactstrap_1.Table, { responsive: true },
                                React.createElement("thead", null,
                                    React.createElement("tr", null,
                                        React.createElement("th", null, "Blocked Time"),
                                        React.createElement("th", null, "Blocked Count"),
                                        React.createElement("th", null, "Waited Time"),
                                        React.createElement("th", null, "Waited Count"),
                                        React.createElement("th", null, "Lock Name"))),
                                React.createElement("tbody", null,
                                    React.createElement("tr", { key: threadDumpInfo.lockName },
                                        React.createElement("td", null, threadDumpInfo.blockedTime),
                                        React.createElement("td", null, threadDumpInfo.blockedCount),
                                        React.createElement("td", null, threadDumpInfo.waitedTime),
                                        React.createElement("td", null, threadDumpInfo.waitedCount),
                                        React.createElement("td", { className: "thread-dump-modal-lock", title: threadDumpInfo.lockName },
                                            React.createElement("code", null, threadDumpInfo.lockName)))))))); })
                    : null)),
            React.createElement(reactstrap_1.ModalFooter, null,
                React.createElement(reactstrap_1.Button, { color: "primary", onClick: handleClose }, "Close"))));
    };
    return ThreadsModal;
}(React.Component));
exports.ThreadsModal = ThreadsModal;
exports.default = ThreadsModal;
//# sourceMappingURL=threads-modal.js.map