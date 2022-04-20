"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmail = exports.ValidatedBlobField = exports.ValidatedField = exports.ValidatedInput = exports.ValidatedForm = void 0;
const tslib_1 = require("tslib");
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const react_1 = tslib_1.__importDefault(require("react"));
const react_2 = require("react");
const react_hook_form_1 = require("react-hook-form");
const reactstrap_1 = require("reactstrap");
const util_1 = require("../util");
/**
 * A wrapper for simple validated forms using Reactstrap Form and React-hook-form.
 * The validated fields/inputs must be direct children of the form.
 * This components injects methods and values from react-hook-form's `useForm` hook into the ValidatedField/ValidatedInput components
 * For complex use cases or for nested children, use Reactstrap form elements
 * or ValidatedField or ValidatedInput and pass methods and values from react-hook-form's `useForm` hook
 * directly as props
 *
 * @param ValidatedFormProps
 * @returns JSX.Element
 */
function ValidatedForm(_a) {
    var { defaultValues, children, onSubmit, mode } = _a, rest = tslib_1.__rest(_a, ["defaultValues", "children", "onSubmit", "mode"]);
    const { handleSubmit, register, reset, setValue, formState: { errors, touchedFields, dirtyFields }, } = (0, react_hook_form_1.useForm)({ mode: mode || 'onTouched', defaultValues });
    (0, react_2.useEffect)(() => {
        reset(defaultValues);
    }, [reset, defaultValues]);
    return (react_1.default.createElement(reactstrap_1.Form, Object.assign({ onSubmit: handleSubmit(onSubmit) }, rest), react_1.default.Children.map(children, (child) => {
        var _a;
        const type = child === null || child === void 0 ? void 0 : child.type;
        const isValidated = type && ((_a = child === null || child === void 0 ? void 0 : child.props) === null || _a === void 0 ? void 0 : _a.name) && ['ValidatedField', 'ValidatedInput', 'ValidatedBlobField'].includes(type.displayName);
        if (isValidated) {
            const childName = child.props.name;
            const elem = Object.assign(Object.assign({}, child.props), { register: child.props.register || register, error: child.props.error || errors[childName], isTouched: typeof child.props.isTouched === 'undefined' ? touchedFields[childName] : child.props.isTouched, isDirty: typeof child.props.isDirty === 'undefined' ? dirtyFields[childName] : child.props.isDirty, key: childName });
            if (type.displayName === 'ValidatedBlobField') {
                const defaultValue = defaultValues[childName];
                const defaultContentType = defaultValues[`${childName}ContentType`];
                elem.setValue = typeof child.props.setValue === 'undefined' ? setValue : child.props.setValue;
                elem.defaultValue = typeof child.props.defaultValue === 'undefined' ? defaultValue : child.props.defaultValue;
                elem.defaultContentType =
                    typeof child.props.defaultContentType === 'undefined' ? defaultContentType : child.props.defaultContentType;
            }
            return react_1.default.createElement(type, Object.assign({}, elem));
        }
        return child;
    })));
}
exports.ValidatedForm = ValidatedForm;
ValidatedForm.displayName = 'ValidatedForm';
/**
 * A utility wrapper over Reactstrap Input component thats uses react-hook-form data to
 * show error message and error/validated styles.
 * This component can be used with ValidatedForm
 *
 * @param ValidatedInputProps
 * @returns JSX.Element
 */
function ValidatedInput(_a) {
    var { name, id = name, register, error, isTouched, isDirty, validate, children, className, onChange, onBlur } = _a, attributes = tslib_1.__rest(_a, ["name", "id", "register", "error", "isTouched", "isDirty", "validate", "children", "className", "onChange", "onBlur"]);
    if (!register) {
        return (react_1.default.createElement(reactstrap_1.Input, Object.assign({ name: name, id: id, className: className, onChange: onChange, onBlur: onBlur }, attributes), children));
    }
    className = className || '';
    className = isTouched ? `${className} is-touched` : className;
    className = isDirty ? `${className} is-dirty` : className;
    const { name: registeredName, onBlur: onBlurValidate, onChange: onChangeValidate, ref } = register(name, validate);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(reactstrap_1.Input, Object.assign({ name: registeredName, id: id, valid: isTouched && !error, invalid: !!error, innerRef: ref, className: className, onChange: e => {
                void onChangeValidate(e);
                onChange && onChange(e);
            }, onBlur: e => {
                void onBlurValidate(e);
                onBlur && onBlur(e);
            } }, attributes), children),
        error && react_1.default.createElement(reactstrap_1.FormFeedback, null, error.message)));
}
exports.ValidatedInput = ValidatedInput;
ValidatedInput.displayName = 'ValidatedInput';
/**
 * A utility wrapper over Reactstrap FormGroup + Label + ValidatedInput
 * that uses react-hook-form data to show error message and error/validated styles.
 * This component can be used with ValidatedForm
 *
 * @param ValidatedFieldProps
 * @returns JSX.Element
 */
function ValidatedField(_a) {
    var { children, name, id, disabled, className, check, row, col, tag, label, labelClass, labelHidden, inputClass, inputTag, hidden } = _a, attributes = tslib_1.__rest(_a, ["children", "name", "id", "disabled", "className", "check", "row", "col", "tag", "label", "labelClass", "labelHidden", "inputClass", "inputTag", "hidden"]);
    const input = (react_1.default.createElement(ValidatedInput, Object.assign({ name: name, id: id, disabled: disabled, className: inputClass, hidden: hidden, tag: inputTag }, attributes), children));
    const inputRow = row ? react_1.default.createElement(reactstrap_1.Col, Object.assign({}, col), input) : input;
    return (react_1.default.createElement(reactstrap_1.FormGroup, { check: check, disabled: disabled, row: row, className: className, hidden: hidden, tag: tag },
        check && inputRow,
        label && (react_1.default.createElement(reactstrap_1.Label, { id: `${name}Label`, check: check, for: id, className: labelClass, hidden: labelHidden || hidden }, label)),
        !check && inputRow));
}
exports.ValidatedField = ValidatedField;
ValidatedField.displayName = 'ValidatedField';
/**
 * A utility wrapper over Reactstrap FormGroup + Label + Input for blobs and images
 * that uses react-hook-form data to show error message and error/validated styles.
 * This component can be used with ValidatedForm
 *
 * @param ValidatedBlobFieldProps
 * @returns JSX.Element
 */
