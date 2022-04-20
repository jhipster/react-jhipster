/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { useForm } from 'react-hook-form';

import { ValidatedForm, ValidatedField, ValidatedInput } from './index';
import { Input } from 'reactstrap';
import { isEmail, ValidatedBlobField } from './validated-form';

describe('ValidatedInput', () => {
  describe('with basic text input', () => {
    it('without default value renders an empty input', () => {
      const { container } = render(<ValidatedInput name="test-1" />);
      const input = container.querySelector('input');
      expect(input.name).toEqual('test-1');
      expect(input.id).toEqual('test-1');
      expect(input.type).toEqual('text');
      expect(input.className).toEqual('form-control');
      expect(input.value).toEqual('');
    });
    it('with id doesnt use name as default id in input', () => {
      const { container } = render(<ValidatedInput name="test-1" id="my-id" />);
      const input = container.querySelector('input');
      expect(input.name).toEqual('test-1');
      expect(input.id).toEqual('my-id');
      expect(input.type).toEqual('text');
      expect(input.className).toEqual('form-control');
      expect(input.value).toEqual('');
    });
    it('with custom tag value renders an custom input', () => {
      const { container } = render(<ValidatedInput name="test-1" tag={Input} type="radio" id="test" />);
      const input = container.querySelector('input');
      expect(input.name).toEqual('test-1');
      expect(input.type).toEqual('radio');
      expect(input.className).toEqual('form-check-input form-check-input');
      expect(input.value).toEqual('on');
    });
    it('with custom string tag value renders an custom input', () => {
      const { container } = render(<ValidatedInput name="test-1" tag="select" id="test" />);
      const input = container.querySelector('select');
      expect(input.name).toEqual('test-1');
      expect(input.type).toEqual('select-one');
      expect(input.className).toEqual('form-control');
      expect(input.value).toEqual('');
    });
    it('with default value renders an input with value', () => {
      const { container } = render(<ValidatedInput name="test-1" defaultValue="hello" isTouched={true} />);
      const input = container.querySelector('input');
      expect(input.name).toEqual('test-1');
      expect(input.type).toEqual('text');
      expect(input.className).toEqual('form-control');
      expect(input.value).toEqual('hello');
    });
  });

  describe('with register renders', () => {
    function InputApp({ name, ...rest }) {
      const onSubmit = data => {
        // do nothing
      };
      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
      return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <ValidatedInput register={register} name={name} error={errors[name]} role="textbox" {...rest} />
          <button type="submit">SUBMIT</button>
        </form>
      );
    }
    it('without default value renders an empty input', () => {
      const { container } = render(<InputApp name="test" defaultValue="" />);
      const input = container.querySelector('input');
      expect(input.name).toEqual('test');
      expect(input.type).toEqual('text');
      expect(input.className).toEqual('form-control');
      expect(input.value).toEqual('');
    });
    it('with default value renders an input', () => {
      const { container } = render(<InputApp name="test" defaultValue="hello" isTouched={true} />);
      const input = container.querySelector('input');
      expect(input.name).toEqual('test');
      expect(input.type).toEqual('text');
      expect(input.className).toEqual(' is-touched is-valid form-control');
      expect(input.value).toEqual('hello');
    });
    it('with default value renders an input and shows error when value is absent', async () => {
      const mockChange = jest.fn(e => {
        // do nothing
      });
      const { container } = render(
        <InputApp name="test" defaultValue="hello" validate={{ required: 'this is required' }} onChange={mockChange} />
      );

      let input = container.querySelector('input');
      expect(input.name).toEqual('test');
      expect(input.type).toEqual('text');
      expect(input.className).toEqual('form-control');
      expect(input.value).toEqual('hello');

      fireEvent.input(screen.getByRole('textbox'), {
        target: {
          value: '',
        },
      });
      expect(mockChange).toBeCalled();

      fireEvent.submit(screen.getByRole('button'));

      await waitFor(() => expect(screen.getByText('this is required')).not.toBeNull());
      input = container.querySelector('input');
      expect(input.className).toEqual('is-invalid form-control');
      expect(input.value).toEqual('');
    });
  });
});

