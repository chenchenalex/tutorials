/**
 *
 * Navigation
 *
 */

import React, { PropTypes } from "react";

import styles from "./styles.css";

function Navigation({ topics, selectTopic }) {
  return (
    <ul className={styles.navigation}>
      {topics.map(topic => (
        <li key={topic.name} onClick={() => selectTopic(topic.name)}>
          {topic.name}
        </li>
      ))}
    </ul>
  );
}

Navigation.proptypes = {
  topics: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
  ).isRequired,
  selectTopic: PropTypes.func.isRequired,
};

export default Navigation;
