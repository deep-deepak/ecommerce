import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import AdminLayout from "../components/adminLayout";
export class AuthRoute extends Component {
  render() {
    const { component: Component, authReducer, ...rest } = this.props;
    const { userDetails } = this.props.authReducer;
    return (
      <Route
        {...rest}
        render={(props) =>
          userDetails ? (
            <AdminLayout>
              <Component {...props} />
            </AdminLayout>
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
