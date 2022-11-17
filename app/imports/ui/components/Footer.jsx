import React from 'react';
import { Col, Container } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-3 bg-light-green">
    <Container>
      <Col className="text-center">
        UH Manoa Commuter Services
        {' '}
        <br />
        Zone 20 Parking
        <br />
        (808)956-8899
        {' '}
        <br />
      </Col>
    </Container>
  </footer>
);

export default Footer;