describe('ValidatedField', () => {
  describe('with basic text input', () => {
    it('without default value & label renders an empty input', () => {
      const { container } = render(<ValidatedField name="test-1" />);
      const fg = container.querySelector('div.mb-3');
      expect(fg).not.toBeNull();
      const input = container.querySelector('input');
      expect(input.name).toEqual('test-1');
      expect(input.type).toEqual('text');
      expect(input.className).toEqual('form-control');
      expect(input.value).toEqual('');
    });
    it('with custom tags renders a custom input', () => {
      const { container } = render(<ValidatedField name="test-1" tag="fieldset" inputTag={Input} id="test" />);
      const fg = container.querySelector('fieldset.mb-3');
      expect(fg).not.toBeNull();
      const input = container.querySelector('input');
      expect(input.name).toEqual('test-1');
      expect(input.type).toEqual('text');
      expect(input.className).toEqual('form-control form-control');
      expect(input.value).toEqual('');
    });
    it('with label renders an input with label', () => {
      const { container } = render(<ValidatedField name="test-1" defaultValue="hello" isTouched={true} label="Label" />);
      const col = container.querySelector('div.col');
      expect(col).toBeNull();
      const fg = container.querySelector('div.mb-3');
      expect(fg).not.toBeNull();
      const input = container.querySelector('input');
      expect(input.name).toEqual('test-1');
      expect(input.type).toEqual('text');
      expect(input.className).toEqual('form-control');
      expect(input.value).toEqual('hello');
      const lb = container.querySelector('label');
      expect(lb).not.toBeNull();
      expect(screen.getByText('Label')).not.toBeNull();
    });
    it('with row renders an input in a column', () => {
      const { container } = render(<ValidatedField name="test-1" defaultValue="hello" isTouched={true} label="Label" row />);
      const col = container.querySelector('div.col');
      expect(col).not.toBeNull();
      const fg = container.querySelector('div.mb-3');
      expect(fg).not.toBeNull();
      const input = container.querySelector('input');
      expect(input.name).toEqual('test-1');
      expect(input.type).toEqual('text');
      expect(input.className).toEqual('form-control');
      expect(input.value).toEqual('hello');
      const lb = container.querySelector('label');
      expect(lb).not.toBeNull();
      expect(screen.getByText('Label')).not.toBeNull();
    });
    it('with check renders an input before label', () => {
      const { container } = render(<ValidatedField name="test-1" label="Label" check />);
      const fg = container.querySelector('div.form-check');
      expect(fg).not.toBeNull();
      expect(fg.innerHTML).toEqual(
        '<input name="test-1" id="test-1" type="text" class="form-control"><label id="test-1Label" class="form-check-label form-label">Label</label>'
      );
    });
  });

  describe('with register renders', () => {
    function InputApp({ name, ...rest }) {
      const onSubmit = data => {
        // do nothing
      };
      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
      return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <ValidatedField register={register} name={name} error={errors[name]} role="textbox" {...rest} />
          <button type="submit">SUBMIT</button>
        </form>
      );
    }
    it('without default value renders an empty input', () => {
      const { container } = render(<InputApp name="test" defaultValue="" />);
      const input = container.querySelector('input');
      expect(input.name).toEqual('test');
      expect(input.type).toEqual('text');
      expect(input.className).toEqual('form-control');
      expect(input.value).toEqual('');
    });
    it('with default value renders an input', () => {
      const { container } = render(<InputApp name="test" defaultValue="hello" isTouched={true} />);
      const input = container.querySelector('input');
      expect(input.name).toEqual('test');
      expect(input.type).toEqual('text');
      expect(input.className).toEqual(' is-touched is-valid form-control');
      expect(input.value).toEqual('hello');
    });
    it('with default value renders an input and shows error when value is absent', async () => {
      const mockChange = jest.fn(e => {
        // do nothing
      });
      const { container } = render(
        <InputApp name="test" defaultValue="hello" validate={{ required: 'this is required' }} onChange={mockChange} />
      );

      let input = container.querySelector('input');
      expect(input.name).toEqual('test');
      expect(input.type).toEqual('text');
      expect(input.className).toEqual('form-control');
      expect(input.value).toEqual('hello');

      fireEvent.input(screen.getByRole('textbox'), {
        target: {
          value: '',
        },
      });
      expect(mockChange).toBeCalled();

      fireEvent.submit(screen.getByRole('button'));

      await waitFor(() => expect(screen.getByText('this is required')).not.toBeNull());
      input = container.querySelector('input');
      expect(input.className).toEqual('is-invalid form-control');
      expect(input.value).toEqual('');
    });
  });
});

