import Banner from 'components/Banner';
import PhotoForm from 'components/PhotoForm';
import { addPhoto, updatePhoto } from 'features/Photo/photoSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { randomNumber } from 'utils/common';
import './styles.scss';

AddEditPage.propTypes = {};

function AddEditPage(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { photoId } = useParams();
  let isAddMode = !photoId;

  const editPhotoValue = useSelector((state) =>
    state.photos.find((photo) => photo.id === +photoId)
  );

  if (!editPhotoValue) isAddMode = true;

  const initialValues = isAddMode
    ? {
        title: '',
        categoryId: null,
        photo: '',
      }
    : editPhotoValue;

  const handleSubmit = async (values) => {
    try {
      // Fake
      return new Promise((resolve) => {
        setTimeout(() => {
          if (isAddMode) {
            const newPhoto = {
              ...values,
              id: randomNumber(10000, 99999),
            };

            const action = addPhoto(newPhoto);
            dispatch(action);
            console.log('add', values);
          } else {
            const action = updatePhoto(values);
            dispatch(action);
            console.log('edit', values);
          }

          history.push('/photos');
          resolve(true);
        }, 1000);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="photo-edit">
      <Banner title="Pick your amazing photo 😎" />
      <div className="photo-edit__form">
        <PhotoForm
          isAddMode={isAddMode}
          initialValues={initialValues}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

export default AddEditPage;
