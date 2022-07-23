import React, { Component } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { KEYS } from "../config/constants";

/***
 * function to declare customer routing
 */

export class CustomerRoute extends Component {
  render() {
    const { children } = this.props;
    const { userDetails } = this.props.authReducer;

    if (userDetails?.role === KEYS.customer) {
      return children;
    } else {
      return <Navigate to="/" />
    }
  }
}

const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
});

export default connect(mapStateToProps)(CustomerRoute);
