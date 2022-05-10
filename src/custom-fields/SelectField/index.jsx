import { ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import Select from 'react-select';
import { FormFeedback, FormGroup, Label } from 'reactstrap';

SelectField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  options: PropTypes.array,
};

SelectField.defaultProps = {
  label: '',
  placeholder: '',
  disabled: false,
  options: [],
};

function SelectField(props) {
  const { field, form, options, label, placeholder, disabled } = props;
  const { name, value } = field;
  // {name, value, onChange, onBlur}
  const selectedOption = options.find((option) => option.value === value);
  const { errors, touched } = form;
  const isError = !!(touched[name] && errors[name]);

  // Handle
  const handleSelectOptionChange = (selectOption) => {
    const selectValue = selectOption ? selectOption.value : selectOption;

    const changeEvent = {
      target: {
        name,
        value: selectValue,
      },
    };
    field.onChange(changeEvent);
  };

  return (
    <FormGroup>
      {label && <Label for={name}>{label}</Label>}
      <Select
        id={name}
        {...field}
        value={selectedOption}
        onChange={handleSelectOptionChange}
        isDisabled={disabled}
        placeholder={placeholder}
        options={options}
        className={isError ? 'is-invalid' : ''}
      />
      <ErrorMessage name={name} component={FormFeedback} />
    </FormGroup>
  );
}

export default SelectField;
