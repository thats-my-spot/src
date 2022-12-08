import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import {
  AutoForm,
  ErrorsField,
  SubmitField,
  TextField,
  NumField,
  DateField,
} from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
// import { useTracker } from 'meteor/react-meteor-data';
// import { useParams } from 'react-router';
import { Stalls } from '../../api/stalls/Stalls';

const formSchema = new SimpleSchema({
  owner: String,
  licensePlate: String,
  test: {
    type: String,
    optional: true,
    min: 16,
    max: 16,
    // allowedValues: [0,1,2,3,4,5,6,7,8,9],
  },
  cvv: {
    type: String,
    min: 3,
    max: 3,
  },
  date: Date,
  test01: {
    type: SimpleSchema.Integer,
    min: 2,
    max: 2,
  },
  test02: SimpleSchema.Integer,
});

const bridge = new SimpleSchema2Bridge(formSchema);

const randomId = () => {

  // Get access to Stall documents.
  // Meteor.subscribe(Stalls.adminPublicationName);
  // Meteor.subscribe(Stalls.availablePublicationName);
  // Determine if the subscription is ready
  // const rdy = subscription.ready();
  // Get the Stuff documents

  // console.log(Stalls.collection.find());
  const stall = Stalls.collection.findOne({ owner: { $eq: 'empty' } });
  // console.log(Meteor.userId());
  console.log('what', stall);
  if (stall === undefined) {
    return -1;
  }
  console.log(stall._id);
  return stall._id;
};

const Payment = () => {
  // On submit, insert the data.
  const submit = (data) => {
    const { owner, licensePlate } = data;
    // Roles.addUsersToRoles(Meteor.userId(), 'admin');

    console.log(owner, licensePlate);

    console.log(randomId());
    Stalls.collection.update({ _id: randomId() }, { $set: { owner, licensePlate } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));

    // Roles.removeUsersFromRoles(Meteor.userId(), 'admin');
  };

  // Meteor.subscribe(Stalls.adminPublicationName);
  Meteor.subscribe(Stalls.availablePublicationName);
  // const submit = (data, formRef) => {
  //   const { owner, level, licensePlate } = data;
  //
  //   Stalls.collection.insert(
  //     { owner, stallId, level, licensePlate },
  //     (error) => {
  //       if (error) {
  //         swal('Error', error.message, 'error');
  //       } else {
  //         swal('Success', 'Item added successfully', 'success');
  //         formRef.reset();
  //       }
  //     },
  //   );
  // };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={5}>
          <Col className="text-center"><h2>Payment</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <Row className="my-2">
                  <Col sm={8}><strong>Total Cost</strong></Col>
                  <Col sm={4}>$5</Col>
                </Row>
                <Row>
                  <TextField name="owner" label={false} placeholder="Full Name" />
                  {/* <HiddenField name="level" value={2} /> */}
                  <TextField name="licensePlate" label={false} placeholder="License Plate" />
                </Row>
                <Row>
                  <Col sm={8}>
                    <NumField name="test" label={false} placeholder="Credit Card" />
                  </Col>
                  <Col sm={4}>
                    <NumField name="cvv" placeholder="CVV" label={false} />
                  </Col>
                  <Col>
                    <DateField name="date" placeholder="MM/YY" format="MM/YY" label={false} />
                  </Col>
                </Row>
                <Row className="row g-0">
                  <Col sm={2}>
                    <TextField name="test01" label={false} placeholder="MM" />
                  </Col>
                  <Col sm={2}>
                    <NumField name="test02" label={false} placeholder="YY" />
                  </Col>
                </Row>
                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default Payment;
