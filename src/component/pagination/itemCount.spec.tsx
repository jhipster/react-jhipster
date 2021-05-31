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
import * as React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';

import { JhiItemCount } from './itemCount';
import { TranslatorContext } from '../../language';

describe('JhiItemCountComponent test', () => {
  describe('UI logic tests', () => {
    it('should change the content on page change', () => {
      const mountedWrapper = mount(<JhiItemCount page={1} itemsPerPage={10} total={100} />);
      const span = mountedWrapper.find('span');
      expect(span.html()).to.equal('<span>Showing 1 - 10 of 100 items.</span>');

      mountedWrapper.setProps({ page: 2 });

      expect(span.html()).to.equal('<span>Showing 11 - 20 of 100 items.</span>');
    });
  });

  describe('Translation tests', () => {
    it('should change on language change', () => {
      TranslatorContext.registerTranslations('en', {
        global: {
          'item-count': 'Showing {{first}} - {{second}} of {{total}} items.',
        },
      });

      TranslatorContext.registerTranslations('fr', {
        global: {
          'item-count': 'Affichage {{first}} - {{second}} de {{total}} items.',
        },
      });
      TranslatorContext.setLocale('en');
      const mountedWrapper = mount(<JhiItemCount page={1} itemsPerPage={10} total={100} i18nEnabled />);
      let span = mountedWrapper.find('span');
      expect(span.html()).to.equal('<span>Showing 1 - 10 of 100 items.</span>');

      TranslatorContext.setLocale('fr');
      const mountedWrapperFr = mount(<JhiItemCount page={1} itemsPerPage={10} total={100} i18nEnabled />);
      span = mountedWrapperFr.find('span');
      expect(span.html()).to.equal('<span>Affichage 1 - 10 de 100 items.</span>');

      // Reset TranslatorContext to default so that other tests pass
      TranslatorContext.context = {
        ...TranslatorContext.context,
        translations: {},
        locale: null,
        previousLocale: null,
      };
    });
  });
});
