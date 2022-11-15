import React from 'react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
const StallItemAdmin = ({ stall }) => (
  <tr>
    <td>{stall.stallId}</td>
    <td>{stall.side}</td>
    <td>{stall.level}</td>
    <td>{stall.owner}</td>
  </tr>
);

// Require a document to be passed to this component.
StallItemAdmin.propTypes = {
  stall: PropTypes.shape({
    stallId: PropTypes.number,
    owner: PropTypes.string,
    side: PropTypes.string,
    level: PropTypes.number,
  }).isRequired,
};

export default StallItemAdmin;
