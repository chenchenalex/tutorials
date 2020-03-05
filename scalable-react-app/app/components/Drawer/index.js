/**
 *
 * Drawer
 *
 */

import React, { PropTypes } from "react";

import styles from "./styles.css";
import classnames from "classnames";

function Drawer({
  items,
  selectItem,
  itemLabelAttr,
  itemKeyAttr,
  isDrawerOpen,
}) {
  const itemNodes = items.map(item => (
    <div
      className={styles.item}
      key={item[itemKeyAttr]}
      onClick={() => {
        selectItem(item);
      }}
    >
      {item[itemLabelAttr]}
    </div>
  ));

  return (
    <div
      className={classnames(styles.drawer, {
        [styles.drawerOpen]: isDrawerOpen,
      })}
    >
      {itemNodes}
    </div>
  );
}

Drawer.propTypes = {
  items: PropTypes.array.isRequired,
  selectItem: PropTypes.func.isRequired,
  itemLabelAttr: PropTypes.string.isRequired,
  itemKeyAttr: PropTypes.string.isRequired,
  isDrawerOpen: PropTypes.bool.isRequired,
};

export default Drawer;
