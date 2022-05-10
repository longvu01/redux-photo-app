import PhotoContext from 'features/Photo/photoStore/Context';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Button } from 'reactstrap';
import './PhotoCard.scss';

PhotoCard.propTypes = {
  photo: PropTypes.object,
};

PhotoCard.defaultProps = {
  photo: {},
};

function PhotoCard({ photo }) {
  const photoContext = useContext(PhotoContext);
  const { handlePhotoEditClick, handlePhotoRemoveClick } = photoContext;

  const handleEditClick = () => {
    if (!handlePhotoEditClick) return;
    handlePhotoEditClick(photo);
  };

  const handleRemoveClick = () => {
    if (!handlePhotoRemoveClick) return;
    handlePhotoRemoveClick(photo);
  };

  return (
    <div className="photo">
      <img src={photo.photo} alt={photo.title} />

      <div className="photo__overlay">
        <h3 className="photo__title">{photo.title}</h3>

        <div className="photo__actions">
          <div>
            <Button outline size="sm" color="light" onClick={handleEditClick}>
              Edit
            </Button>
          </div>

          <div>
            <Button
              outline
              size="sm"
              color="danger"
              onClick={handleRemoveClick}
            >
              Remove
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhotoCard;
