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
exports.ValidatedField = exports.ValidatedInput = exports.ValidatedForm = void 0;
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
var React = require("react");
var react_1 = require("react");
var react_hook_form_1 = require("react-hook-form");
var reactstrap_1 = require("reactstrap");
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
    var _b = react_hook_form_1.useForm({ mode: mode || 'onTouched', defaultValues: defaultValues }), handleSubmit = _b.handleSubmit, register = _b.register, reset = _b.reset, _c = _b.formState, errors = _c.errors, touchedFields = _c.touchedFields, dirtyFields = _c.dirtyFields;
    react_1.useEffect(function () {
        reset(defaultValues);
    }, [reset, defaultValues]);
    return (React.createElement(reactstrap_1.Form, __assign({ onSubmit: handleSubmit(onSubmit) }, rest), React.Children.map(children, function (child) {
        var _a;
        var isValidated = ((_a = child === null || child === void 0 ? void 0 : child.props) === null || _a === void 0 ? void 0 : _a.name) &&
            (['ValidatedField', 'ValidatedInput'].includes(child.type.displayName) ||
                ['ValidatedField', 'ValidatedInput'].includes(child.type.name));
        return isValidated
            ? React.createElement(child.type, __assign({}, __assign(__assign({}, child.props), { register: child.props.register || register, error: child.props.error || errors[child.props.name], isTouched: typeof child.props.isTouched !== 'undefined' ? touchedFields[child.props.name] : child.props.isTouched, isDirty: typeof child.props.isDirty !== 'undefined' ? dirtyFields[child.props.name] : child.props.isDirty, key: child.props.name })))
            : child;
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
    var children = _a.children, id = _a.id, disabled = _a.disabled, className = _a.className, check = _a.check, row = _a.row, col = _a.col, label = _a.label, labelClass = _a.labelClass, labelHidden = _a.labelHidden, inputClass = _a.inputClass, attributes = __rest(_a, ["children", "id", "disabled", "className", "check", "row", "col", "label", "labelClass", "labelHidden", "inputClass"]);
    var input = (React.createElement(ValidatedInput, __assign({ id: id, disabled: disabled, className: inputClass }, attributes), children));
    var inputRow = row ? React.createElement(reactstrap_1.Col, __assign({}, col), input) : input;
    return (React.createElement(reactstrap_1.FormGroup, { check: check, disabled: disabled, row: row, className: className },
        check && inputRow,
        label && (React.createElement(reactstrap_1.Label, { check: check, for: id, className: labelClass, hidden: labelHidden }, label)),
        !check && inputRow));
}
exports.ValidatedField = ValidatedField;
//# sourceMappingURL=validated-form.js.map