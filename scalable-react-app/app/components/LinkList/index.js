/**
 *
 * LinkList
 *
 */

import React, { PropTypes } from "react";
import Link from "../Link";
import styles from "./styles.css";

function LinkList({ links, topicName }) {
  const linkNodes = links.map(link => <Link link={link} key={link.id} />);
  return (
    <div className={styles.linkList}>
      <h1>{topicName}</h1>
      {linkNodes}
    </div>
  );
}

LinkList.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }),
  ),
  topicName: PropTypes.string.isRequired,
};

export default LinkList;
