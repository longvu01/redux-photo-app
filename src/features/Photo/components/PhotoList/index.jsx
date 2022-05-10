import PhotoContext from 'features/Photo/photoStore/Context';
import React, { useContext } from 'react';
import { Col, Row } from 'reactstrap';
import PhotoCard from '../PhotoCard';

function PhotoList() {
  const photoContext = useContext(PhotoContext);
  const photoList = photoContext.photos;

  return (
    <Row>
      {photoList.map((photo) => (
        <Col key={photo.title} xs="12" md="6" lg="3">
          <PhotoCard photo={photo} />
        </Col>
      ))}
    </Row>
  );
}

export default PhotoList;
