import React from 'react';
import { Card, Col, Container, Row, Alert } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import {
  AutoForm,
  ErrorsField,
  NumField,
  SelectField,
  SubmitField,
  TextField,
  AutoField,
  HiddenField,
} from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useTracker } from 'meteor/react-meteor-data';
import Landing from './Landing';
import NotFound from './NotFound';
import { Stalls } from '../../api/stalls/Stalls';
import LoadingSpinner from '../components/LoadingSpinner';
import { Stuffs } from '../../api/stuff/Stuff';
import {useParams} from "react-router";

const formSchema = new SimpleSchema({
  owner: String,
  level: Number,
  stallId: Number,
  licensePlate: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

const randomId = () => {

  const { _id } = useParams();

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
  const idNum = _.random(1, 15);
  console.log(Stalls.collection.find({}).fetch());

  return idNum;
};

const Payment = () => {
  // On submit, insert the data.
  const submit = (data) => {
    const { owner, level, stallId, licensePlate } = data;
    console.log(randomId());
    Stalls.collection.update({Stalls }, { $set: { owner, level, stallId, licensePlate } }, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Item updated successfully', 'success')));
    //formRef.reset();
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
                <NumField name="level" decimal={null} />
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
