/**
 *
 * Navigation
 *
 */

import React, { PropTypes } from "react";

import styles from "./styles.css";

function Navigation({ topics }) {
  return (
    <ul className={styles.navigation}>
      {topics.map(topic => (
        <li>{topic.name}</li>
      ))}
    </ul>
  );
}

Navigation.proptypes = {
  topics: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    })
  ).isRequired
};

export default Navigation;
