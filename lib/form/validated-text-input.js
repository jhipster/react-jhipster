"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatedTextInput = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const reactstrap_1 = require("reactstrap");
const language_1 = require("../language");
function ValidatedTextInput({ register, touchedFields, errors, setValue, name, validation, labelPlaceholderKey, inputPlaceholderKey, type = 'text', updateValueOverrideMethod, }) {
    var _a;
    const updateValueDefaultMethod = event => {
        setValue(name, event.target.value, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
    };
    const updateValue = updateValueOverrideMethod !== null && updateValueOverrideMethod !== void 0 ? updateValueOverrideMethod : updateValueDefaultMethod;
    const labelName = `${name}Label`;
    return (react_1.default.createElement(reactstrap_1.FormGroup, null,
        react_1.default.createElement(reactstrap_1.Label, { id: labelName, for: name }, (0, language_1.translate)(labelPlaceholderKey)),
        react_1.default.createElement(reactstrap_1.Input, Object.assign({ id: name, name: name, placeholder: (0, language_1.translate)(inputPlaceholderKey), type: type }, register(name, validation), { "data-cy": name, valid: touchedFields[name] && !errors[name], invalid: !touchedFields[name] || !!errors[name], onChange: updateValue })),
        react_1.default.createElement(reactstrap_1.FormFeedback, { hidden: !errors[name] }, (_a = errors[name]) === null || _a === void 0 ? void 0 : _a.message)));
}
exports.ValidatedTextInput = ValidatedTextInput;
//# sourceMappingURL=validated-text-input.js.map