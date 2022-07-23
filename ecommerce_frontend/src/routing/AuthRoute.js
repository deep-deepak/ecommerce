import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
/***
 * function to declare auth routing
 */

export class AuthRoute extends Component {
  render() {
    const {
      component: Component,
      authReducer,
      cartItems,
      ...rest
    } = this.props;
    const { userDetails } = this.props.authReducer;

    return (
      <Route
        {...rest}
        render={(props) =>
          !userDetails ? (
            <Component {...props} />
          ) : userDetails?.role === "seller" ? (
            <Redirect to="/seller" />
          ) : (
            <Redirect to={cartItems?.length > 0 ? "/shipping" : "/"} />
          )
        }
      />
    );
  }
}

const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
  cartItems: state.cartReducer?.cartItems,
});

export default connect(mapStateToProps)(AuthRoute);
