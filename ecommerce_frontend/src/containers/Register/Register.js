import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../../redux/actions/authActions";
import { message, Button } from "antd";
import { Link } from "@mui/material";

const Register = ({ register }) => {
  const [name, setName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const navigate = useHistory();

  const clearFields = () => {
    setName("");
    setLastName("");
    setEmail("");
    setUsername("");
    setPassword("");
  };
  /**
   *
   * Register user
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    // axios
    //   .post(constants.API_URL +"register/", data)
    //   .then((res) => {
    //     console.log(res);
    //     alert('Register successfully')
    //     this.clearFields();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    const status = await register(name, email, username, password);
    if (status) {
      Redirect("/login", { registered: true });
      clearFields();
    }
    const info = () => {
      message.info("Registered Sucessfull!");
    };
  };
  return (
    <body className="bg-gradient">
      <div className="container">
        <div className="card o-hidden border-0 shadow-lg my-5">
          <div className="card-body p-0">
            {/* <!-- Nested Row within Card Body --> */}
            <div className="row">
              <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
              <div className="col-lg-7">
                <div className="p-5">
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">
                      Create an Account!
                    </h1>
                  </div>
                  <form className="user" onSubmit={handleSubmit}>
                    <div className="form-group row">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <input
                          type="text"
                          name="name"
                          className="form-control form-control-user"
                          id="exampleFirstName"
                          placeholder="First Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-sm-6">
                        <input
                          type="text"
                          name="last_name"
                          className="form-control form-control-user"
                          id="exampleLastName"
                          placeholder="Last Name"
                          value={last_name}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        name="email"
                        className="form-control form-control-user"
                        id="exampleInputEmail"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <input
                          type="text"
                          name="username"
                          className="form-control form-control-user"
                          id="text"
                          placeholder="Username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-sm-6">
                        <input
                          type="password"
                          name="password"
                          className="form-control form-control-user"
                          id="exampleRepeatPassword"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary btn-user btn-block"
                    >
                      Register Account
                    </button>
                    <hr />
                    <Link to="#" className="btn btn-google btn-user btn-block">
                      <i className="fab fa-google fa-fw"></i> Register with
                      Google
                    </Link>
                    <Link
                      to="#"
                      className="btn btn-facebook btn-user btn-block"
                    >
                      <i className="fab fa-facebook-f fa-fw"></i> Register with
                      Facebook
                    </Link>
                  </form>
                  <hr />

                  <div className="text-center">
                    <a className="small" href="/login">
                      Already have an account? Login!
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>

    // <div>
    //   <form onSubmit={handleSubmit}>
    //     <center>
    //       <div>
    //         <Card style={{ width: "35rem" }} classNameName="m-3">
    //           <Card.Body>
    //             <h1>Register</h1>
    //             <br />
    //             <div classNameName="form-group " style={{ textAlign: "left" }}>
    //               <label>Name </label>
    //               <input
    //                 classNameName="form-control"
    //                 type="text"
    //                 name="name"
    //                 placeholder="Enter your name"
    //                 value={name}
    //                 onChange={(e) => setName(e.target.value)}
    //                 required
    //               />
    //             </div>
    //             <br />
    //             <div classNameName="form-group" style={{ textAlign: "left" }}>
    //               <label>Email </label>
    //               <input
    //                 classNameName="form-control"
    //                 type="email"
    //                 name="email"
    //                 placeholder="Enter your email"
    //                 value={email}
    //                 onChange={(e) => setEmail(e.target.value)}
    //                 required
    //               />
    //             </div>
    //             <br />
    //             <div classNameName="form-group" style={{ textAlign: "left" }}>
    //               <label>Username </label>
    //               <input
    //                 classNameName="form-control"
    //                 type="text"
    //                 name="username"
    //                 placeholder="Enter your username"
    //                 value={username}
    //                 onChange={(e) => setUsername(e.target.value)}
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
    //                 placeholder="Enter your password"
    //                 value={password}
    //                 onChange={(e) => setPassword(e.target.value)}
    //                 required
    //               />
    //             </div>
    //             <br />
    //             <div classNameName="form-group">
    //               <button
    //                 type="submit"
    //                 classNameName="form-control btn btn-outline-dark"
    //               >
    //                 Register
    //               </button>
    //             </div>
    //           </Card.Body>
    //         </Card>
    //       </div>
    //     </center>
    //   </form>
    // </div>
  );
};
export default connect(null, { register })(Register);
