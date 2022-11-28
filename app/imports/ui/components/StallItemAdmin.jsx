import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';

/** Renders a single row in the List Stall (Admin) table. See pages/ListStallAdmin.jsx. */
const StallItemAdmin = ({ stall, collection }) => {
  const removeStall = (stallItem) => {
    console.log(`Removing stall number ${stallItem.stallId}`);
    collection.update(stallItem._id, {
      $set: { owner: 'empty', licensePlate: 'empty' },
    });
  };
  return (
    <tr>
      <td>{stall.stallId}</td>
      <td>{stall.level}</td>
      <td>{stall.owner}</td>
      <td>{stall.licensePlate}</td>
      <td>
        <Button variant="danger" onClick={() => removeStall(stall)}><Icon.Trash /></Button>
      </td>
    </tr>
  );
};

// Require a document to be passed to this component.
StallItemAdmin.propTypes = {
  stall: PropTypes.shape({
    stallId: PropTypes.number,
    owner: PropTypes.string,
    level: PropTypes.number,
    licensePlate: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  collection: PropTypes.object.isRequired,
};

export default StallItemAdmin;
