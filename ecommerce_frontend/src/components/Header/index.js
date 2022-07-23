import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { connect } from "react-redux";
import { KEYS } from "../../config/constants";

import { useSelector } from "react-redux";
import { logout } from "../../redux/actions/authActions";
import SearchBox from "../../containers/searchBox/SearchBox";
import { LinkContainer } from "react-router-bootstrap";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
/**
 * styling of cart icon
 */
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

function Header({ authReducer, logout }) {
  /**
The authReducer normally looks at the authAction type field to decide what happens
**/
  const { userDetails } = authReducer;

  const cart = useSelector((state) => state.cartReducer);
  const { cartItems } = cart;

  return (
    <div>
      <div className="main-top">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"></div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <div className="right-phone-box">
                <p>
                  Call US :- <a href="#dee"> +91 9596140498</a>
                </p>
              </div>
              <div className="our-link">
                <ul>
                  {userDetails ? (
                    <li style={{ color: "white" }}>
                      Hello,{userDetails.first_name}
                    </li>
                  ) : (
                    ""
                  )}
                  <li>
                    <a href="#dee">My Account</a>
                  </li>
                  <li>
                    <a href="#dee">Our location</a>
                  </li>
                  <li>
                    <Link to="/contactus">Contact Us</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <header className="main-header">
        <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-default bootsnav ">
          {/* <div className="container "> */}
          <div className="navbar-header">
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#deenavbar-menu"
              aria-controls="navbars-rs-food"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="fa fa-bars"></i>
            </button>
            <Link className="navbar-brand" to="/">
              <img src="/static/images/logo.png" className="logo" alt="" />
            </Link>
          </div>
          {!userDetails?.isAdmin && (
            <li className="nav-item ">
              <SearchBox />
            </li>
          )}

          <div className="collapse navbar-collapse" id="navbar-menu">
            <ul
              className="nav navbar-nav ml-auto"
              data-in="fadeInDown"
              data-out="fadeOutUp"
            >
              {!userDetails?.isAdmin && userDetails?.role !== KEYS.seller && (
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
              )}
              {userDetails?.isAdmin && (
                <li className="nav-item">
                  <Link className="nav-link" to="/adminsidebar">
                    Home
                  </Link>
                </li>
              )}
              <li className="nav-item ">
                <Link className="nav-link" to="/about">
                  About Us
                </Link>
              </li>

              {/* if userdetails not found -> login page */}
              {!userDetails ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    <i className="far fa-user"></i>Login
                  </Link>
                </li>
              ) : (
                <>
                  {/* if logged in as seller show nav-item manage */}

                  {userDetails?.role === KEYS.seller && (
                    <li className="nav-item">
                      <Link className="nav-link" to="/seller">
                        Manage
                      </Link>
                    </li>
                  )}

                  {/* after logged sucessful -> show navitem logout */}

                  <li className="nav-item">
                    <Link onClick={logout} className="nav-link">
                      <i className="far fa-user"></i>Logout
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* show orders if customer logged in */}

          {userDetails?.role !== KEYS.seller && !userDetails?.isAdmin && (
            <li className="attr-nav">
              <ul>
                <li className="nav-item">
                  <Link className="nav-link" to="/orderlist">
                    <b>Orders</b>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">
                    {/* <Button aria-label="cart"> */}
                    <Badge
                      badgeContent={cartItems.length}
                      className="text-dark "
                    >
                      <ShoppingCartIcon />
                    </Badge>
                    {/* </Button> */}
                  </Link>
                </li>

                {/* <a href="/cart">
                      <i className="fa fa-shopping-bag"></i>
                      <span className="badge"></span>
                    </a> */}
              </ul>
            </li>
          )}
          {/* </div> */}
          {/* {userDetails && userDetails.isAdmin && (
            <NavDropdown title="Admin" id="adminmenu">
              <LinkContainer to="/admin/userlist">
                <NavDropdown.Item>Users</NavDropdown.Item>
              </LinkContainer>

              <LinkContainer to="/admin/productlist">
                <NavDropdown.Item>Products</NavDropdown.Item>
              </LinkContainer>

              <LinkContainer to="/admin/orderlist">
                <NavDropdown.Item>Orders</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          )} */}
        </nav>
      </header>
    </div>
  );
}

/**
The authReducer normally looks at the authAction type field to decide what happens

in class based function we can call reducers by connect(mapStateToProps)
**/
const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
});

export default connect(mapStateToProps, { logout })(Header);
