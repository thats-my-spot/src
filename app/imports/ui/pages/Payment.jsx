import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import {
  AutoForm,
  ErrorsField,
  SubmitField,
  TextField,
  NumField,
} from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
// import { useTracker } from 'meteor/react-meteor-data';
// import { useParams } from 'react-router';
import { Stalls } from '../../api/stalls/Stalls';

const formSchema = new SimpleSchema({
  owner: String,
  licensePlate: String,
  creditCardNumber: {
    type: String,
    optional: true,
    min: 16,
    max: 16,
    // allowedValues: [0,1,2,3,4,5,6,7,8,9],
  },
  CVV: {
    type: String,
    min: 3,
    max: 3,
  },
  // date: Date,
  Month: {
    type: SimpleSchema.Integer,
    min: 1,
    max: 12,
  },
  Year: SimpleSchema.Integer,
});

let testVar;
let levelVar;

const bridge = new SimpleSchema2Bridge(formSchema);

const randomId = () => {
  const stall = Stalls.collection.findOne({ owner: { $eq: 'empty' } });
  if (stall === undefined) {
    return -1;
  }
  testVar = stall.stallId;
  levelVar = stall.level;
  return stall._id;
};

const Payment = () => {
  // On submit, insert the data.
  const submit = (data) => {
    const { owner, licensePlate } = data;

    Stalls.collection.update({ _id: randomId() }, { $set: { owner, licensePlate } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal(
        {
          title: 'Payment Successful',
          text: `Please Remember This Information\n\n Stall Number: ${testVar} at Level: ${levelVar} `,
          button: {
            text: 'Mahalo',
          },
        },
      )));
  };

  Meteor.subscribe(Stalls.availablePublicationName);

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
                    <NumField name="creditCardNumber" label={false} placeholder="Credit Card" />
                  </Col>
                  <Col sm={4}>
                    <NumField name="CVV" placeholder="CVV" label={false} />
                  </Col>
                </Row>
                <Row className="row g-0">
                  <Col sm={2}>
                    <TextField name="Month" label={false} placeholder="MM" />
                  </Col>
                  <Col sm={2}>
                    <NumField name="Year" label={false} placeholder="YY" />
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