describe('ValidatedBlobField', () => {
  describe('with basic input', () => {
    it('without default value, register & label renders an empty file input', () => {
      const { container } = render(<ValidatedBlobField name="test-1" />);
      const fg = container.querySelector('div.mb-3');
      expect(fg).not.toBeNull();
      const input = container.querySelector('input');
      expect(input.name).toEqual('test-1');
      expect(input.id).toEqual('test-1');
      expect(input.type).toEqual('file');
      expect(input.className).toEqual('form-control');
      expect(input.value).toEqual('');
    });
    it('with custom tags renders a custom input', () => {
      const { container } = render(<ValidatedBlobField name="test-1" tag="fieldset" inputTag={'input'} id="test" />);
      const fg = container.querySelector('fieldset.mb-3');
      expect(fg).not.toBeNull();
      const input = container.querySelector('input');
      expect(input.name).toEqual('test-1');
      expect(input.type).toEqual('file');
      expect(input.className).toEqual('form-control');
      expect(input.value).toEqual('');
    });
    it('with label renders an input with label', () => {
      const { container } = render(<ValidatedBlobField name="test-1" isTouched={true} label="Label" id="my-id" />);
      const col = container.querySelector('div.col');
      expect(col).toBeNull();
      const fg = container.querySelector('div.mb-3');
      expect(fg).not.toBeNull();
      const input = container.querySelector('input');
      expect(input.name).toEqual('test-1');
      expect(input.id).toEqual('my-id');
      expect(input.type).toEqual('file');
      expect(input.className).toEqual('form-control');
      expect(input.value).toEqual('');
      const lb = container.querySelector('label');
      expect(lb).not.toBeNull();
      expect(screen.getByText('Label')).not.toBeNull();
    });
    it('with row renders an input in a column', () => {
      const { container } = render(<ValidatedBlobField name="test-1" isTouched={true} label="Label" row />);
      const col = container.querySelector('div.col');
      expect(col).not.toBeNull();
      const fg = container.querySelector('div.mb-3');
      expect(fg).not.toBeNull();
      const input = container.querySelector('input');
      expect(input.name).toEqual('test-1');
      expect(input.type).toEqual('file');
      expect(input.className).toEqual('form-control');
      expect(input.value).toEqual('');
      const lb = container.querySelector('label');
      expect(lb).not.toBeNull();
      expect(screen.getByText('Label')).not.toBeNull();
    });
  });

  describe('with register renders', () => {
    function InputApp({ name, ...rest }) {
      const onSubmit = data => {
        // do nothing
      };
      const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
      } = useForm({ mode: 'onChange' });
      return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <ValidatedBlobField register={register} setValue={setValue} name={name} error={errors[name]} role="textbox" {...rest} />
          <button type="submit" role="submit">
            SUBMIT
          </button>
        </form>
      );
    }
    it('without default value renders an empty inputs with no data preview', () => {
      const { container } = render(<InputApp name="test" defaultValue="" />);
      const inputContentType: HTMLInputElement = container.querySelector('input');
      expect(inputContentType.id).toEqual('file_test_content_type');
      expect(inputContentType.name).toEqual('testContentType');
      expect(inputContentType.type).toEqual('hidden');
      expect(inputContentType.value).toEqual('');
      const input: HTMLInputElement = container.querySelector('input.form-control');
      expect(input.name).toEqual('test');
      expect(input.id).toEqual('test');
      expect(input.type).toEqual('file');
      expect(input.className).toEqual('form-control');
      expect(input.value).toEqual('');
    });
    it('with default value renders an input with data preview for image', () => {
      const { container } = render(
        <InputApp
          name="test"
          defaultValue="hello"
          id="my-id"
          defaultContentType="image/jpg"
          isTouched={true}
          isImage
          imageClassName="my-image"
        />
      );
      const inputContentType: HTMLInputElement = container.querySelector('input');
      expect(inputContentType.name).toEqual('testContentType');
      const input: HTMLInputElement = container.querySelector('input.form-control');
      expect(input.name).toEqual('test');
      expect(input.id).toEqual('my-id');
      expect(input.type).toEqual('file');
      expect(input.className).toEqual(' is-touched is-valid form-control');
      const div: HTMLDivElement = container.querySelector('div.jhi-validated-blob-field-item-container');
      expect(div).not.toBeNull();
      const img: HTMLImageElement = container.querySelector('img.my-image');
      expect(img).not.toBeNull();
      expect(img.src).toEqual('data:image/jpg;base64,hello');
      expect(container.querySelector('div.jhi-validated-blob-field-item-row')).not.toBeNull();
      expect(container.querySelector('div.jhi-validated-blob-field-item-row-col')).not.toBeNull();
      expect(container.querySelector('div.jhi-validated-blob-field-item-clear-btn')).not.toBeNull();
    });
    it('with default value renders an input with data preview for blob', () => {
      const { container } = render(
        <InputApp
          name="test"
          defaultValue="hello"
          defaultContentType="text/pdf"
          isTouched={true}
          openActionLabel="open this"
          clearBtn={() => <button className="my-btn" />}
        />
      );
      const inputContentType: HTMLInputElement = container.querySelector('input');
      expect(inputContentType.name).toEqual('testContentType');
      const input: HTMLInputElement = container.querySelector('input.form-control');
      expect(input.name).toEqual('test');
      expect(input.type).toEqual('file');
      expect(input.className).toEqual(' is-touched is-valid form-control');
      const div: HTMLDivElement = container.querySelector('div.jhi-validated-blob-field-item-container');
      expect(div).not.toBeNull();
      const anchor: HTMLAnchorElement = container.querySelector('a.jhi-validated-blob-field-item-anchor');
      expect(anchor).not.toBeNull();
      expect(anchor.innerHTML).toEqual('open this');
      expect(container.querySelector('div.jhi-validated-blob-field-item-row')).not.toBeNull();
      expect(container.querySelector('div.jhi-validated-blob-field-item-row-col')).not.toBeNull();
      expect(container.querySelector('div.jhi-validated-blob-field-item-clear-btn')).not.toBeNull();
      expect(container.querySelector('button.my-btn')).not.toBeNull();
    });
    it('with default value renders an input and shows error when value is absent', async () => {
      const mockChange = jest.fn(e => {
        // do nothing
      });
      const { container, getByRole } = render(
        <InputApp
          name="test"
          defaultValue="hello"
          defaultContentType="image/jpg"
          validate={{ required: 'this is required' }}
          onChange={mockChange}
          isImage
          imageClassName="my-image"
        />
      );

      const inputContentType: HTMLInputElement = container.querySelector('input');
      expect(inputContentType.name).toEqual('testContentType');
      let input: HTMLInputElement = container.querySelector('input.form-control');
      expect(input.name).toEqual('test');
      expect(input.type).toEqual('file');
      expect(input.className).toEqual('form-control');
      let img: HTMLImageElement = container.querySelector('img.my-image');
      expect(img).not.toBeNull();
      expect(img.src).toEqual('data:image/jpg;base64,hello');

      fireEvent.change(getByRole('textbox'), {
        target: {
          value: '',
        },
      });
      expect(mockChange).toBeCalled();

      fireEvent.submit(screen.getByRole('submit'));

      await waitFor(() => expect(screen.getByText('this is required')).not.toBeNull());
      input = container.querySelector('input.form-control');
      expect(input.className).toEqual('is-invalid form-control');
      expect(input.value).toEqual('');
      img = container.querySelector('img.my-image');
      expect(img).toBeNull();
    });
  });
});

