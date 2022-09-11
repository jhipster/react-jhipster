"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatedTextInput = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const reactstrap_1 = require("reactstrap");
const language_1 = require("../language");
function ValidatedTextInput({ register, touchedFields, errors, setValue, nameIdCy, validate, labelPlaceholderKey, inputPlaceholderKey = '', type = 'text', readOnly = false, disabled = false, updateValueOverrideMethod, }) {
    var _a;
    const updateValueDefaultMethod = event => {
        setValue(nameIdCy, event.target.value, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
    };
    const updateValue = updateValueOverrideMethod !== null && updateValueOverrideMethod !== void 0 ? updateValueOverrideMethod : updateValueDefaultMethod;
    const placeHolderValue = inputPlaceholderKey ? (0, language_1.translate)(inputPlaceholderKey) : '';
    const labelName = `${nameIdCy}Label`;
    return (react_1.default.createElement(reactstrap_1.FormGroup, null,
        react_1.default.createElement(reactstrap_1.Label, { id: labelName, for: nameIdCy }, (0, language_1.translate)(labelPlaceholderKey)),
        react_1.default.createElement(reactstrap_1.Input, Object.assign({ id: nameIdCy, name: nameIdCy, placeholder: placeHolderValue, type: type, readOnly: readOnly, disabled: disabled }, register(nameIdCy, validate), { "data-cy": nameIdCy, valid: touchedFields[nameIdCy] && !errors[nameIdCy], invalid: !touchedFields[nameIdCy] || !!errors[nameIdCy], onChange: updateValue })),
        react_1.default.createElement(reactstrap_1.FormFeedback, { hidden: !errors[nameIdCy] }, (_a = errors[nameIdCy]) === null || _a === void 0 ? void 0 : _a.message)));
}
exports.ValidatedTextInput = ValidatedTextInput;
//# sourceMappingURL=validated-text-input.js.map