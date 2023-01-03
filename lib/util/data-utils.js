"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setFileData = exports.byteSize = exports.size = exports.openFile = void 0;
/*
 Copyright 2017-2023 the original author or authors from the JHipster project.
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
const openFile = (contentType, data) => () => {
    const fileURL = `data:${contentType};base64,${data}`;
    const win = window.open();
    win.document.write('<iframe src="' +
        fileURL +
        '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
};
exports.openFile = openFile;
const toBase64 = (file, cb) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = e => {
        const base64Data = e.target['result'].toString().substr(e.target['result'].toString().indexOf('base64,') + 'base64,'.length);
        cb(base64Data);
    };
};
const paddingSize = (value) => {
    if (value.endsWith('==')) {
        return 2;
    }
    if (value.endsWith('=')) {
        return 1;
    }
    return 0;
};
const formatAsBytes = (sizeValue) => sizeValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' bytes';
const size = (value) => (value.length / 4) * 3 - paddingSize(value);
exports.size = size;
const byteSize = (base64String) => formatAsBytes((0, exports.size)(base64String));
exports.byteSize = byteSize;
const setFileData = (event, callback, isImage) => {
    const target = event === null || event === void 0 ? void 0 : event.target;
    if (target && target.files && target.files[0]) {
        const file = target.files[0];
        if (isImage && !file.type.startsWith('image/')) {
            return;
        }
        toBase64(file, base64Data => {
            callback(file.type, base64Data);
        });
    }
    else {
        callback('', '');
    }
};
exports.setFileData = setFileData;
//# sourceMappingURL=data-utils.js.map