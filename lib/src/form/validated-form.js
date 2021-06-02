"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmail = exports.ValidatedBlobField = exports.ValidatedField = exports.ValidatedInput = exports.ValidatedForm = void 0;
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
var React = require("react");
var react_1 = require("react");
var react_hook_form_1 = require("react-hook-form");
var reactstrap_1 = require("reactstrap");
var util_1 = require("../util");
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
    var defaultValues = _a.defaultValues, children = _a.children, onSubmit = _a.onSubmit, mode = _a.mode, rest = __rest(_a, ["defaultValues", "children", "onSubmit", "mode"]);
    var _b = react_hook_form_1.useForm({ mode: mode || 'onTouched', defaultValues: defaultValues }), handleSubmit = _b.handleSubmit, register = _b.register, reset = _b.reset, setValue = _b.setValue, _c = _b.formState, errors = _c.errors, touchedFields = _c.touchedFields, dirtyFields = _c.dirtyFields;
    react_1.useEffect(function () {
        reset(defaultValues);
    }, [reset, defaultValues]);
    return (React.createElement(reactstrap_1.Form, __assign({ onSubmit: handleSubmit(onSubmit) }, rest), React.Children.map(children, function (child) {
        var _a;
        var type = child === null || child === void 0 ? void 0 : child.type;
        var isValidated = type &&
            ((_a = child === null || child === void 0 ? void 0 : child.props) === null || _a === void 0 ? void 0 : _a.name) &&
            (['ValidatedField', 'ValidatedInput', 'ValidatedBlobField'].includes(type.name) ||
                ['ValidatedField', 'ValidatedInput', 'ValidatedBlobField'].includes(type.displayName));
        if (isValidated) {
            var childName = child.props.name;
            var elem = __assign(__assign({}, child.props), { register: child.props.register || register, error: child.props.error || errors[childName], isTouched: typeof child.props.isTouched === 'undefined' ? touchedFields[childName] : child.props.isTouched, isDirty: typeof child.props.isDirty === 'undefined' ? dirtyFields[childName] : child.props.isDirty, key: childName });
            if (type.name === 'ValidatedBlobField' || type.displayName === 'ValidatedBlobField') {
                var defaultValue = defaultValues[childName];
                var defaultContentType = defaultValues[childName + "ContentType"];
                elem.setValue = typeof child.props.setValue === 'undefined' ? setValue : child.props.setValue;
                elem.defaultValue = typeof child.props.defaultValue === 'undefined' ? defaultValue : child.props.defaultValue;
                elem.defaultContentType =
                    typeof child.props.defaultContentType === 'undefined' ? defaultContentType : child.props.defaultContentType;
            }
            return React.createElement(type, __assign({}, elem));
        }
        return child;
    })));
}
exports.ValidatedForm = ValidatedForm;
/**
 * A utility wrapper over Reactstrap Input component thats uses react-hook-form data to
 * show error message and error/validated styles.
 * This component can be used with ValidatedForm
 *
 * @param ValidatedInputProps
 * @returns JSX.Element
 */
function ValidatedInput(_a) {
    var name = _a.name, register = _a.register, error = _a.error, isTouched = _a.isTouched, isDirty = _a.isDirty, validate = _a.validate, children = _a.children, className = _a.className, onChange = _a.onChange, onBlur = _a.onBlur, attributes = __rest(_a, ["name", "register", "error", "isTouched", "isDirty", "validate", "children", "className", "onChange", "onBlur"]);
    if (!register) {
        return (React.createElement(reactstrap_1.Input, __assign({ name: name, className: className, onChange: onChange, onBlur: onBlur }, attributes), children));
    }
    className = className || '';
    className = isTouched ? className + " is-touched" : className;
    className = isDirty ? className + " is-dirty" : className;
    var _b = register(name, validate), registeredName = _b.name, onBlurValidate = _b.onBlur, onChangeValidate = _b.onChange, ref = _b.ref;
    return (React.createElement(React.Fragment, null,
        React.createElement(reactstrap_1.Input, __assign({ name: registeredName, valid: isTouched && !error, invalid: !!error, innerRef: ref, className: className, onChange: function (e) {
                void onChangeValidate(e);
                onChange && onChange(e);
            }, onBlur: function (e) {
                void onBlurValidate(e);
                onBlur && onBlur(e);
            } }, attributes), children),
        error && React.createElement(reactstrap_1.FormFeedback, null, error.message)));
}
exports.ValidatedInput = ValidatedInput;
/**
 * A utility wrapper over Reactstrap FormGroup + Label + ValidatedInput
 * that uses react-hook-form data to show error message and error/validated styles.
 * This component can be used with ValidatedForm
 *
 * @param ValidatedFieldProps
 * @returns JSX.Element
 */
function ValidatedField(_a) {
    var children = _a.children, name = _a.name, id = _a.id, disabled = _a.disabled, className = _a.className, check = _a.check, row = _a.row, col = _a.col, tag = _a.tag, label = _a.label, labelClass = _a.labelClass, labelHidden = _a.labelHidden, inputClass = _a.inputClass, inputTag = _a.inputTag, hidden = _a.hidden, attributes = __rest(_a, ["children", "name", "id", "disabled", "className", "check", "row", "col", "tag", "label", "labelClass", "labelHidden", "inputClass", "inputTag", "hidden"]);
    var input = (React.createElement(ValidatedInput, __assign({ name: name, id: id, disabled: disabled, className: inputClass, hidden: hidden, tag: inputTag }, attributes), children));
    var inputRow = row ? React.createElement(reactstrap_1.Col, __assign({}, col), input) : input;
    return (React.createElement(reactstrap_1.FormGroup, { check: check, disabled: disabled, row: row, className: className, hidden: hidden, tag: tag },
        check && inputRow,
        label && (React.createElement(reactstrap_1.Label, { id: name + "Label", check: check, for: id, className: labelClass, hidden: labelHidden || hidden }, label)),
        !check && inputRow));
}
exports.ValidatedField = ValidatedField;
/**
 * A utility wrapper over Reactstrap FormGroup + Label + CustomInput for blobs and images
 * that uses react-hook-form data to show error message and error/validated styles.
 * This component can be used with ValidatedForm
 *
 * @param ValidatedBlobFieldProps
 * @returns JSX.Element
 */
