import React from 'react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const StallItem = ({ stall }) => (
  <tr>
    <td>{stall.stallId}</td>
    <td>{stall.side}</td>
    <td>{stall.level}</td>
  </tr>
);

// Require a document to be passed to this component.
StallItem.propTypes = {
  stall: PropTypes.shape({
    stallId: PropTypes.number,
    owner: PropTypes.string,
    side: PropTypes.string,
    level: PropTypes.number,
  }).isRequired,
};

export default StallItem;
