import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Container,
  Offcanvas,
  Nav,
  NavDropdown,
} from "react-bootstrap";
// import { Accordion } from 'react-bootstrap'
/***
 * side navbar for seller , where he has the following options
 * Manage Orders
 * Add Products
 * Edit Products
 * Delete Products
 */
const SellerLayout = ({ children }) => {
  return (
    <div className="row">
      <div id="wrapper" className="col-sm-2">
        {/* <!-- Sidebar --> */}
        <ul
          className="navbar-nav bg-dark sidebar sidebar-dark accordion"
          id="accordionSidebar"
        >
          {/* <!-- Sidebar - Brand --> */}
          <a
            className="sidebar-brand d-flex align-items-center justify-content-center"
            href="/static/AdminStatic/index.html"
          >
            <div className="sidebar-brand-icon rotate-n-15">
              <i className="fas fa-laugh-wink"></i>
            </div>
            <div className="sidebar-brand-text mx-3"> Seller</div>
          </a>

          {/* <!-- Divider --> */}
          <hr className="sidebar-divider my-0" />

          {/* <!-- Nav Item - Dashboard --> */}

          {/* <!-- Divider --> */}
          <hr className="sidebar-divider" />

          {/* <!-- Heading --> */}

          {/* <!-- Nav Item - Pages Collapse Menu --> */}
          <li className="nav-item">
            <a
              className="nav-link collapsed"
              href="#"
              data-toggle="collapse"
              data-target="#collapseThree"
              aria-expanded="true"
              aria-controls="collapseThree"
            >
              <i className="fa-solid fa-basket-shopping"></i>
              <span>Manage Products</span>
            </a>
            <div
              id="collapseThree"
              className="collapse"
              aria-labelledby="headingThree"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white py-3 collapse-inner rounded">
                <h6 className="collapse-header">Manage</h6>
                <Link className="collapse-item" to="/seller/addproduct">
                  Add Products
                </Link>
                <Link className="collapse-item" to="/seller/products">
                  Update Products
                </Link>
                <Link className="collapse-item" to="/seller/products">
                  Delete Products
                </Link>
              </div>
            </div>
          </li>

          <hr className="sidebar-divider" />

          <li className="nav-item active">
            <Link className="nav-link collapsed" to="/seller/order">
              <i className="fa-solid fa-cart-shopping"></i>
              <span>Manage Orders</span>
            </Link>
          </li>

          {/* <!-- Divider --> */}
          <hr className="sidebar-divider d-none d-md-block" />

          {/* <!-- Sidebar Messag/</hr>e --> */}
        </ul>

        <a className="scroll-to-top rounded" href="#page-top">
          <i className="fas fa-angle-up"></i>
        </a>
      </div>
      <div className="col-sm">{children}</div>
    </div>
  );
};

export default SellerLayout;
