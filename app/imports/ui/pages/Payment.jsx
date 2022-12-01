import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import {
  AutoForm,
  ErrorsField,
  SubmitField,
  TextField,
  HiddenField,
} from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
// import { useTracker } from 'meteor/react-meteor-data';
// import { useParams } from 'react-router';
import { Stalls } from '../../api/stalls/Stalls';

const formSchema = new SimpleSchema({
  owner: String,
  stallId: Number,
  licensePlate: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

const randomId = () => {

  // Get access to Stall documents.
  Meteor.subscribe(Stalls.adminPublicationName);
  // Determine if the subscription is ready
  // const rdy = subscription.ready();
  // Get the Stuff documents

  const stall = Stalls.collection.findOne({ owner: { $eq: 'empty' } });
  console.log(stall);
  if (stall === undefined) {
    return -1;
  }
  return stall.fetch().stallId;
};

const Payment = () => {
  // On submit, insert the data.
  const submit = (data) => {
    const { owner, level, stallId, licensePlate } = data;
    console.log(randomId());
    Stalls.collection.update({ stallId: { $eq: stallId } }, { $set: { owner, level, stallId, licensePlate } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));

  };

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
        <Col xs={5}>
          <Col className="text-center"><h2>Payment</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField name="owner" />
                <HiddenField name="stallId" value={randomId()} />
                <TextField name="licensePlate" />
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
