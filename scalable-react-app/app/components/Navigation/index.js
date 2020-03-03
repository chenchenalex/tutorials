/**
 *
 * Navigation
 *
 */

import React, { PropTypes } from "react";

import styles from "./styles.css";
import AppBar from "../AppBar";

function Navigation({ topics, selectTopic, toggleDrawer }) {
  return (
    <div className={styles.navigation}>
      <AppBar toggleDrawer={toggleDrawer} />
      {topics.map(topic => (
        <div key={topic.name} onClick={() => selectTopic(topic.name)}>
          {topic.name}
        </div>
      ))}
    </div>
  );
}

Navigation.propTypes = {
  topics: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
  ).isRequired,
  selectTopic: PropTypes.func.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
};

export default Navigation;
