import React from 'react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stall table. See pages/ListStall.jsx. */
const StallItem = ({ stall }) => (
  <tr>
    <td>{stall.stallId}</td>
    <td>{stall.level}</td>
  </tr>
);

// Require a document to be passed to this component.
StallItem.propTypes = {
  stall: PropTypes.shape({
    stallId: PropTypes.number,
    owner: PropTypes.string,
    level: PropTypes.number,
  }).isRequired,
};

export default StallItem;
