import React, { useState } from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, BoolField, ErrorsField, HiddenField, NumField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import SimpleSchema from 'simpl-schema';
import { Stuffs } from '../../api/stuff/Stuff';
import LoadingSpinner from '../components/LoadingSpinner';

const schema = new SimpleSchema({
  hasPass: {
    type: Boolean,
    required: false,
  },
  licensePlate: {
    type: String,
    max: 7,
    regEx: /[A-Z]{3} [0-9]{3}/,
  },
});

const bridge = new SimpleSchema2Bridge(schema);

/* Renders the EditStuff page for editing a single document. */
const EditStuff = () => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  const [redirectToReferer, setRedirectToRef] = useState(false);
  // console.log('EditStuff', _id);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Stuffs.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = Meteor.users.findOne(Meteor.userId());
    return {
      doc: document,
      ready: true,
    };
  }, [_id]);
  // console.log('EditStuff', doc, ready);
  // On successful submit, insert the data.
  const submit = (data) => {
    const { licensePlate, hasPass } = data;
    Meteor.users.update(Meteor.userId(), { $set: { 'profile.licensePlate': licensePlate, 'profile.hasPass': hasPass } }, (error) => {
      if (error) {
        swal('Error', error.message, 'error')
      } else { swal('Success', 'Item updated successfully', 'success')
      }
    )};
  };

  return ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Edit Stuff</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <Card>
              <Card.Body>
                <TextField name="licensePlate" />
                <BoolField name="hasPass" />
                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default EditStuff;






// import React from 'react';
// import swal from 'sweetalert';
// import { Card, Col, Container, Row } from 'react-bootstrap';
// import { AutoForm, BoolField, ErrorsField, HiddenField, SubmitField, TextField } from 'uniforms-bootstrap5';
// import { Meteor } from 'meteor/meteor';
// import { useTracker } from 'meteor/react-meteor-data';
// import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
// import { useParams } from 'react-router';
// import { Stuffs } from '../../api/stuff/Stuff';
// import LoadingSpinner from '../components/LoadingSpinner';
//
// const bridge = new SimpleSchema2Bridge(Stuffs.schema);
//
// /* Renders the EditProfile page for editing a single document. */
// const EditProfile = () => {
//   // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
//   const { _id } = useParams();
//   // console.log('EditStuff', _id);
//   // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
//   const { doc, ready } = useTracker(() => {
//     // Get access to Stuff documents.
//     // const subscription = Meteor.subscribe(Meteor.users);
//     // Determine if the subscription is ready
//     // const rdy = subscription.ready();
//     // Get the document
//     const document = Meteor.users.findOne(Meteor.userId());
//     return {
//       doc: document,
//       ready: true,
//     };
//   }, [_id]);
//   // console.log('EditStuff', doc, ready);
//   // On successful submit, insert the data.
//   const submit = (data) => {
//     const { licensePlate, hasPass } = data;
//     Meteor.users.update({ _id: Meteor.userId() }, { $set: { 'profile.licensePlate': licensePlate, 'profile.hasPass': hasPass } }, (error) => (error ?
//       swal('Error', error.message, 'error') :
//       swal('Success', 'Item updated successfully', 'success')));
//     // Stuffs.collection.update(_id, { $set: { name, quantity, condition } }, (error) => (error ?
//     //   swal('Error', error.message, 'error') :
//     //   swal('Success', 'Item updated successfully', 'success')));
//   };
//
//   return ready ? (
//     <Container className="py-3">
//       <Row className="justify-content-center">
//         <Col xs={5}>
//           <Col className="text-center"><h2>Edit Stuff</h2></Col>
//           <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
//             <Card>
//               <Card.Body>
//                 <TextField name="licensePlate" />
//                 <BoolField name="hasPass" />
//                 <SubmitField value="Submit" />
//                 <ErrorsField />
//                 <HiddenField name="owner" />
//               </Card.Body>
//             </Card>
//           </AutoForm>
//         </Col>
//       </Row>
//     </Container>
//   ) : <LoadingSpinner />;
// };
//
// export default EditProfile;
