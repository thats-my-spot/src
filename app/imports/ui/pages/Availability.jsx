import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import Pagination from 'react-bootstrap/Pagination';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
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
const submit = (user, _id) => {
  // const stall = Stalls.collection.findOne(_id);
  Stalls.collection.update(_id, { $set: { owner: user.username, licensePlate: user.profile.licensePlate } }, (error) => {
    if (error) {
      swal('Error', error.message, 'error');
    } else {
      swal('Success', 'Reserved stall successfully', 'success');
      // setRedirectToRef(true);
    }
  });
};
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

    // console.log(hasStall);
    stallItems.sort((a, b) => a.stallId - b.stallId);
    return {
      stalls: stallItems,
      ready: rdy,
    };
  }, []);
  const user = Meteor.users.findOne(Meteor.userId());
  console.log(user.username);

  const hasStall = Stalls.collection.findOne({ owner: { $eq: user.username } }) !== undefined;
  console.log(hasStall);
  if (ready && !hasStall) {
    return (
      <Container id="avail-page" className="py-3">
        <Row className="justify-content-center">
          <Col md={7}>
            <Col className="text-center">
              <h2>Availability</h2>
            </Col>
            <Table striped bordered hover>
              <thead>
                <tr className="text-center">
                  <th colSpan={5}>Floor 1</th>
                  <th colSpan={5}>Floor 2</th>
                  <th colSpan={5}>Floor 3</th>
                </tr>
              </thead>
              <thead>
                <tr>
                  {stalls.map(stall => <th>{stall.stallId}</th>)}
                </tr>
              </thead>
              <tbody>
                <tr className="p-0 m-0">
                  {stalls.map(function (stall) {
                    return (stall.owner === 'empty') ? (
                      <td height={200} width={100} style={{ background: 'lightgreen' }} className="bg-light-green m-0 p-0">
                        <Link onClick={() => submit(Meteor.users.findOne(Meteor.userId()), stall._id)} to="/stall" style={{ display: 'block', position: 'relative', height: '100%', width: '100%' }}>
                          ???
                        </Link>
                      </td>
                    )
                      : <td height={200} width={100} style={{ backgroundColor: 'red' }} />;
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
    );
  }
  if (!ready) {
    return <LoadingSpinner />;
  }
  return (
    <Container fluid className="w-100 h-100 text-center align-items-center">
      <h1 className="mt-5">
        You already have a stall. Click <Link to="/stall">here</Link> to view it.
      </h1>
    </Container>
  );
};

export default Availability;
