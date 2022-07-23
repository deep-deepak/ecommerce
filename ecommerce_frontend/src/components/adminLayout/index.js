import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const AdminLayout = ({ children }) => {
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
            href="#"
          >
            <div className="sidebar-brand-icon rotate-n-15">
              <i className="fas fa-laugh-wink"></i>
            </div>
            <div className="sidebar-brand-text mx-3"> Admin</div>
          </a>

          {/* <!-- Divider --> */}
          <hr className="sidebar-divider my-0" />

          {/* <!-- Nav Item - Dashboard --> */}
          <li className="nav-item active">
            <Link className="nav-link" to="/admin/userlist">
              <i className="fa-solid fa-users"></i>
              <span>Manage users</span>
            </Link>
          </li>

          {/* <!-- Divider --> */}
          <hr className="sidebar-divider" />

          {/* <!-- Heading --> */}

          {/* <!-- Nav Item - Pages Collapse Menu --> */}
          <li className="nav-item active">
            <Link className="nav-link collapsed" to="/admin/productlist">
              <i className="fa-solid fa-basket-shopping"></i>
              <span>Manage Products</span>
            </Link>
          </li>

          <hr className="sidebar-divider" />

          <li className="nav-item active">
            <Link className="nav-link collapsed" to="/admin/orderlist">
              <i className="fa-solid fa-cart-shopping"></i>
              <span>Manage Orders</span>
            </Link>
          </li>

          {/* <!-- Divider --> */}
          <hr className="sidebar-divider d-none d-md-block" />

          {/* <!-- Sidebar Messag/</hr>e --> */}
        </ul>
        {/* <Container>
        <div class="bd-example">
          <div
            id="carouselExampleCaptions"
            class="carousel slide"
            data-ride="carousel"
          >
            <ol class="carousel-indicators">
              <li
                data-target="#carouselExampleCaptions"
                data-slide-to="0"
                class="active"
              ></li>
              <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
              <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img
                  src="/static/AdminStatic/realme.jpeg"
                  class="d-block w-100"
                  alt="..."
                />
                <div class="carousel-caption d-none d-md-block">
                  <h5>First slide label</h5>
                  <p>
                    Nulla vitae elit libero, a pharetra augue mollis interdum.
                  </p>
                </div>
              </div>
              <div class="carousel-item">
                <img
                  src="/static/AdminStatic/users.jpg"
                  class="d-block w-100"
                  alt="..."
                />
                <div class="carousel-caption d-none d-md-block">
                  <h5>Second slide label</h5>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
              </div>
              <div class="carousel-item">
                <img
                  src="/static/AdminStatic/realme.jpeg"
                  class="d-block w-100"
                  alt="..."
                />
                <div class="carousel-caption d-none d-md-block">
                  <h5>Third slide label</h5>
                  <p>
                    Praesent commodo cursus magna, vel scelerisque nisl
                    consectetur.
                  </p>
                </div>
              </div>
            </div>
            <a
              class="carousel-control-prev"
              href="#carouselExampleCaptions"
              role="button"
              data-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="sr-only">Previous</span>
            </a>
            <a
              class="carousel-control-next"
              href="#carouselExampleCaptions"
              role="button"
              data-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
        </div>
      </Container> */}
        <a className="scroll-to-top rounded" href="#page-top">
          <i className="fas fa-angle-up"></i>
        </a>
      </div>
      <div className="col-sm">{children}</div>
    </div>
  );
};
export default AdminLayout;
