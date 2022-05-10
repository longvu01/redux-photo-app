import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removePhoto } from '../photoSlice';
import Context from './Context';
import { useHistory } from 'react-router-dom';

function PhotoProvider({ children }) {
  const photos = useSelector((state) => state.photos);
  const dispatch = useDispatch();
  const history = useHistory();

  const handlePhotoEditClick = (photo) => {
    console.log('Edit', photo);
    history.push(`/photos/${photo.id}`);
  };

  const handlePhotoRemoveClick = (photo) => {
    const removePhotoId = photo.id;
    const action = removePhoto(removePhotoId);
    dispatch(action);
  };

  const value = { photos, handlePhotoEditClick, handlePhotoRemoveClick };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export default PhotoProvider;
