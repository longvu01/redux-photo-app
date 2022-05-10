import React from 'react';
import PropTypes from 'prop-types';
import { FormFeedback, FormGroup, Label } from 'reactstrap';
import RandomPhoto from 'components/RandomPhoto';
import { ErrorMessage } from 'formik';

RandomPhotoField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  label: PropTypes.string,
};

RandomPhotoField.defaultProps = {
  label: '',
};

function RandomPhotoField({ field, form, label }) {
  const { name, value, onBlur } = field;
  const { errors, touched } = form;
  const isError = errors[name] && touched[name];

  // Handle
  const handleImageUrlChange = (newImageUrl) => {
    form.setFieldValue(name, newImageUrl);
  };

  return (
    <FormGroup>
      {label && <Label for={name}>{label}</Label>}

      <RandomPhoto
        name={name}
        imageUrl={value}
        onImageUrlChange={handleImageUrlChange}
        onRandomButtonBlur={onBlur}
        className={isError ? 'is-invalid' : ''}
      ></RandomPhoto>

      <ErrorMessage name={name} component={FormFeedback} />
    </FormGroup>
  );
}

export default RandomPhotoField;
