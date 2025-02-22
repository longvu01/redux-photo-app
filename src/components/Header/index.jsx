import React from 'react';
import { NavLink } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import './Header.scss';

Header.propTypes = {};

function Header({ userName = '' }) {
  return (
    <header className="header">
      <Container>
        <Row className="justify-content-between">
          <Col xs="auto">
            <a
              className="header__link header__title"
              href="https://www.youtube.com/easyfrontend"
              target="_blank"
              rel="noopener noreferrer"
            >
              Easy Frontend
            </a>
          </Col>

          <Col xs="auto">
            {userName || (
              <NavLink
                exact
                className="header__link"
                to="/sign-in"
                activeClassName="header__link--active"
              >
                Sign in
              </NavLink>
            )}
          </Col>
        </Row>
      </Container>
    </header>
  );
}

export default Header;
