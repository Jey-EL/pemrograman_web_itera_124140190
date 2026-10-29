import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

function Card({ children }) {
  return <div className="card">{children}</div>;
}

Card.propTypes = {
  children: PropTypes.node,
};

export default Card;