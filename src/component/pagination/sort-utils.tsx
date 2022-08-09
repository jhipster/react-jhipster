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


import { getUrlParameter } from '../../util';

export interface ISortBaseState {
  sort: string;
  order: string;
}

export const getSortState = (
  location: { search: string },
  sortField = 'id',
  sortOrder = 'asc'
): ISortBaseState => {
  const sortParam = getUrlParameter('sort', location.search);
  let sort = sortField;
  let order = sortOrder;
  if (sortParam !== '') {
    sort = sortParam.split(',')[0];
    order = sortParam.split(',')[1];
  }
  return { sort, order };
};

