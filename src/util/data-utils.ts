import React from 'react';

/*
 Copyright 2017-2025 the original author or authors from the JHipster project.
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
export const openFile = (contentType: string, data: string) => () => {
  const fileURL = `data:${contentType};base64,${data}`;
  const win = window.open();
  win.document.write(
    '<iframe src="' +
      fileURL +
      '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>',
  );
};

const toBase64 = (file: File, cb: (v: string) => void) => {
  const fileReader: FileReader = new FileReader();
  fileReader.readAsDataURL(file);
  fileReader.onload = e => {
    const { result } = e.target;
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    const resultString = typeof result === 'string' ? result : result.toString();
    const base64Data = resultString.substring(resultString.indexOf('base64,') + 'base64,'.length);
    cb(base64Data);
  };
};

const paddingSize = (value: string): number => {
  if (value.endsWith('==')) {
    return 2;
  }
  if (value.endsWith('=')) {
    return 1;
  }
  return 0;
};

const formatAsBytes = (sizeValue: number): string => sizeValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' bytes';

export const size = (value: string): number => (value.length / 4) * 3 - paddingSize(value);

export const byteSize = (base64String: string) => formatAsBytes(size(base64String));

export const setFileData = (
  event: React.ChangeEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>,
  callback: (type: any, v: string) => void,
  isImage: boolean,
) => {
  const target = event?.target;
  if (target && target.files && target.files[0]) {
    const file = target.files[0];
    if (isImage && !file.type.startsWith('image/')) {
      return;
    }

    toBase64(file, base64Data => {
      callback(file.type, base64Data);
    });
  } else {
    callback('', '');
  }
};
