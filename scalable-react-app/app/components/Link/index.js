/**
 *
 * Link
 *
 */

import React, { PropTypes } from "react";

import styles from "./styles.css";

function Link({ link }) {
  return (
    <div className={styles.link}>
      <div className={styles.votingContainer}>
        <div className={styles.votingCount}>{link.voteCount}</div>
      </div>
      <div className={styles.detailContainer}>
        <div>
          <a href={link.url} className={styles.linkAnchor}>
            {link.url}
          </a>
        </div>
        <div className={styles.description}>{link.description}</div>
      </div>
    </div>
  );
}

Link.propTypes = {
  link: PropTypes.shape({
    voteCount: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }),
};

export default Link;
