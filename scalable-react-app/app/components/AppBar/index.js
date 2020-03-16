/**
 *
 * AppBar
 *
 */

import React, { PropTypes } from "react";
import FontAwesome from "react-fontawesome";
import { Link } from "react-router";
import styles from "./styles.css";

function AppBar({ toggleDrawer }) {
  return (
    <div className={styles.appBar}>
      <div className={styles.iconButton} onClick={toggleDrawer}>
        <FontAwesome className={styles.icon} name="bars" />
      </div>
      <div className={styles.heading}>Coder Monthly</div>
      <div className={styles.linkContainer}>
        <Link to="/login" className={styles.link}>
          Log in
        </Link>
      </div>
    </div>
  );
}

AppBar.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
};

export default AppBar;
