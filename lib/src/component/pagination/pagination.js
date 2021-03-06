"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JhiPagination = void 0;
var React = require("react");
var reactstrap_1 = require("reactstrap");
var JhiPagination = /** @class */ (function (_super) {
    __extends(JhiPagination, _super);
    function JhiPagination(props) {
        var _this = _super.call(this, props) || this;
        _this.updateActivePage = function (currentPage) { return function () {
            _this.setState({ currentPage: currentPage });
            _this.props.onSelect(currentPage);
        }; };
        _this.previousPage = function () {
            _this.setState({ currentPage: _this.state.currentPage - 1 });
            _this.props.onSelect(_this.state.currentPage - 1);
        };
        _this.nextPage = function () {
            _this.setState({ currentPage: _this.state.currentPage + 1 });
            _this.props.onSelect(_this.state.currentPage + 1);
        };
        _this.itemsToDisplay = function (activePage) {
            var items = [];
            var item = {};
            var previousItem = {};
            var maxPage = _this.getMaxPage();
            var padSup = Math.floor((_this.props.maxButtons - 1) / 2);
            var modulo = (_this.props.maxButtons - 1) % 2;
            var padInf = padSup + modulo;
            for (var j = 0; j < maxPage; j++) {
                item = {};
                if (j === 0 ||
                    j === maxPage - 1 ||
                    j === activePage - 1 ||
                    j === activePage - 2 ||
                    (activePage === 1 && j === 1) ||
                    (activePage - padInf < j && j < activePage + padSup)) {
                    item.display = 'display';
                }
                else if (previousItem.display === 'disabled') {
                    item.display = 'hidden';
                }
                else {
                    item.display = 'disabled';
                }
                items.push(item);
                previousItem = __assign({}, item);
                if (item.display === 'hidden') {
                    previousItem.display = 'disabled';
                }
            }
            return items;
        };
        _this.displayPaginationItem = function (i, activePage) { return (React.createElement(reactstrap_1.PaginationItem, __assign({}, activePage === i + 1 && { active: true }, { key: i }),
            React.createElement(reactstrap_1.PaginationLink, { onClick: _this.updateActivePage(i + 1) }, i + 1))); };
        _this.cleanActivePage = function () {
            var _a = _this.props, totalItems = _a.totalItems, itemsPerPage = _a.itemsPerPage, activePage = _a.activePage;
            var cleanActivePage = totalItems === 0 ? 1 : Math.min(activePage, Math.ceil(totalItems / itemsPerPage));
            if (cleanActivePage !== activePage) {
                _this.updateActivePage(cleanActivePage)();
            }
        };
        _this.getMaxPage = function () {
            var _a = _this.props, itemsPerPage = _a.itemsPerPage, totalItems = _a.totalItems;
            var division = Math.floor(totalItems / itemsPerPage);
            var modulo = totalItems % itemsPerPage;
            return division + (modulo !== 0 ? 1 : 0);
        };
        _this.state = {
            currentPage: _this.props.activePage
        };
        return _this;
    }
    JhiPagination.prototype.render = function () {
        var _this = this;
        this.cleanActivePage();
        var activePage = this.props.activePage;
        var maxPage = this.getMaxPage();
        return (React.createElement("div", null,
            React.createElement(reactstrap_1.Pagination, null,
                React.createElement(reactstrap_1.PaginationItem, __assign({}, activePage === 1 && { disabled: true }),
                    React.createElement(reactstrap_1.PaginationLink, { first: true, onClick: this.updateActivePage(1) })),
                React.createElement(reactstrap_1.PaginationItem, __assign({}, activePage === 1 && { disabled: true }),
                    React.createElement(reactstrap_1.PaginationLink, { previous: true, onClick: this.previousPage })),
                this.itemsToDisplay(activePage).map(function (paginationItem, i) {
                    return paginationItem.display === 'display' ? (_this.displayPaginationItem(i, activePage)) : paginationItem.display === 'disabled' ? (React.createElement(reactstrap_1.PaginationItem, { disabled: true, key: i },
                        React.createElement(reactstrap_1.PaginationLink, null, "..."))) : null;
                }),
                React.createElement(reactstrap_1.PaginationItem, __assign({}, activePage === maxPage && { disabled: true }),
                    React.createElement(reactstrap_1.PaginationLink, { next: true, onClick: this.nextPage })),
                React.createElement(reactstrap_1.PaginationItem, __assign({}, activePage === maxPage && { disabled: true }),
                    React.createElement(reactstrap_1.PaginationLink, { last: true, onClick: this.updateActivePage(maxPage) })))));
    };
    return JhiPagination;
}(React.Component));
exports.JhiPagination = JhiPagination;
//# sourceMappingURL=pagination.js.map