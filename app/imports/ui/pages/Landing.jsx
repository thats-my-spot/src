import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container fluid className=" p-0 m-0 w-100">
    <div className="background-image py-3 w-100 p-0 m-0 text-center align-text-bottom">
      <a href="#instruction" className="h1"><button type="button" className="btn btn-light rounded-pill">Instructions</button></a>
    </div>
    <div id="instruction" className="background-image2">
      <Row>
        <Col className="d-flex flex-column justify-content-center text-center text-white h1">
          HOW TO PARK
        </Col>
        <Row className="d-flex justify-content-center">
          <Col className="text-center text-white">
            <h1>How to get a parking stall with an account</h1>
            <Container>Instructions</Container>

            <Container>Already have an account? Sign in below</Container>
            <a href="/signin">
              <button type="button" className="btn btn-light rounded-pill">Sign in</button>
            </a>
            <Container>
              Don&#39;t have an account? Sign up below
            </Container>
            <a href="/signup">
              <button type="button" className="btn btn-light rounded-pill">Sign up</button>
            </a>
          </Col>
          <Col className="text-center text-white">
            <h1>How to get a parking stall without an account</h1>
            <Container>Instructions</Container>
            <a href="https://en.wikipedia.org/wiki/BTS">
              <button type="button" className="btn btn-light rounded-pill">Look for a stall</button>
            </a>
          </Col>
        </Row>
      </Row>
      <Row>
        <Container className="text-white d-flex justify-content-center">
          <a href="#root" className="h1"><button type="button" className="btn btn-light rounded-pill">Back to top</button></a>
        </Container>
      </Row>
    </div>
  </Container>

);

export default Landing;
