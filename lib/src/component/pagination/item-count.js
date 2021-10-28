"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JhiItemCount = void 0;
var tslib_1 = require("tslib");
/*
 Copyright 2017-2021 the original author or authors from the JHipster project.

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
var react_1 = (0, tslib_1.__importDefault)(require("react"));
var language_1 = require("../../language");
var JhiItemCount = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(JhiItemCount, _super);
    function JhiItemCount(props) {
        return _super.call(this, props) || this;
    }
    JhiItemCount.prototype.i18nValues = function () {
        var _a = this.props, page = _a.page, total = _a.total, itemsPerPage = _a.itemsPerPage;
        var first = (page - 1) * itemsPerPage === 0 ? 1 : (page - 1) * itemsPerPage + 1;
        var second = page * itemsPerPage < total ? page * itemsPerPage : total;
        return {
            first: first,
            second: second,
            total: total
        };
    };
    JhiItemCount.prototype.render = function () {
        var _a = this.props, page = _a.page, total = _a.total, itemsPerPage = _a.itemsPerPage, i18nEnabled = _a.i18nEnabled;
        return (react_1.default.createElement("div", { className: "info jhi-item-count" }, i18nEnabled ? (react_1.default.createElement(language_1.Translate, { contentKey: "global.item-count", interpolate: this.i18nValues() }, "Count")) : (react_1.default.createElement("span", null,
            "Showing ",
            (page - 1) * itemsPerPage === 0 ? 1 : (page - 1) * itemsPerPage + 1,
            " -",
            ' ',
            page * itemsPerPage < total ? page * itemsPerPage : total,
            " of ",
            total,
            " items."))));
    };
    return JhiItemCount;
}(react_1.default.Component));
exports.JhiItemCount = JhiItemCount;
//# sourceMappingURL=item-count.js.map