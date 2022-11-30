import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import Pagination from 'react-bootstrap/Pagination';
import { Stalls } from '../../api/stalls/Stalls';
import LoadingSpinner from '../components/LoadingSpinner';

const active = 1;
const items = [];
for (let i = 1; i <= 3; i++) {
  items.push(
    <Pagination.Item key={i} active={i === active}>
      {i}
    </Pagination.Item>,
  );
}

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const Availability = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, stalls } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Stalls.availablePublicationName);
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
    <Container id="avail-page" className="py-3">
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
              </tr>
            </thead>
            <tbody>
              <tr>
                {stalls.map(function (stall) {
                  return (stall.owner === 'empty') ?
                    <td height={200} style={{ backgroundColor: 'lightgreen' }}><a href="https://en.wikipedia.org/wiki/Human_rights_violations_by_the_CIA" style={{ display: 'block', position: 'relative' }}>‎</a></td>
                    : <td height={200} style={{ backgroundColor: 'red' }}> </td>;
                })}
              </tr>
            </tbody>
          </Table>
          <div>
            <Pagination>{items}</Pagination>
          </div>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default Availability;
