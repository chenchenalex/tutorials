/**
 *
 * LinkForm
 *
 */

import React, { PropTypes } from "react";
import classNames from "classnames";
import styles from "./styles.css";
import TextInput from "../TextInput";

class LinkForm extends React.Component {
  static propTypes = {
    submit: PropTypes.func,
  };

  state = {};

  submit = () => {
    this.props.submit();
  };

  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.overlay}>
        <div className={styles.linkForm}>
          <div className={styles.heading}>Add a link</div>
          <TextInput placeholder="URL" className={styles.input} />
          <TextInput placeholder="description" className={styles.input} />

          <div className={styles.actionContainer}>
            <div className={styles.button}>Cancel</div>
            <div className={styles.button} onClick={this.submit}>
              Log in
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LinkForm;
