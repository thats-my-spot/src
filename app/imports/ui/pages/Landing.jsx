import React, { useState } from 'react';
import { Col, Container, Row, Button, Modal } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container fluid className=" p-0 m-0 w-100">
    <div className="background-image py-3 w-100 p-0 m-0 text-center align-text-bottom">
      <a href="#instruction" className="h1"><button type="button" className="btn btn-light rounded-pill">Instructions</button></a>
    </div>
    <div id="instruction" className="background-image2 pt-4">
      <Row>
        <Col className="d-flex flex-column justify-content-center text-center text-white h1">
          HOW TO PARK
        </Col>
        <Row>
          <div className="d-flex justify-content-center">
            <Col className="text-center text-white">
              <div id="text-bg"><h1>Have a UH account?</h1>
                <div>
                  <img id="medium-image" src="https://manoa.hawaii.edu/commuter/wp-content/uploads/sites/6/2022/11/students.jpg" alt="nothing" />
                </div>
                <div id="small-padd">
                  <AccInstr />
                </div>
              </div>
            </Col>
            <Col className="text-center text-white">
              <div id="text-bg"><h1>Guest?</h1>
                <div>
                  <img id="medium-image" src="https://manoa.hawaii.edu/commuter/wp-content/uploads/sites/6/2022/11/special-events.jpg" alt="nothing" />
                </div>
                <div id="small-padd">
                  <NoAccInstr />
                </div>
              </div>
            </Col>
          </div>
        </Row>
      </Row>
      <Row id="small-padd">
        <Col className="text-white h1" md={{ span: 4, offset: 1 }}>
          Frequently Asked Questions
        </Col>
        <hr />
      </Row>
      <Row>
        <Container className="text-white d-flex justify-content-center">
          <a href="#root" className="h1"><button type="button" className="btn btn-light rounded-pill">Back to top</button></a>
        </Container>
      </Row>
    </div>
  </Container>

);

const AccInstr = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Instructions
      </Button>

      <Modal show={show} onHide={handleClose} className="modal-lg">
        <Modal.Header closeButton>
          <Modal.Title>Instructions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>1. Sign up for a <i>That's My Spot Account</i> with your UH Manoa account <a href="/signup">here.</a></div>
          <div>2. Visit the <a href="/availability">availability</a> page to see open stalls.</div>
          <div>3. <a href="/reserve">Reserve</a> and park!</div>
          <div id="small-padd">
            Already have an account?
            <a href="/reserve">Sign in</a>
          </div>
        </Modal.Body>
        <Modal.Footer />
      </Modal>
    </>
  );
};

const NoAccInstr = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Instructions
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Instructions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>1. Visit the <a href="/reserve">Reserve</a> page </div>
          <div>2. Visit the <a href="/availability">availability</a> page to see open stalls.</div>
          <div>3. <a href="/reserve">Reserve</a> and park!</div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Landing;
