import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import SellerHome from "../containers/seller/Home";
import SellerLayout from "../containers/seller/sellerLayout/sellerLayout";

/***
 * function to declare seller routing
 */

export class AuthRoute extends Component {
  render() {
    const { component: Component, authReducer, ...rest } = this.props;
    const { userDetails } = this.props.authReducer;

    return (
      <Route
        {...rest}
        render={(props) =>
          userDetails ? (
            <SellerLayout>
              <Component {...props} />
            </SellerLayout>
          ) : userDetails?.role === "seller" ? (
            <Redirect to="/seller" />
          ) : (
            <Redirect to="/" />
          )
        }
      />
    );
  }
}

const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
});

export default connect(mapStateToProps)(AuthRoute);