function ValidatedBlobField(_a) {
    var { name, register, setValue, error, isTouched, isDirty, validate, children, className, onChange, onBlur, id = name, disabled, row, col, tag, label, labelClass, labelHidden, inputClass, inputTag, hidden, defaultValue, defaultContentType, isImage, imageStyle, imageClassName, clearBtn, openActionLabel, 
    // will be ignored as type will always be `file`
    type, check } = _a, attributes = tslib_1.__rest(_a, ["name", "register", "setValue", "error", "isTouched", "isDirty", "validate", "children", "className", "onChange", "onBlur", "id", "disabled", "row", "col", "tag", "label", "labelClass", "labelHidden", "inputClass", "inputTag", "hidden", "defaultValue", "defaultContentType", "isImage", "imageStyle", "imageClassName", "clearBtn", "openActionLabel", "type", "check"]);
    const [blob, setBlobData] = (0, react_2.useState)(defaultValue);
    const [blobContentType, setBlobContentType] = (0, react_2.useState)(defaultContentType);
    const contentTypeName = `${name}ContentType`;
    const setBlobValue = (data, contentType) => {
        setBlobData(data);
        setBlobContentType(contentType);
        setValue(contentTypeName, contentType, {
            shouldValidate: true,
            shouldDirty: true,
        });
        setValue(name, data, {
            shouldValidate: true,
            shouldDirty: true,
        });
    };
    const clearBlob = () => {
        setBlobValue(null, null);
    };
    const renderFormGroup = inner => (react_1.default.createElement(reactstrap_1.FormGroup, { disabled: disabled, row: row, className: className, hidden: hidden, tag: tag },
        label && (react_1.default.createElement(reactstrap_1.Label, { id: `${name}Label`, for: id, className: labelClass, hidden: labelHidden || hidden }, label)),
        inner));
    const inputRow = input => (row ? react_1.default.createElement(reactstrap_1.Col, Object.assign({}, col), input) : input);
    if (!register) {
        return renderFormGroup(inputRow(react_1.default.createElement(reactstrap_1.Input, Object.assign({ type: "file", id: id, name: name, className: className, onChange: onChange, onBlur: onBlur }, attributes))));
    }
    className = className || '';
    className = isTouched ? `${className} is-touched` : className;
    className = isDirty ? `${className} is-dirty` : className;
    (0, react_2.useEffect)(() => {
        register(name, validate);
        register(contentTypeName, validate);
    }, [register]);
    const input = (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("input", { id: `file_${name}_content_type`, name: contentTypeName, type: "hidden" }),
        react_1.default.createElement(reactstrap_1.Input, Object.assign({ type: "file", id: id, name: name, valid: isTouched && !error, invalid: !!error, className: className, onChange: e => {
                (0, util_1.setFileData)(e, (contentType, data) => {
                    setBlobValue(data, contentType);
                }, isImage);
                onChange && onChange(e);
            }, onBlur: e => {
                (0, util_1.setFileData)(e, (contentType, data) => {
                    setBlobValue(data, contentType);
                }, isImage);
                onBlur && onBlur(e);
            } }, attributes)),
        error && react_1.default.createElement(reactstrap_1.FormFeedback, null, error.message)));
    const defaultClearBtn = (react_1.default.createElement(reactstrap_1.Button, { color: "danger", size: "sm", onClick: clearBlob },
        react_1.default.createElement("strong", null, "\u00A0x\u00A0")));
    return renderFormGroup(react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("br", null),
        blob ? (react_1.default.createElement("div", { className: "mb-3 mt-2 jhi-validated-blob-field-item-container" },
            blobContentType ? (react_1.default.createElement("a", { onClick: (0, util_1.openFile)(blobContentType, blob), className: "jhi-validated-blob-field-item-anchor" }, isImage ? (react_1.default.createElement("img", { src: `data:${blobContentType};base64,${blob}`, style: imageStyle || { maxHeight: '100px' }, className: imageClassName })) : (openActionLabel || 'Open'))) : null,
            react_1.default.createElement("br", null),
            react_1.default.createElement(reactstrap_1.Row, { className: "jhi-validated-blob-field-item-row" },
                react_1.default.createElement(reactstrap_1.Col, { md: "11", className: "jhi-validated-blob-field-item-row-col" },
                    react_1.default.createElement("span", null,
                        blobContentType,
                        ", ",
                        (0, util_1.byteSize)(blob))),
                react_1.default.createElement(reactstrap_1.Col, { md: "1", className: "jhi-validated-blob-field-item-row-col jhi-validated-blob-field-item-clear-btn" }, clearBtn ? clearBtn(clearBlob) : defaultClearBtn)))) : null,
        inputRow(input)));
}
exports.ValidatedBlobField = ValidatedBlobField;
ValidatedBlobField.displayName = 'ValidatedBlobField';
const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
function isEmail(value) {
    if ((0, util_1.isEmpty)(value))
        return true;
    return EMAIL_REGEXP.test(value);
}
exports.isEmail = isEmail;
//# sourceMappingURL=validated-form.js.map