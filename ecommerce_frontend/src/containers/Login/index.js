import React, { Component } from "react";
import { connect } from "react-redux";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import { login } from "../../redux/actions/authActions";

/***
 * login function for both customer and seller
 */
export class Login extends Component {
  state = {
    email: "",
    password: "",
  };
  // after submit the form clear the fields
  clearFields = () => {
    this.setState({
      email: "",
      password: "",
    });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  /**
   * Login user
   */
  handleSubmit = (e) => {
    e.preventDefault();

    this.props.login(this.state.email, this.state.password);
  };

  render() {
    return (
      <body className="bg-gradient">
        <div className="container">
          {/* <!-- Outer Row --> */}
          <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-12 col-md-9">
              <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                  {/* <!-- Nested Row within Card Body --> */}
                  <div className="row">
                    <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                    <div className="col-lg-6">
                      <div className="p-5">
                        <div className="text-center">
                          <h1 className="h4 text-gray-900 mb-4">
                            Welcome Back!
                          </h1>
                        </div>
                        <form className="user" onSubmit={this.handleSubmit}>
                          <div className="form-group">
                            <input
                              type="email"
                              name="email"
                              className="form-control form-control-user"
                              id="exampleInputEmail"
                              aria-describedby="emailHelp"
                              placeholder="Enter Email Address..."
                              value={this.state.email}
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="form-group">
                            <input
                              type="password"
                              name="password"
                              className="form-control form-control-user"
                              id="exampleInputPassword"
                              placeholder="Password"
                              value={this.state.password}
                              onChange={this.handleChange}
                              required
                            />
                          </div>

                          <button
                            type="submit"
                            className="btn btn-primary btn-user btn-block"
                          >
                            Login
                          </button>
                          <hr />
                          <a
                            href="index.html"
                            className="btn btn-google btn-user btn-block"
                          >
                            <i className="fab fa-google fa-fw"></i> Login with
                            Google
                          </a>
                          <a
                            href="index.html"
                            className="btn btn-facebook btn-user btn-block"
                          >
                            <i className="fab fa-facebook-f fa-fw"></i> Login
                            with Facebook
                          </a>
                        </form>
                        <hr />

                        <div className="text-center">
                          <Link className="small" to="/register">
                            Create an Account!
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>

      // <div>
      //   <form onSubmit={this.handleSubmit}>
      //     <center>
      //       <div>
      //         <Card style={{ width: "35rem" }} classNameName="m-3">
      //           <Card.Body>
      //             <h1>Login User</h1>
      //             <br />
      //             <div classNameName="form-group" style={{ textAlign: "left" }}>
      //               <label>Email </label>
      //               <input
      //                 classNameName="form-control"
      //                 type="text"
      //                 name="email"
      //                 placeholder="Email"
      //                 value={this.state.email}
      //                 onChange={this.handleChange}
      //                 required
      //               />
      //             </div>

      //             <br />
      //             <div classNameName="form-group" style={{ textAlign: "left" }}>
      //               <label>Password </label>
      //               <input
      //                 classNameName="form-control"
      //                 type="password"
      //                 name="password"
      //                 placeholder="Password"
      //                 value={this.state.password}
      //                 onChange={this.handleChange}
      //                 required
      //               />
      //             </div>

      //             <br />
      //             <div classNameName="form-group">
      //               <button
      //                 type="submit"
      //                 classNameName="form-control btn btn-outline-dark"
      //               >
      //                 Login
      //               </button>
      //             </div>
      //             <br />
      //             <div classNameName="form-group">
      //               <Link
      //                 to="/register"
      //                 classNameName="form-control btn btn-outline-dark"
      //               >
      //                 Register
      //               </Link>
      //             </div>
      //           </Card.Body>
      //         </Card>
      //       </div>
      //     </center>
      //   </form>
      // </div>
    );
  }
}
export default connect(null, { login })(Login);
