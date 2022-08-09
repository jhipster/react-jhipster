"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JhiPagination = void 0;
const tslib_1 = require("tslib");
/*
 Copyright 2017-2022 the original author or authors from the JHipster project.

 This file is part of the JHipster project, see https://www.jhipster.tech/
 for more information.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
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