describe('ValidatedForm', () => {
  describe('with non-input children', () => {
    it('renders them as single element', () => {
      const { container } = render(
        <ValidatedForm onSubmit={() => {}} className="myform">
          <div>a div</div>
        </ValidatedForm>
      );
      const form = container.querySelector('form.myform');
      expect(form).not.toBeNull();
      expect(screen.getByText('a div')).not.toBeNull();
    });
    it('renders them as array of elements', () => {
      const { container } = render(
        <ValidatedForm onSubmit={() => {}} className="myform">
          {/* A comment */}
          <div>a div</div>
          <button>a button</button>
          <div>
            <span>
              <button>nested button</button>
            </span>
          </div>
        </ValidatedForm>
      );
      const form = container.querySelector('form.myform');
      expect(form).not.toBeNull();
      expect(screen.getByText('a div')).not.toBeNull();
      expect(screen.getByText('a button')).not.toBeNull();
      expect(screen.getByText('nested button')).not.toBeNull();
    });
  });
  describe('with validated input & field children', () => {
    it('should override register, error, isTouched & isDirty', async () => {
      const { container, findByText } = render(
        <ValidatedForm onSubmit={() => {}} className="myform">
          <ValidatedInput name="test-12" error={{ type: 'required', message: 'Your email is required.' }} isTouched={true} isDirty={true} />
        </ValidatedForm>
      );
      const form = container.querySelector('form.myform');
      expect(form).not.toBeNull();
      const input: HTMLInputElement = container.querySelector('input[name="test-12"]');
      expect(input.name).toEqual('test-12');
      expect(input.type).toEqual('text');
      expect(input.className).toEqual(' is-touched is-dirty is-invalid form-control');
      expect(input.value).toEqual('');

      expect(await findByText('Your email is required.')).not.toBeNull();
    });
    describe('renders them with default values passed inline', () => {
      it('for text field', () => {
        const { container } = render(
          <ValidatedForm onSubmit={() => {}} className="myform">
            <ValidatedInput name="test-1" defaultValue="hello" />
          </ValidatedForm>
        );
        const input: HTMLInputElement = container.querySelector('input[name="test-1"]');
        expect(input.name).toEqual('test-1');
        expect(input.type).toEqual('text');
        expect(input.className).toEqual('form-control');
        expect(input.value).toEqual('hello');
      });

      it('for password field', () => {
        const { container } = render(
          <ValidatedForm onSubmit={() => {}} className="myform">
            <ValidatedField name="test-2" type="password" label="password" defaultValue="1231" />
          </ValidatedForm>
        );
        const input2: HTMLInputElement = container.querySelector('input[name="test-2"]');
        expect(input2.name).toEqual('test-2');
        expect(input2.type).toEqual('password');
        expect(input2.className).toEqual('form-control');
        expect(input2.value).toEqual('1231');
      });

      it('for checkbox field', () => {
        const { container } = render(
          <ValidatedForm onSubmit={() => {}} className="myform">
            <ValidatedField name="test-3" type="checkbox" value={true} check label="check label" />
          </ValidatedForm>
        );
        const input3: HTMLInputElement = container.querySelector('input[name="test-3"]');
        expect(input3.name).toEqual('test-3');
        expect(input3.type).toEqual('checkbox');
        expect(input3.className).toEqual('form-check-input');
        expect(input3.value).toEqual('true');
      });

      it('for radio field', () => {
        const { container } = render(
          <ValidatedForm onSubmit={() => {}} className="myform">
            <ValidatedField name="test-4" type="radio" value="on" label="radio label" />
          </ValidatedForm>
        );
        const input4: HTMLInputElement = container.querySelector('input[name="test-4"]');
        expect(input4.name).toEqual('test-4');
        expect(input4.type).toEqual('radio');
        expect(input4.className).toEqual('form-check-input');
        expect(input4.value).toEqual('on');
      });

      it('for select field', () => {
        const { container } = render(
          <ValidatedForm onSubmit={() => {}} className="myform">
            <ValidatedInput name="test-5" type="select" label="select label" defaultValue="value 1">
              <option>value 1</option>
              <option>value 2</option>
            </ValidatedInput>
            <ValidatedField name="test-6" type="select" multiple label="select label" defaultValue={['value 1', 'value 3']}>
              <option>value 1</option>
              <option>value 2</option>
              <option>value 3</option>
            </ValidatedField>
          </ValidatedForm>
        );
        const input5: HTMLSelectElement = container.querySelector('select[name="test-5"]');
        expect(input5.name).toEqual('test-5');
        expect(input5.className).toEqual('form-select');
        expect(input5.value).toEqual('value 1');

        const input6: HTMLSelectElement = container.querySelector('select[name="test-6"]');
        expect(input6.name).toEqual('test-6');
        expect(input6.multiple).toEqual(true);
        expect(input6.className).toEqual('form-select');
        expect(input6.selectedOptions[0].value).toEqual('value 1');
        expect(input6.selectedOptions[1].value).toEqual('value 3');
      });
    });
    describe('renders them with default values passed via form', () => {
      it('for text field', () => {
        const { container } = render(
          <ValidatedForm
            onSubmit={() => {}}
            className="myform"
            defaultValues={{
              test1: 'test1',
              test2: 'test2',
            }}
          >
            <ValidatedField name="test1" />
            <ValidatedField name="test2" type="password" label="password" />
          </ValidatedForm>
        );

        const input: HTMLInputElement = container.querySelector('input[name="test1"]');
        expect(input.name).toEqual('test1');
        expect(input.type).toEqual('text');
        expect(input.className).toEqual('form-control');
        expect(input.value).toEqual('test1');

        const input2: HTMLInputElement = container.querySelector('input[name="test2"]');
        expect(input2.name).toEqual('test2');
        expect(input2.type).toEqual('password');
        expect(input2.className).toEqual('form-control');
        expect(input2.value).toEqual('test2');
      });

      it('for checkbox/radio field should retain value inline', () => {
        const { container } = render(
          <ValidatedForm
            onSubmit={() => {}}
            className="myform"
            defaultValues={{
              test3: 'false',
              test4: 'on',
            }}
          >
            <ValidatedField name="test3" type="checkbox" value={true} check label="check label" />
            <ValidatedField name="test4" type="radio" value="on" label="radio label" />
          </ValidatedForm>
        );
        // should retain the value
        const input3: HTMLInputElement = container.querySelector('input[name="test3"]');
        expect(input3.name).toEqual('test3');
        expect(input3.type).toEqual('checkbox');
        expect(input3.className).toEqual('form-check-input');
        expect(input3.value).toEqual('true');
        expect(input3.checked).toEqual(true);
        // should retain the value
        const input4: HTMLInputElement = container.querySelector('input[name="test4"]');
        expect(input4.name).toEqual('test4');
        expect(input4.type).toEqual('radio');
        expect(input4.className).toEqual('form-check-input');
        expect(input4.value).toEqual('on');
        expect(input4.checked).toEqual(true);
      });

      it('for select field', () => {
        const { container } = render(
          <ValidatedForm
            onSubmit={() => {}}
            className="myform"
            defaultValues={{
              test5: 'value 1',
              test6: ['value 1', 'value 3'],
            }}
          >
            <ValidatedInput name="test5" type="select" label="select label">
              <option>value 1</option>
              <option>value 2</option>
            </ValidatedInput>
            <ValidatedField name="test6" type="select" multiple label="select label">
              <option>value 1</option>
              <option>value 2</option>
              <option>value 3</option>
            </ValidatedField>
          </ValidatedForm>
        );
        const input5: HTMLSelectElement = container.querySelector('select[name="test5"]');
        expect(input5.name).toEqual('test5');
        expect(input5.className).toEqual('form-select');
        expect(input5.selectedOptions[0].value).toEqual('value 1');
        expect(input5.value).toEqual('value 1');

        const input6: HTMLSelectElement = container.querySelector('select[name="test6"]');
        expect(input6.name).toEqual('test6');
        expect(input6.multiple).toEqual(true);
        expect(input6.className).toEqual('form-select');
        expect(input6.selectedOptions[0].value).toEqual('value 1');
        expect(input6.selectedOptions[1].value).toEqual('value 3');
      });
    });
    describe('validate the form with no default values', () => {
      const mockSubmit = jest.fn((email, password, active, select, multiselect) => {
        // do nothing
      });

      const onSubmit = ({ email, password, active, select, multiselect }) => {
        mockSubmit(email, password, active, select, multiselect);
      };

      beforeEach(() => {
        render(
          <ValidatedForm onSubmit={onSubmit} className="myform">
            <ValidatedField
              name="email"
              label="email"
              id="email"
              validate={{
                required: 'Your email is required.',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Entered value does not match email format',
                },
              }}
            />
            <ValidatedField
              name="password"
              type="password"
              label="password"
              id="password"
              validate={{
                required: 'Your password is required.',
                minLength: {
                  value: 5,
                  message: 'min length is 5',
                },
              }}
            />
            <ValidatedField name="active" type="checkbox" value={true} label="active" check id="active" />
            <ValidatedField
              name="select"
              type="select"
              label="select"
              id="select"
              validate={{
                required: 'Your select is required.',
              }}
            >
              <option>v1</option>
              <option>v2</option>
            </ValidatedField>
            <ValidatedField
              name="multiselect"
              type="select"
              multiple
              label="multiselect"
              id="multiselect"
              defaultValue={['v2']}
              validate={{
                required: 'Your multiselect is required.',
              }}
            >
              <option>v1</option>
              <option>v2</option>
              <option>v3</option>
            </ValidatedField>
            <button type="submit">SUBMIT</button>
          </ValidatedForm>
        );
      });
      it('should display required error when value is invalid', async () => {
        fireEvent.submit(screen.getByRole('button'));

        expect(await screen.findByText('Your email is required.')).not.toBeNull();
        expect(await screen.findByText('Your password is required.')).not.toBeNull();
        expect(mockSubmit).not.toBeCalled();
      });
      it('should display matching error when email is invalid', async () => {
        fireEvent.input(screen.getByLabelText('email'), {
          target: {
            value: 'test',
          },
        });

        fireEvent.input(screen.getByLabelText('password'), {
          target: {
            value: 'password',
          },
        });

        fireEvent.submit(screen.getByRole('button'));

        expect(await screen.findByText('Entered value does not match email format')).not.toBeNull();
        expect(mockSubmit).not.toBeCalled();
        const email = screen.getByLabelText('email') as HTMLInputElement;
        expect(email.value).toBe('test');
        const password = screen.getByLabelText('password') as HTMLInputElement;
        expect(password.value).toBe('password');
      });
      it('should display min length error when password is invalid', async () => {
        fireEvent.input(screen.getByLabelText('email'), {
          target: {
            value: 'test@mail.com',
          },
        });

        fireEvent.input(screen.getByLabelText('password'), {
          target: {
            value: 'pass',
          },
        });

        fireEvent.submit(screen.getByRole('button'));

        expect(await screen.findByText('min length is 5')).not.toBeNull();
        expect(mockSubmit).not.toBeCalled();
        const email = screen.getByLabelText('email') as HTMLInputElement;
        expect(email.value).toBe('test@mail.com');
        const password = screen.getByLabelText('password') as HTMLInputElement;
        expect(password.value).toBe('pass');
      });
      it('should not display error when value is valid', async () => {
        fireEvent.input(screen.getByLabelText('email'), {
          target: {
            value: 'test@mail.com',
          },
        });

        fireEvent.input(screen.getByLabelText('password'), {
          target: {
            value: 'password',
          },
        });

        fireEvent.submit(screen.getByRole('button'));

        // await for first one
        await waitFor(() => expect(screen.queryByText('Your email is required.')).toBeNull());
        expect(screen.queryByText('Your email is required.')).toBeNull();
        expect(screen.queryByText('Your password is required.')).toBeNull();
        expect(screen.queryByText('Entered value does not match email format')).toBeNull();
        expect(screen.queryByText('min length is 5')).toBeNull();
        expect(screen.queryByText('Your select is required.')).toBeNull();
        expect(screen.queryByText('Your multiselect is required.')).toBeNull();

        await waitFor(() => expect(mockSubmit).toBeCalledWith('test@mail.com', 'password', false, 'v1', ['v2']));
      });
    });
    describe('validate the form with default values', () => {
      const mockSubmit = jest.fn((email, password, active, select, multiselect) => {
        // do nothing
      });

      const onSubmit = ({ email, password, active, select, multiselect }) => {
        mockSubmit(email, password, active, select, multiselect);
      };

      beforeEach(() => {
        render(
          <ValidatedForm
            onSubmit={onSubmit}
            className="myform"
            defaultValues={{
              email: 'test@test.com',
              password: 'password',
              active: true,
              select: 'v1',
              multiselect: ['v1', 'v3'],
            }}
          >
            <ValidatedField
              name="email"
              label="email"
              id="email"
              validate={{
                required: 'Your email is required.',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Entered value does not match email format',
                },
              }}
            />
            <ValidatedField
              name="password"
              type="password"
              label="password"
              id="password"
              validate={{
                required: 'Your password is required.',
                minLength: {
                  value: 5,
                  message: 'min length is 5',
                },
              }}
            />
            <ValidatedField name="active" type="checkbox" value={true} label="active" check id="active" />
            <ValidatedField
              name="select"
              type="select"
              label="select"
              id="select"
              validate={{
                required: 'Your select is required.',
              }}
            >
              <option>v1</option>
              <option>v2</option>
            </ValidatedField>
            <ValidatedField
              name="multiselect"
              type="select"
              multiple
              label="multiselect"
              id="multiselect"
              validate={{
                required: 'Your multiselect is required.',
              }}
            >
              <option>v1</option>
              <option>v2</option>
              <option>v3</option>
            </ValidatedField>
            <button type="submit">SUBMIT</button>
          </ValidatedForm>
        );
      });

      it('should not display error when value is valid', async () => {
        fireEvent.input(screen.getByLabelText('email'), {
          target: {
            value: 'test@mail.com',
          },
        });

        fireEvent.input(screen.getByLabelText('password'), {
          target: {
            value: 'password',
          },
        });
        fireEvent.input(screen.getByLabelText('select'), {
          target: {
            value: 'v2',
          },
        });

        fireEvent.submit(screen.getByRole('button'));

        // await for first one
        await waitFor(() => expect(screen.queryByText('Your email is required.')).toBeNull());
        expect(screen.queryByText('Your email is required.')).toBeNull();
        expect(screen.queryByText('Your password is required.')).toBeNull();
        expect(screen.queryByText('Entered value does not match email format')).toBeNull();
        expect(screen.queryByText('min length is 5')).toBeNull();
        expect(screen.queryByText('Your select is required.')).toBeNull();
        expect(screen.queryByText('Your multiselect is required.')).toBeNull();

        await waitFor(() => expect(mockSubmit).toBeCalledWith('test@mail.com', 'password', true, 'v1', ['v1', 'v3']));
      });
    });
  });
});

