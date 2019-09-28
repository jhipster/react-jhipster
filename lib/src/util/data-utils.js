"use strict";
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
exports.openFile = function (contentType, data) { return function () {
    var fileURL = "data:" + contentType + ";base64," + data;
    var win = window.open();
    win.document.write('<iframe src="' +
        fileURL +
        '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
}; };
var toBase64 = function (file, cb) {
    var fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = function (e) {
        var base64Data = e.target['result'].substr(e.target['result'].indexOf('base64,') + 'base64,'.length);
        cb(base64Data);
    };
};
var paddingSize = function (value) {
    if (value.endsWith('==')) {
        return 2;
    }
    if (value.endsWith('=')) {
        return 1;
    }
    return 0;
};
var formatAsBytes = function (sizeValue) { return sizeValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' bytes'; };
exports.size = function (value) { return value.length / 4 * 3 - paddingSize(value); };
exports.byteSize = function (base64String) { return formatAsBytes(exports.size(base64String)); };
exports.setFileData = function (event, callback, isImage) {
    if (event && event.target.files && event.target.files[0]) {
        var file_1 = event.target.files[0];
        if (isImage && !file_1.type.startsWith('image/')) {
            return;
        }
        toBase64(file_1, function (base64Data) {
            callback(file_1.type, base64Data);
        });
    }
};
//# sourceMappingURL=data-utils.js.map