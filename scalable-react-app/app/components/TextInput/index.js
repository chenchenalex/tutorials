/**
 *
 * TextInput
 *
 */

import React from "react";
import classnames from "classnames";
import styles from "./styles.css";

class TextInput extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  value = () => {
    return this.field.value;
  };
  render() {
    const { errorText } = this.props;

    const fieldError = errorText ? (
      <div className={styles.errorMessage}>{errorText}</div>
    ) : null;

    return (
      <div>
        <input
          type="text"
          className={classnames(styles.input, this.props.className, {
            [styles.error]: errorText,
          })}
          placeholder={this.props.placeholder}
          ref={f => {
            this.field = f;
          }}
        />
        {fieldError}
      </div>
    );
  }
}
TextInput.propTypes = {
  errorText: React.PropTypes.string.isRequired,
  placeholder: React.PropTypes.string.isRequired,
  className: React.PropTypes.string.isRequired,
};

export default TextInput;
