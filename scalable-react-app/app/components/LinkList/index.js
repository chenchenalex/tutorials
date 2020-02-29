/**
 *
 * LinkList
 *
 */

import React, { PropTypes } from "react";

import styles from "./styles.css";

function LinkList({ links }) {
  const linkNodes = links.map(link => (
    <a href={link.url} key={link.id}>
      {link.description}
    </a>
  ));
  return <div className={styles.linkList}>{linkNodes}</div>;
}

LinkList.propTypes = {
  link: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }),
  ),
};

export default LinkList;
