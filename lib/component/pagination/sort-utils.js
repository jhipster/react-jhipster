"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSortState = void 0;
const util_1 = require("../../util");
const getSortState = (location, sortField = 'id', sortOrder = 'asc') => {
    const sortParam = (0, util_1.getUrlParameter)('sort', location.search);
    let sort = sortField;
    let order = sortOrder;
    if (sortParam !== '') {
        sort = sortParam.split(',')[0];
        order = sortParam.split(',')[1];
    }
    return { sort, order };
};
exports.getSortState = getSortState;
//# sourceMappingURL=sort-utils.js.map