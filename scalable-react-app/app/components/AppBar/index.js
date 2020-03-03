/**
 *
 * AppBar
 *
 */

import React, { PropTypes } from "react";
import FontAwesome from "react-fontawesome";
import styles from "./styles.css";

function AppBar({ toggleDrawer }) {
  return (
    <div className={styles.appBar}>
      <div className={styles.iconButton} onClick={toggleDrawer}>
        <FontAwesome className={styles.icon} name="bars" />
      </div>
      <div className={styles.heading}>Coder Monthly</div>
      <div className={styles.linkContainer}>Log in</div>
    </div>
  );
}

AppBar.propTypes = PropTypes.shape({
  toggleDrawer: PropTypes.func.isRequired,
});

export default AppBar;
