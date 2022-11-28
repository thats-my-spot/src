import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row, Table } from 'react-bootstrap';
import StallItemAdmin from '../components/StallItemAdmin';
import LoadingSpinner from '../components/LoadingSpinner';
import { Stalls } from '../../api/stalls/Stalls';

/* Renders a table containing all of the Stuff documents. Use <StuffItemAdmin> to render each row. */
const ListStallAdmin = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, stalls } = useTracker(() => {
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
          <Col className="text-center"><h2>List Stall (Admin)</h2></Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Stall ID</th>
                <th>Level</th>
                <th>Owner</th>
                <th>License Plate</th>
              </tr>
            </thead>
            <tbody>
              {stalls.map(function (stall) {
                return (stall.owner === 'empty') ? '' : <StallItemAdmin key={stall.stallId} stall={stall} />;
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListStallAdmin;
