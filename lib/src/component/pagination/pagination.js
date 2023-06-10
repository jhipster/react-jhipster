"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JhiPagination = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const reactstrap_1 = require("reactstrap");
class JhiPagination extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.updateActivePage = currentPage => () => {
            this.setState({ currentPage });
            this.props.onSelect(currentPage);
        };
        this.previousPage = () => {
            this.setState({ currentPage: this.state.currentPage - 1 });
            this.props.onSelect(this.state.currentPage - 1);
        };
        this.nextPage = () => {
            this.setState({ currentPage: this.state.currentPage + 1 });
            this.props.onSelect(this.state.currentPage + 1);
        };
        this.itemsToDisplay = activePage => {
            const items = [];
            let item = {};
            let previousItem = {};
            const maxPage = this.getMaxPage();
            const padSup = Math.floor((this.props.maxButtons - 1) / 2);
            const modulo = (this.props.maxButtons - 1) % 2;
            const padInf = padSup + modulo;
            for (let j = 0; j < maxPage; j++) {
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
                previousItem = Object.assign({}, item);
                if (item.display === 'hidden') {
                    previousItem.display = 'disabled';
                }
            }
            return items;
        };
        this.displayPaginationItem = (i, activePage) => (react_1.default.createElement(reactstrap_1.PaginationItem, Object.assign({}, (activePage === i + 1 && { active: true }), { key: i }),
            react_1.default.createElement(reactstrap_1.PaginationLink, { onClick: this.updateActivePage(i + 1) }, i + 1)));
        this.cleanActivePage = () => {
            const { totalItems, itemsPerPage, activePage } = this.props;
            const cleanActivePage = totalItems === 0 ? 1 : Math.min(activePage, Math.ceil(totalItems / itemsPerPage));
            if (cleanActivePage !== activePage) {
                this.updateActivePage(cleanActivePage)();
            }
        };
        this.getMaxPage = () => {
            const { itemsPerPage, totalItems } = this.props;
            const division = Math.floor(totalItems / itemsPerPage);
            const modulo = totalItems % itemsPerPage;
            return division + (modulo !== 0 ? 1 : 0);
        };
        this.state = {
            currentPage: this.props.activePage,
        };
    }
    render() {
        this.cleanActivePage();
        const { activePage } = this.props;
        const maxPage = this.getMaxPage();
        return (react_1.default.createElement("div", null,
            react_1.default.createElement(reactstrap_1.Pagination, null,
                react_1.default.createElement(reactstrap_1.PaginationItem, Object.assign({}, (activePage === 1 && { disabled: true })),
                    react_1.default.createElement(reactstrap_1.PaginationLink, { first: true, onClick: this.updateActivePage(1) })),
                react_1.default.createElement(reactstrap_1.PaginationItem, Object.assign({}, (activePage === 1 && { disabled: true })),
                    react_1.default.createElement(reactstrap_1.PaginationLink, { previous: true, onClick: this.previousPage })),
                this.itemsToDisplay(activePage).map((paginationItem, i) => paginationItem.display === 'display' ? (this.displayPaginationItem(i, activePage)) : paginationItem.display === 'disabled' ? (react_1.default.createElement(reactstrap_1.PaginationItem, { disabled: true, key: i },
                    react_1.default.createElement(reactstrap_1.PaginationLink, null, "..."))) : null),
                react_1.default.createElement(reactstrap_1.PaginationItem, Object.assign({}, (activePage === maxPage && { disabled: true })),
                    react_1.default.createElement(reactstrap_1.PaginationLink, { next: true, onClick: this.nextPage })),
                react_1.default.createElement(reactstrap_1.PaginationItem, Object.assign({}, (activePage === maxPage && { disabled: true })),
                    react_1.default.createElement(reactstrap_1.PaginationLink, { last: true, onClick: this.updateActivePage(maxPage) })))));
    }
}
exports.JhiPagination = JhiPagination;
//# sourceMappingURL=pagination.js.map