function ValidatedBlobField(_a) {
    var name = _a.name, register = _a.register, setValue = _a.setValue, error = _a.error, isTouched = _a.isTouched, isDirty = _a.isDirty, validate = _a.validate, children = _a.children, className = _a.className, onChange = _a.onChange, onBlur = _a.onBlur, id = _a.id, disabled = _a.disabled, row = _a.row, col = _a.col, tag = _a.tag, label = _a.label, labelClass = _a.labelClass, labelHidden = _a.labelHidden, inputClass = _a.inputClass, inputTag = _a.inputTag, hidden = _a.hidden, defaultValue = _a.defaultValue, defaultContentType = _a.defaultContentType, isImage = _a.isImage, imageStyle = _a.imageStyle, imageClassName = _a.imageClassName, clearBtn = _a.clearBtn, openActionLabel = _a.openActionLabel, 
    // will be ignored as type will always be `file`
    type = _a.type, check = _a.check, attributes = __rest(_a, ["name", "register", "setValue", "error", "isTouched", "isDirty", "validate", "children", "className", "onChange", "onBlur", "id", "disabled", "row", "col", "tag", "label", "labelClass", "labelHidden", "inputClass", "inputTag", "hidden", "defaultValue", "defaultContentType", "isImage", "imageStyle", "imageClassName", "clearBtn", "openActionLabel", "type", "check"]);
    var _b = react_1.useState(defaultValue), blob = _b[0], setBlobData = _b[1];
    var _c = react_1.useState(defaultContentType), blobContentType = _c[0], setBlobContentType = _c[1];
    var contentTypeName = name + "ContentType";
    var setBlobValue = function (data, contentType) {
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
    var clearBlob = function () {
        setBlobValue(null, null);
    };
    var renderFormGroup = function (inner) { return (React.createElement(reactstrap_1.FormGroup, { disabled: disabled, row: row, className: className, hidden: hidden, tag: tag },
        label && (React.createElement(reactstrap_1.Label, { id: name + "Label", for: id, className: labelClass, hidden: labelHidden || hidden }, label)),
        inner)); };
    var inputRow = function (input) { return (row ? React.createElement(reactstrap_1.Col, __assign({}, col), input) : input); };
    if (!register) {
        return renderFormGroup(inputRow(React.createElement(reactstrap_1.CustomInput, __assign({ type: "file", id: id || "file_" + name, name: name, className: className, onChange: onChange, onBlur: onBlur }, attributes))));
    }
    className = className || '';
    className = isTouched ? className + " is-touched" : className;
    className = isDirty ? className + " is-dirty" : className;
    react_1.useEffect(function () {
        register(name, validate);
        register(contentTypeName, validate);
    }, [register]);
    var input = (React.createElement(React.Fragment, null,
        React.createElement("input", { id: "file_" + name + "_content_type", name: contentTypeName, type: "hidden" }),
        React.createElement(reactstrap_1.CustomInput, __assign({ type: "file", id: id || "file_" + name, name: name, valid: isTouched && !error, invalid: !!error, className: className, onChange: function (e) {
                util_1.setFileData(e, function (contentType, data) {
                    setBlobValue(data, contentType);
                }, isImage);
                onChange && onChange(e);
            }, onBlur: function (e) {
                util_1.setFileData(e, function (contentType, data) {
                    setBlobValue(data, contentType);
                }, isImage);
                onBlur && onBlur(e);
            } }, attributes)),
        error && React.createElement(reactstrap_1.FormFeedback, null, error.message)));
    var defaultClearBtn = (React.createElement(reactstrap_1.Button, { color: "danger", size: "sm", onClick: clearBlob },
        React.createElement("strong", null, "\u00A0x\u00A0")));
    return renderFormGroup(React.createElement(React.Fragment, null,
        React.createElement("br", null),
        blob ? (React.createElement("div", { className: "mb-3 mt-2 jhi-validated-blob-field-item-container" },
            blobContentType ? (React.createElement("a", { onClick: util_1.openFile(blobContentType, blob), className: "jhi-validated-blob-field-item-anchor" }, isImage ? (React.createElement("img", { src: "data:" + blobContentType + ";base64," + blob, style: imageStyle || { maxHeight: '100px' }, className: imageClassName })) : (openActionLabel || 'Open'))) : null,
            React.createElement("br", null),
            React.createElement(reactstrap_1.Row, { className: "jhi-validated-blob-field-item-row" },
                React.createElement(reactstrap_1.Col, { md: "11", className: "jhi-validated-blob-field-item-row-col" },
                    React.createElement("span", null,
                        blobContentType,
                        ", ",
                        util_1.byteSize(blob))),
                React.createElement(reactstrap_1.Col, { md: "1", className: "jhi-validated-blob-field-item-row-col jhi-validated-blob-field-item-clear-btn" }, clearBtn ? clearBtn(clearBlob) : defaultClearBtn)))) : null,
        inputRow(input)));
}
exports.ValidatedBlobField = ValidatedBlobField;
var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
function isEmail(value) {
    if (util_1.isEmpty(value))
        return true;
    return EMAIL_REGEXP.test(value);
}
exports.isEmail = isEmail;
//# sourceMappingURL=validated-form.js.map