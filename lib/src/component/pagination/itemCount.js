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
/*
 Copyright 2013-2019 the original author or authors from the JHipster project.

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
var React = require("react");
var language_1 = require("../../language");
var JhiItemCount = /** @class */ (function (_super) {
    __extends(JhiItemCount, _super);
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
        return (React.createElement("div", { className: "info jhi-item-count" }, i18nEnabled ? (React.createElement(language_1.Translate, { contentKey: "global.item-count", interpolate: this.i18nValues() }, "Count")) : (React.createElement("span", null,
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
}(React.Component));
exports.JhiItemCount = JhiItemCount;
//# sourceMappingURL=itemCount.js.map