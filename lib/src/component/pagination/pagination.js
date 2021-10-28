"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JhiPagination = void 0;
var tslib_1 = require("tslib");
var react_1 = (0, tslib_1.__importDefault)(require("react"));
var reactstrap_1 = require("reactstrap");
var JhiPagination = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(JhiPagination, _super);
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
                previousItem = (0, tslib_1.__assign)({}, item);
                if (item.display === 'hidden') {
                    previousItem.display = 'disabled';
                }
            }
            return items;
        };
        _this.displayPaginationItem = function (i, activePage) { return (react_1.default.createElement(reactstrap_1.PaginationItem, (0, tslib_1.__assign)({}, activePage === i + 1 && { active: true }, { key: i }),
            react_1.default.createElement(reactstrap_1.PaginationLink, { onClick: _this.updateActivePage(i + 1) }, i + 1))); };
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
        return (react_1.default.createElement("div", null,
            react_1.default.createElement(reactstrap_1.Pagination, null,
                react_1.default.createElement(reactstrap_1.PaginationItem, (0, tslib_1.__assign)({}, activePage === 1 && { disabled: true }),
                    react_1.default.createElement(reactstrap_1.PaginationLink, { first: true, onClick: this.updateActivePage(1) })),
                react_1.default.createElement(reactstrap_1.PaginationItem, (0, tslib_1.__assign)({}, activePage === 1 && { disabled: true }),
                    react_1.default.createElement(reactstrap_1.PaginationLink, { previous: true, onClick: this.previousPage })),
                this.itemsToDisplay(activePage).map(function (paginationItem, i) {
                    return paginationItem.display === 'display' ? (_this.displayPaginationItem(i, activePage)) : paginationItem.display === 'disabled' ? (react_1.default.createElement(reactstrap_1.PaginationItem, { disabled: true, key: i },
                        react_1.default.createElement(reactstrap_1.PaginationLink, null, "..."))) : null;
                }),
                react_1.default.createElement(reactstrap_1.PaginationItem, (0, tslib_1.__assign)({}, activePage === maxPage && { disabled: true }),
                    react_1.default.createElement(reactstrap_1.PaginationLink, { next: true, onClick: this.nextPage })),
                react_1.default.createElement(reactstrap_1.PaginationItem, (0, tslib_1.__assign)({}, activePage === maxPage && { disabled: true }),
                    react_1.default.createElement(reactstrap_1.PaginationLink, { last: true, onClick: this.updateActivePage(maxPage) })))));
    };
    return JhiPagination;
}(react_1.default.Component));
exports.JhiPagination = JhiPagination;
//# sourceMappingURL=pagination.js.map