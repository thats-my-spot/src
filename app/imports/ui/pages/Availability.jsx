import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Stalls } from '../../api/stalls/Stalls';
import LoadingSpinner from '../components/LoadingSpinner';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const Availability = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, stalls } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Stalls.adminPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const stallItems = Stalls.collection.find({}).fetch();
    return {
      stalls: stallItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2>Availability</h2>
          </Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th> 1</th>
                <th> 2</th>
                <th> 3</th>
                <th> 4</th>
                <th> 5</th>
                <th> 6</th>
                <th> 7</th>
                <th> 8</th>
                <th> 9</th>
                <th> 10</th>
                <th> 11</th>
                <th> 12</th>
                <th> 13</th>
                <th> 14</th>
                <th> 15</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {stalls.map((stall) => <td height={200} style={{ backgroundColor: (stall.owner === 'empty' ? 'lightgreen' : 'red') }}> </td>)}
              </tr>
            </tbody>
          </Table>
          <Row className="justify-content-center">
            <Col className="col-4">
              <Button>Previous level</Button>
            </Col>
            <Col className="col-4">
              <Button>Next level</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default Availability;
