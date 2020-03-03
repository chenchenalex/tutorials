/*
 *
 * NavigationContainer
 *
 */

import React, { PropTypes } from "react";
import { connect } from "react-redux";
import selectNavigationContainer from "./selectors";
import Naviation from "../../components/Navigation";
import { requestTopics, selectTopic, toggleDrawer } from "./actions";

export class NavigationContainer extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    requestTopics: PropTypes.func.isRequired,
    selectTopic: PropTypes.func.isRequired,
    toggleDrawer: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.requestTopics();
  }

  render() {
    return <Naviation {...this.props} />;
  }
}

const mapStateToProps = selectNavigationContainer();

function mapDispatchToProps(dispatch) {
  return {
    requestTopics: () => dispatch(requestTopics()),
    selectTopic: topic => dispatch(selectTopic(topic)),
    toggleDrawer: () => dispatch(toggleDrawer()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavigationContainer);
