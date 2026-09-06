import React from 'react';

/*
 Copyright 2017-2026 the original author or authors from the JHipster project.
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
const DOWNLOAD_CONTENT_TYPE = 'application/octet-stream';

const MIME_TYPE_PATTERN = /^[a-z0-9][a-z0-9!#$&^_.+-]*\/[a-z0-9][a-z0-9!#$&^_.+-]*$/;

/**
 * @deprecated JHipster generates this utility in the application, use the generated `app/shared/util/data-utils` instead.
 *
 * Resolves the content type used to open a stored blob in a new window.
 * Images are opened inline, except XML based images like SVG which could execute scripts under the application origin.
 * Plain text and PDF are opened inline, browsers render PDF in an isolated viewer without access to the application origin.
 * Any other content is opened as a download.
 */
export const toOpenableContentType = (contentType: string | null | undefined): string => {
  const type = (contentType ?? '').split(';')[0].trim().toLowerCase();
  if (!MIME_TYPE_PATTERN.test(type) || type.endsWith('+xml')) {
    return DOWNLOAD_CONTENT_TYPE;
  }
  if (type.startsWith('image/') || type === 'text/plain' || type === 'application/pdf') {
    return type;
  }
  return DOWNLOAD_CONTENT_TYPE;
};

/**
 * @deprecated JHipster generates this utility in the application, use the generated `app/shared/util/data-utils` instead.
 *
 * Returns a click handler that opens a base64 encoded blob in a new window.
 * The stored content type is never trusted: only images, plain text and PDF are opened inline, anything else is downloaded.
 */
export const openFile = (contentType: string | null | undefined, data: string) => () => {
  const byteCharacters = atob(data);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.codePointAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], {
    type: toOpenableContentType(contentType),
  });
  const fileURL = globalThis.URL.createObjectURL(blob);
  const win = globalThis.open(fileURL);
  if (win) {
    win.onload = () => URL.revokeObjectURL(fileURL);
  }
};

const toBase64 = (file: File, cb: (v: string) => void) => {
  const fileReader: FileReader = new FileReader();
  fileReader.readAsDataURL(file);
  fileReader.onload = e => {
    if (!e.target) return;
    const { result } = e.target;
    if (typeof result !== 'string') return;
    const base64Data = result.substring(result.indexOf('base64,') + 'base64,'.length);
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
