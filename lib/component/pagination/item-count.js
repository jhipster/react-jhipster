"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JhiItemCount = void 0;
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
const language_1 = require("../../language");
class JhiItemCount extends react_1.default.Component {
    constructor(props) {
        super(props);
    }
    i18nValues() {
        const { page, total, itemsPerPage } = this.props;
        const first = (page - 1) * itemsPerPage === 0 ? 1 : (page - 1) * itemsPerPage + 1;
        const second = page * itemsPerPage < total ? page * itemsPerPage : total;
        return {
            first,
            second,
            total,
        };
    }
    render() {
        const { page, total, itemsPerPage, i18nEnabled } = this.props;
        return (react_1.default.createElement("div", { className: "info jhi-item-count" }, i18nEnabled ? (react_1.default.createElement(language_1.Translate, { contentKey: "global.item-count", interpolate: this.i18nValues() }, "Count")) : (react_1.default.createElement("span", null,
            "Showing ",
            (page - 1) * itemsPerPage === 0 ? 1 : (page - 1) * itemsPerPage + 1,
            " -",
            ' ',
            page * itemsPerPage < total ? page * itemsPerPage : total,
            " of ",
            total,
            " items."))));
    }
}
exports.JhiItemCount = JhiItemCount;
//# sourceMappingURL=item-count.js.map