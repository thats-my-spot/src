import React from 'react';
import PropTypes from 'prop-types';
import * as Icon from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';

/** Renders a single row in the List Stall table. See pages/ListStall.jsx. */

const StallItem = ({ stall, collection }) => {
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
      <td className="text-center">
        <Button variant="danger" onClick={() => removeStall(stall)}><Icon.Trash /></Button>
      </td>
    </tr>
  );
};

// Require a document to be passed to this component.
StallItem.propTypes = {
  stall: PropTypes.shape({
    stallId: PropTypes.number,
    level: PropTypes.number,
    _id: PropTypes.string,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  collection: PropTypes.object.isRequired,
};

export default StallItem;