describe('isEmail', () => {
  it('should return false when passed object is not an email', () => {
    expect(isEmail('foo')).toEqual(false);
    expect(isEmail('123foo')).toEqual(false);
    expect(isEmail('foo123foo')).toEqual(false);
    expect(isEmail('foo123.fr')).toEqual(false);
    expect(isEmail('foo123@me')).toEqual(false);
    expect(isEmail({})).toEqual(false);
    expect(isEmail([10])).toEqual(false);
    expect(isEmail(true)).toEqual(false);
    expect(isEmail('evan.sharp@availity')).toEqual(false);
    expect(isEmail('evan.sharp@')).toEqual(false);
    expect(isEmail('@availity.com')).toEqual(false);
    expect(isEmail('evan.sharp@.com')).toEqual(false);
    expect(isEmail('evan.sharp')).toEqual(false);
    expect(isEmail('availity.com')).toEqual(false);
    expect(isEmail('Evan@Sharp@Availity.com')).toEqual(false);
  });
  it('should return true when passed object is an email or undefined', () => {
    expect(isEmail(false)).toEqual(true);
    expect(isEmail('')).toEqual(true);
    expect(isEmail([])).toEqual(true);
    expect(isEmail(null)).toEqual(true);
    expect(isEmail(undefined)).toEqual(true);
    expect(isEmail('me@me.com')).toEqual(true);
    expect(isEmail('evan.sharp@availity.com')).toEqual(true);
    expect(isEmail('evan.sharp+more-things@availity.com')).toEqual(true);
    expect(isEmail('evan.sharp@availity.com.co')).toEqual(true);
    expect(isEmail('evan.sharp@development.availity.com')).toEqual(true);
    expect(isEmail('Evan.Sharp@Availity.com')).toEqual(true);
  });
});
