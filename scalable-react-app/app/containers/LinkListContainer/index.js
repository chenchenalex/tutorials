/*
 *
 * LinkListContainer
 *
 */

import React from "react";
import { connect } from "react-redux";
import selectLinkListContainer from "./selectors";
import LinkList from "../../components/LinkList";
import { requestLink } from "./actions";

export class LinkListContainer extends React.Component {
  static propTypes = {
    topicName: React.PropTypes.string.isRequired,
    requestLink: React.PropTypes.func.isRequired,
  };
  componentWillMount() {
    this.props.requestLink(this.props.topicName);
  }
  componentWillReceiveProps(newProps) {
    if (newProps.topicName !== this.props.topicName) {
      this.props.requestLink(newProps.topicName);
    }
  }
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return <LinkList {...this.props} />;
  }
}

const mapStateToProps = selectLinkListContainer();

function mapDispatchToProps(dispatch) {
  return {
    requestLink: topicName => dispatch(requestLink(topicName)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkListContainer);
