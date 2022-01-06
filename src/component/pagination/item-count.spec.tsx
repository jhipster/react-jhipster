/**
 * @jest-environment jsdom
 */
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
import React from 'react';
import { render, screen } from '@testing-library/react';

import { JhiItemCount } from './item-count';
import { TranslatorContext } from '../../language';
describe('JhiItemCountComponent test', () => {
  describe('UI logic tests', () => {
    it('should change the content on page change', () => {
      const { rerender } = render(<JhiItemCount page={1} itemsPerPage={10} total={100} />);

      expect(screen.getByText('Showing 1 - 10 of 100 items.')).not.toBeNull();

      rerender(<JhiItemCount page={2} itemsPerPage={10} total={100} />);

      expect(screen.getByText('Showing 11 - 20 of 100 items.')).not.toBeNull();
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
      const mountedWrapper = render(<JhiItemCount page={1} itemsPerPage={10} total={100} i18nEnabled />);
      expect(mountedWrapper.getByText('Showing 1 - 10 of 100 items.')).not.toBeNull();

      TranslatorContext.setLocale('fr');
      const mountedWrapperFr = render(<JhiItemCount page={1} itemsPerPage={10} total={100} i18nEnabled />);
      expect(mountedWrapperFr.getByText('Affichage 1 - 10 de 100 items.')).not.toBeNull();

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
