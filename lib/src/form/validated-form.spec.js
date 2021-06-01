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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
/**
 * @jest-environment jsdom
 */
var React = require("react");
var react_1 = require("@testing-library/react");
var react_hook_form_1 = require("react-hook-form");
var index_1 = require("./index");
describe.only('ValidatedInput', function () {
    describe('with basic text input', function () {
        it('without default value renders an empty input', function () {
            var container = react_1.render(React.createElement(index_1.ValidatedInput, { name: "test-1" })).container;
            var input = container.querySelector('input');
            expect(input.name).toEqual('test-1');
            expect(input.type).toEqual('text');
            expect(input.className).toEqual('form-control');
            expect(input.value).toEqual('');
        });
        it('with default value renders an input with value', function () {
            var container = react_1.render(React.createElement(index_1.ValidatedInput, { name: "test-1", defaultValue: "hello", isTouched: true })).container;
            var input = container.querySelector('input');
            expect(input.name).toEqual('test-1');
            expect(input.type).toEqual('text');
            expect(input.className).toEqual('form-control');
            expect(input.value).toEqual('hello');
        });
    });
    describe('with register renders', function () {
        function InputApp(_a) {
            var name = _a.name, rest = __rest(_a, ["name"]);
            var onSubmit = function (data) {
                // do nothing
            };
            var _b = react_hook_form_1.useForm(), register = _b.register, handleSubmit = _b.handleSubmit, errors = _b.formState.errors;
            return (React.createElement("form", { onSubmit: handleSubmit(onSubmit) },
                React.createElement(index_1.ValidatedInput, __assign({ register: register, name: name, error: errors[name], role: "textbox" }, rest)),
                React.createElement("button", { type: "submit" }, "SUBMIT")));
        }
        it('without default value renders an empty input', function () {
            var container = react_1.render(React.createElement(InputApp, { name: "test", defaultValue: "" })).container;
            var input = container.querySelector('input');
            expect(input.name).toEqual('test');
            expect(input.type).toEqual('text');
            expect(input.className).toEqual('form-control');
            expect(input.value).toEqual('');
        });
        it('with default value renders an input', function () {
            var container = react_1.render(React.createElement(InputApp, { name: "test", defaultValue: "hello", isTouched: true })).container;
            var input = container.querySelector('input');
            expect(input.name).toEqual('test');
            expect(input.type).toEqual('text');
            expect(input.className).toEqual(' is-touched is-valid form-control');
            expect(input.value).toEqual('hello');
        });
        it('with default value renders an input and shows error when value is absent', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockChange;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockChange = jest.fn(function (e) {
                            // do nothing
                        });
                        return [4 /*yield*/, react_1.act(function () { return __awaiter(void 0, void 0, void 0, function () {
                                var container, input;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            container = react_1.render(React.createElement(InputApp, { name: "test", defaultValue: "hello", validate: { required: 'this is required' }, onChange: mockChange })).container;
                                            input = container.querySelector('input');
                                            expect(input.name).toEqual('test');
                                            expect(input.type).toEqual('text');
                                            expect(input.className).toEqual('form-control');
                                            expect(input.value).toEqual('hello');
                                            react_1.fireEvent.input(react_1.screen.getByRole('textbox'), {
                                                target: {
                                                    value: '',
                                                },
                                            });
                                            expect(mockChange).toBeCalled();
                                            react_1.fireEvent.submit(react_1.screen.getByRole('button'));
                                            return [4 /*yield*/, react_1.waitFor(function () { return expect(react_1.screen.getByText('this is required')).not.toBeNull(); })];
                                        case 1:
                                            _a.sent();
                                            input = container.querySelector('input');
                                            expect(input.className).toEqual('is-invalid form-control');
                                            expect(input.value).toEqual('');
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
describe.only('ValidatedField', function () {
    describe('with basic text input', function () {
        it('without default value & label renders an empty input', function () {
            var container = react_1.render(React.createElement(index_1.ValidatedField, { name: "test-1" })).container;
            var fg = container.querySelector('div.form-group');
            expect(fg).not.toBeNull();
            var input = container.querySelector('input');
            expect(input.name).toEqual('test-1');
            expect(input.type).toEqual('text');
            expect(input.className).toEqual('form-control');
            expect(input.value).toEqual('');
        });
        it('with label renders an input with label', function () {
            var container = react_1.render(React.createElement(index_1.ValidatedField, { name: "test-1", defaultValue: "hello", isTouched: true, label: "Label" })).container;
            var col = container.querySelector('div.col');
            expect(col).toBeNull();
            var fg = container.querySelector('div.form-group');
            expect(fg).not.toBeNull();
            var input = container.querySelector('input');
            expect(input.name).toEqual('test-1');
            expect(input.type).toEqual('text');
            expect(input.className).toEqual('form-control');
            expect(input.value).toEqual('hello');
            var lb = container.querySelector('label');
            expect(lb).not.toBeNull();
            expect(react_1.screen.getByText('Label')).not.toBeNull();
        });
        it('with row renders an input in a column', function () {
            var container = react_1.render(React.createElement(index_1.ValidatedField, { name: "test-1", defaultValue: "hello", isTouched: true, label: "Label", row: true })).container;
            var col = container.querySelector('div.col');
            expect(col).not.toBeNull();
            var fg = container.querySelector('div.form-group');
            expect(fg).not.toBeNull();
            var input = container.querySelector('input');
            expect(input.name).toEqual('test-1');
            expect(input.type).toEqual('text');
            expect(input.className).toEqual('form-control');
            expect(input.value).toEqual('hello');
            var lb = container.querySelector('label');
            expect(lb).not.toBeNull();
            expect(react_1.screen.getByText('Label')).not.toBeNull();
        });
        it('with check renders an input before label', function () {
            var container = react_1.render(React.createElement(index_1.ValidatedField, { name: "test-1", label: "Label", check: true })).container;
            var fg = container.querySelector('div.form-check');
            expect(fg).not.toBeNull();
            expect(fg.innerHTML).toEqual('<input name="test-1" type="text" class="form-control"><label class="form-check-label">Label</label>');
        });
    });
    describe('with register renders', function () {
        function InputApp(_a) {
            var name = _a.name, rest = __rest(_a, ["name"]);
            var onSubmit = function (data) {
                // do nothing
            };
            var _b = react_hook_form_1.useForm(), register = _b.register, handleSubmit = _b.handleSubmit, errors = _b.formState.errors;
            return (React.createElement("form", { onSubmit: handleSubmit(onSubmit) },
                React.createElement(index_1.ValidatedField, __assign({ register: register, name: name, error: errors[name], role: "textbox" }, rest)),
                React.createElement("button", { type: "submit" }, "SUBMIT")));
        }
        it('without default value renders an empty input', function () {
            var container = react_1.render(React.createElement(InputApp, { name: "test", defaultValue: "" })).container;
            var input = container.querySelector('input');
            expect(input.name).toEqual('test');
            expect(input.type).toEqual('text');
            expect(input.className).toEqual('form-control');
            expect(input.value).toEqual('');
        });
        it('with default value renders an input', function () {
            var container = react_1.render(React.createElement(InputApp, { name: "test", defaultValue: "hello", isTouched: true })).container;
            var input = container.querySelector('input');
            expect(input.name).toEqual('test');
            expect(input.type).toEqual('text');
            expect(input.className).toEqual(' is-touched is-valid form-control');
            expect(input.value).toEqual('hello');
        });
        it('with default value renders an input and shows error when value is absent', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockChange;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockChange = jest.fn(function (e) {
                            // do nothing
                        });
                        return [4 /*yield*/, react_1.act(function () { return __awaiter(void 0, void 0, void 0, function () {
                                var container, input;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            container = react_1.render(React.createElement(InputApp, { name: "test", defaultValue: "hello", validate: { required: 'this is required' }, onChange: mockChange })).container;
                                            input = container.querySelector('input');
                                            expect(input.name).toEqual('test');
                                            expect(input.type).toEqual('text');
                                            expect(input.className).toEqual('form-control');
                                            expect(input.value).toEqual('hello');
                                            react_1.fireEvent.input(react_1.screen.getByRole('textbox'), {
                                                target: {
                                                    value: '',
                                                },
                                            });
                                            expect(mockChange).toBeCalled();
                                            react_1.fireEvent.submit(react_1.screen.getByRole('button'));
                                            return [4 /*yield*/, react_1.waitFor(function () { return expect(react_1.screen.getByText('this is required')).not.toBeNull(); })];
                                        case 1:
                                            _a.sent();
                                            input = container.querySelector('input');
                                            expect(input.className).toEqual('is-invalid form-control');
                                            expect(input.value).toEqual('');
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
describe.only('ValidatedForm', function () {
    describe('with non-input children', function () {
        it('renders them as single element', function () {
            var container = react_1.render(React.createElement(index_1.ValidatedForm, { onSubmit: function () { }, className: "myform" },
                React.createElement("div", null, "a div"))).container;
            var form = container.querySelector('form.myform');
            expect(form).not.toBeNull();
            expect(react_1.screen.getByText('a div')).not.toBeNull();
        });
        it('renders them as array of elements', function () {
            var container = react_1.render(React.createElement(index_1.ValidatedForm, { onSubmit: function () { }, className: "myform" },
                React.createElement("div", null, "a div"),
                React.createElement("button", null, "a button"),
                React.createElement("div", null,
                    React.createElement("span", null,
                        React.createElement("button", null, "nested button"))))).container;
            var form = container.querySelector('form.myform');
            expect(form).not.toBeNull();
            expect(react_1.screen.getByText('a div')).not.toBeNull();
            expect(react_1.screen.getByText('a button')).not.toBeNull();
            expect(react_1.screen.getByText('nested button')).not.toBeNull();
        });
    });
    describe('with validated input & field children', function () {
        it('should override register, error, isTouched & isDirty', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, container, findByText, form, input, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = react_1.render(React.createElement(index_1.ValidatedForm, { onSubmit: function () { }, className: "myform" },
                            React.createElement(index_1.ValidatedInput, { name: "test-12", error: { type: 'required', message: 'Your email is required.' }, isTouched: true, isDirty: true }))), container = _a.container, findByText = _a.findByText;
                        form = container.querySelector('form.myform');
                        expect(form).not.toBeNull();
                        input = container.querySelector('input[name="test-12"]');
                        expect(input.name).toEqual('test-12');
                        expect(input.type).toEqual('text');
                        expect(input.className).toEqual('is-invalid form-control');
                        expect(input.value).toEqual('');
                        _b = expect;
                        return [4 /*yield*/, findByText('Your email is required.')];
                    case 1:
                        _b.apply(void 0, [_c.sent()]).not.toBeNull();
                        return [2 /*return*/];
                }
            });
        }); });
        describe('renders them with default values passed inline', function () {
            it('for text field', function () {
                var container = react_1.render(React.createElement(index_1.ValidatedForm, { onSubmit: function () { }, className: "myform" },
                    React.createElement(index_1.ValidatedInput, { name: "test-1", defaultValue: "hello" }))).container;
                var input = container.querySelector('input[name="test-1"]');
                expect(input.name).toEqual('test-1');
                expect(input.type).toEqual('text');
                expect(input.className).toEqual('form-control');
                expect(input.value).toEqual('hello');
            });
            it('for password field', function () {
                var container = react_1.render(React.createElement(index_1.ValidatedForm, { onSubmit: function () { }, className: "myform" },
                    React.createElement(index_1.ValidatedField, { name: "test-2", type: "password", label: "password", defaultValue: "1231" }))).container;
                var input2 = container.querySelector('input[name="test-2"]');
                expect(input2.name).toEqual('test-2');
                expect(input2.type).toEqual('password');
                expect(input2.className).toEqual('form-control');
                expect(input2.value).toEqual('1231');
            });
            it('for checkbox field', function () {
                var container = react_1.render(React.createElement(index_1.ValidatedForm, { onSubmit: function () { }, className: "myform" },
                    React.createElement(index_1.ValidatedField, { name: "test-3", type: "checkbox", value: true, check: true, label: "check label" }))).container;
                var input3 = container.querySelector('input[name="test-3"]');
                expect(input3.name).toEqual('test-3');
                expect(input3.type).toEqual('checkbox');
                expect(input3.className).toEqual('form-check-input');
                expect(input3.value).toEqual('true');
            });
            it('for radio field', function () {
                var container = react_1.render(React.createElement(index_1.ValidatedForm, { onSubmit: function () { }, className: "myform" },
                    React.createElement(index_1.ValidatedField, { name: "test-4", type: "radio", value: "on", label: "radio label" }))).container;
                var input4 = container.querySelector('input[name="test-4"]');
                expect(input4.name).toEqual('test-4');
                expect(input4.type).toEqual('radio');
                expect(input4.className).toEqual('form-check-input');
                expect(input4.value).toEqual('on');
            });
            it('for select field', function () {
                var container = react_1.render(React.createElement(index_1.ValidatedForm, { onSubmit: function () { }, className: "myform" },
                    React.createElement(index_1.ValidatedInput, { name: "test-5", type: "select", label: "select label", defaultValue: "value 1" },
                        React.createElement("option", null, "value 1"),
                        React.createElement("option", null, "value 2")),
                    React.createElement(index_1.ValidatedField, { name: "test-6", type: "select", multiple: true, label: "select label", defaultValue: ['value 1', 'value 3'] },
                        React.createElement("option", null, "value 1"),
                        React.createElement("option", null, "value 2"),
                        React.createElement("option", null, "value 3")))).container;
                var input5 = container.querySelector('select[name="test-5"]');
                expect(input5.name).toEqual('test-5');
                expect(input5.className).toEqual('form-control');
                expect(input5.value).toEqual('value 1');
                var input6 = container.querySelector('select[name="test-6"]');
                expect(input6.name).toEqual('test-6');
                expect(input6.multiple).toEqual(true);
                expect(input6.className).toEqual('form-control');
                expect(input6.selectedOptions[0].value).toEqual('value 1');
                expect(input6.selectedOptions[1].value).toEqual('value 3');
            });
        });
        describe('renders them with default values passed via form', function () {
            it('for text field', function () {
                var container = react_1.render(React.createElement(index_1.ValidatedForm, { onSubmit: function () { }, className: "myform", defaultValues: {
                        test1: 'test1',
                        test2: 'test2',
                    } },
                    React.createElement(index_1.ValidatedField, { name: "test1" }),
                    React.createElement(index_1.ValidatedField, { name: "test2", type: "password", label: "password" }))).container;
                var input = container.querySelector('input[name="test1"]');
                expect(input.name).toEqual('test1');
                expect(input.type).toEqual('text');
                expect(input.className).toEqual('form-control');
                expect(input.value).toEqual('test1');
                var input2 = container.querySelector('input[name="test2"]');
                expect(input2.name).toEqual('test2');
                expect(input2.type).toEqual('password');
                expect(input2.className).toEqual('form-control');
                expect(input2.value).toEqual('test2');
            });
            it('for checkbox/radio field should retain value inline', function () {
                var container = react_1.render(React.createElement(index_1.ValidatedForm, { onSubmit: function () { }, className: "myform", defaultValues: {
                        test3: 'false',
                        test4: 'on',
                    } },
                    React.createElement(index_1.ValidatedField, { name: "test3", type: "checkbox", value: true, check: true, label: "check label" }),
                    React.createElement(index_1.ValidatedField, { name: "test4", type: "radio", value: "on", label: "radio label" }))).container;
                // should retain the value
                var input3 = container.querySelector('input[name="test3"]');
                expect(input3.name).toEqual('test3');
                expect(input3.type).toEqual('checkbox');
                expect(input3.className).toEqual('form-check-input');
                expect(input3.value).toEqual('true');
                expect(input3.checked).toEqual(true);
                // should retain the value
                var input4 = container.querySelector('input[name="test4"]');
                expect(input4.name).toEqual('test4');
                expect(input4.type).toEqual('radio');
                expect(input4.className).toEqual('form-check-input');
                expect(input4.value).toEqual('on');
                expect(input4.checked).toEqual(true);
            });
            it('for select field', function () {
                var container = react_1.render(React.createElement(index_1.ValidatedForm, { onSubmit: function () { }, className: "myform", defaultValues: {
                        test5: 'value 1',
                        test6: ['value 1', 'value 3'],
                    } },
                    React.createElement(index_1.ValidatedInput, { name: "test5", type: "select", label: "select label" },
                        React.createElement("option", null, "value 1"),
                        React.createElement("option", null, "value 2")),
                    React.createElement(index_1.ValidatedField, { name: "test6", type: "select", multiple: true, label: "select label" },
                        React.createElement("option", null, "value 1"),
                        React.createElement("option", null, "value 2"),
                        React.createElement("option", null, "value 3")))).container;
                var input5 = container.querySelector('select[name="test5"]');
                expect(input5.name).toEqual('test5');
                expect(input5.className).toEqual('form-control');
                expect(input5.selectedOptions[0].value).toEqual('value 1');
                expect(input5.value).toEqual('value 1');
                var input6 = container.querySelector('select[name="test6"]');
                expect(input6.name).toEqual('test6');
                expect(input6.multiple).toEqual(true);
                expect(input6.className).toEqual('form-control');
                expect(input6.selectedOptions[0].value).toEqual('value 1');
                expect(input6.selectedOptions[1].value).toEqual('value 3');
            });
        });
        describe('validate the form with no default values', function () {
            var mockSubmit = jest.fn(function (email, password, active, select, multiselect) {
                // do nothing
            });
            var onSubmit = function (_a) {
                var email = _a.email, password = _a.password, active = _a.active, select = _a.select, multiselect = _a.multiselect;
                mockSubmit(email, password, active, select, multiselect);
            };
            beforeEach(function () {
                react_1.render(React.createElement(index_1.ValidatedForm, { onSubmit: onSubmit, className: "myform" },
                    React.createElement(index_1.ValidatedField, { name: "email", label: "email", id: "email", validate: {
                            required: 'Your email is required.',
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: 'Entered value does not match email format',
                            },
                        } }),
                    React.createElement(index_1.ValidatedField, { name: "password", type: "password", label: "password", id: "password", validate: {
                            required: 'Your password is required.',
                            minLength: {
                                value: 5,
                                message: 'min length is 5',
                            },
                        } }),
                    React.createElement(index_1.ValidatedField, { name: "active", type: "checkbox", value: true, label: "active", check: true, id: "active" }),
                    React.createElement(index_1.ValidatedField, { name: "select", type: "select", label: "select", id: "select", validate: {
                            required: 'Your select is required.',
                        } },
                        React.createElement("option", null, "v1"),
                        React.createElement("option", null, "v2")),
                    React.createElement(index_1.ValidatedField, { name: "multiselect", type: "select", multiple: true, label: "multiselect", id: "multiselect", defaultValue: ['v2'], validate: {
                            required: 'Your multiselect is required.',
                        } },
                        React.createElement("option", null, "v1"),
                        React.createElement("option", null, "v2"),
                        React.createElement("option", null, "v3")),
                    React.createElement("button", { type: "submit" }, "SUBMIT")));
            });
            it('should display required error when value is invalid', function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            react_1.fireEvent.submit(react_1.screen.getByRole('button'));
                            _a = expect;
                            return [4 /*yield*/, react_1.screen.findByText('Your email is required.')];
                        case 1:
                            _a.apply(void 0, [_c.sent()]).not.toBeNull();
                            _b = expect;
                            return [4 /*yield*/, react_1.screen.findByText('Your password is required.')];
                        case 2:
                            _b.apply(void 0, [_c.sent()]).not.toBeNull();
                            expect(mockSubmit).not.toBeCalled();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should display matching error when email is invalid', function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, email, password;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            react_1.fireEvent.input(react_1.screen.getByLabelText('email'), {
                                target: {
                                    value: 'test',
                                },
                            });
                            react_1.fireEvent.input(react_1.screen.getByLabelText('password'), {
                                target: {
                                    value: 'password',
                                },
                            });
                            react_1.fireEvent.submit(react_1.screen.getByRole('button'));
                            _a = expect;
                            return [4 /*yield*/, react_1.screen.findByText('Entered value does not match email format')];
                        case 1:
                            _a.apply(void 0, [_b.sent()]).not.toBeNull();
                            expect(mockSubmit).not.toBeCalled();
                            email = react_1.screen.getByLabelText('email');
                            expect(email.value).toBe('test');
                            password = react_1.screen.getByLabelText('password');
                            expect(password.value).toBe('password');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should display min length error when password is invalid', function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, email, password;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            react_1.fireEvent.input(react_1.screen.getByLabelText('email'), {
                                target: {
                                    value: 'test@mail.com',
                                },
                            });
                            react_1.fireEvent.input(react_1.screen.getByLabelText('password'), {
                                target: {
                                    value: 'pass',
                                },
                            });
                            react_1.fireEvent.submit(react_1.screen.getByRole('button'));
                            _a = expect;
                            return [4 /*yield*/, react_1.screen.findByText('min length is 5')];
                        case 1:
                            _a.apply(void 0, [_b.sent()]).not.toBeNull();
                            expect(mockSubmit).not.toBeCalled();
                            email = react_1.screen.getByLabelText('email');
                            expect(email.value).toBe('test@mail.com');
                            password = react_1.screen.getByLabelText('password');
                            expect(password.value).toBe('pass');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should not display error when value is valid', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            react_1.fireEvent.input(react_1.screen.getByLabelText('email'), {
                                target: {
                                    value: 'test@mail.com',
                                },
                            });
                            react_1.fireEvent.input(react_1.screen.getByLabelText('password'), {
                                target: {
                                    value: 'password',
                                },
                            });
                            react_1.fireEvent.submit(react_1.screen.getByRole('button'));
                            // await for first one
                            return [4 /*yield*/, react_1.waitFor(function () { return expect(react_1.screen.queryByText('Your email is required.')).toBeNull(); })];
                        case 1:
                            // await for first one
                            _a.sent();
                            expect(react_1.screen.queryByText('Your email is required.')).toBeNull();
                            expect(react_1.screen.queryByText('Your password is required.')).toBeNull();
                            expect(react_1.screen.queryByText('Entered value does not match email format')).toBeNull();
                            expect(react_1.screen.queryByText('min length is 5')).toBeNull();
                            expect(react_1.screen.queryByText('Your select is required.')).toBeNull();
                            expect(react_1.screen.queryByText('Your multiselect is required.')).toBeNull();
                            expect(mockSubmit).toBeCalledWith('test@mail.com', 'password', false, 'v1', ['v2']);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('validate the form with default values', function () {
            var mockSubmit = jest.fn(function (email, password, active, select, multiselect) {
                // do nothing
            });
            var onSubmit = function (_a) {
                var email = _a.email, password = _a.password, active = _a.active, select = _a.select, multiselect = _a.multiselect;
                mockSubmit(email, password, active, select, multiselect);
            };
            beforeEach(function () {
                react_1.render(React.createElement(index_1.ValidatedForm, { onSubmit: onSubmit, className: "myform", defaultValues: {
                        email: 'test@test.com',
                        password: 'password',
                        active: true,
                        select: 'v1',
                        multiselect: ['v1', 'v3'],
                    } },
                    React.createElement(index_1.ValidatedField, { name: "email", label: "email", id: "email", validate: {
                            required: 'Your email is required.',
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: 'Entered value does not match email format',
                            },
                        } }),
                    React.createElement(index_1.ValidatedField, { name: "password", type: "password", label: "password", id: "password", validate: {
                            required: 'Your password is required.',
                            minLength: {
                                value: 5,
                                message: 'min length is 5',
                            },
                        } }),
                    React.createElement(index_1.ValidatedField, { name: "active", type: "checkbox", value: true, label: "active", check: true, id: "active" }),
                    React.createElement(index_1.ValidatedField, { name: "select", type: "select", label: "select", id: "select", validate: {
                            required: 'Your select is required.',
                        } },
                        React.createElement("option", null, "v1"),
                        React.createElement("option", null, "v2")),
                    React.createElement(index_1.ValidatedField, { name: "multiselect", type: "select", multiple: true, label: "multiselect", id: "multiselect", validate: {
                            required: 'Your multiselect is required.',
                        } },
                        React.createElement("option", null, "v1"),
                        React.createElement("option", null, "v2"),
                        React.createElement("option", null, "v3")),
                    React.createElement("button", { type: "submit" }, "SUBMIT")));
            });
            it('should not display error when value is valid', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            react_1.fireEvent.input(react_1.screen.getByLabelText('email'), {
                                target: {
                                    value: 'test@mail.com',
                                },
                            });
                            react_1.fireEvent.input(react_1.screen.getByLabelText('password'), {
                                target: {
                                    value: 'password',
                                },
                            });
                            react_1.fireEvent.input(react_1.screen.getByLabelText('select'), {
                                target: {
                                    value: 'v2',
                                },
                            });
                            react_1.fireEvent.submit(react_1.screen.getByRole('button'));
                            // await for first one
                            return [4 /*yield*/, react_1.waitFor(function () { return expect(react_1.screen.queryByText('Your email is required.')).toBeNull(); })];
                        case 1:
                            // await for first one
                            _a.sent();
                            expect(react_1.screen.queryByText('Your email is required.')).toBeNull();
                            expect(react_1.screen.queryByText('Your password is required.')).toBeNull();
                            expect(react_1.screen.queryByText('Entered value does not match email format')).toBeNull();
                            expect(react_1.screen.queryByText('min length is 5')).toBeNull();
                            expect(react_1.screen.queryByText('Your select is required.')).toBeNull();
                            expect(react_1.screen.queryByText('Your multiselect is required.')).toBeNull();
                            expect(mockSubmit).toBeCalledWith('test@mail.com', 'password', true, 'v1', ['v1', 'v3']);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
});
//# sourceMappingURL=validated-form.spec.js.map