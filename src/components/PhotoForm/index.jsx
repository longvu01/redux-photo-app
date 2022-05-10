import { PHOTO_CATEGORY_OPTIONS } from 'constants/global';
import InputField from 'custom-fields/InputField';
import RandomPhotoField from 'custom-fields/RandomPhotoField';
import SelectField from 'custom-fields/SelectField';
import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, FormGroup, Spinner } from 'reactstrap';
import * as Yup from 'yup';

PhotoForm.propTypes = {
  onSubmit: PropTypes.func,
  isAddMode: PropTypes.bool,
};

PhotoForm.defaultProps = {
  onSubmit: null,
  isAddMode: true,
};

function PhotoForm({ isAddMode, onSubmit, initialValues }) {
  const requiredMessage = 'This field is required!';

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(requiredMessage),

    categoryId: Yup.number().required(requiredMessage).nullable(),

    photo: Yup.string().when('categoryId', {
      is: 1,
      then: Yup.string().required(requiredMessage),
      otherwise: Yup.string().notRequired(),
    }),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formikProps) => {
        const { isSubmitting } = formikProps;

        return (
          <Form>
            <FastField
              name="title"
              component={InputField}
              label="Title"
              placeholder="Eg: Wow nature ..."
            />

            <FastField
              name="categoryId"
              component={SelectField}
              label="Category"
              placeholder="What's your photo category?"
              options={PHOTO_CATEGORY_OPTIONS}
            />

            <FastField
              name="photo"
              component={RandomPhotoField}
              label="Photo"
            />

            <FormGroup>
              <Button type="submit" color={isAddMode ? 'primary' : 'success'}>
                {isAddMode ? 'Add to album' : 'Update your photo'}
                {isSubmitting && <Spinner size="sm" />}
              </Button>
            </FormGroup>
          </Form>
        );
      }}
    </Formik>
  );
}

export default PhotoForm;
