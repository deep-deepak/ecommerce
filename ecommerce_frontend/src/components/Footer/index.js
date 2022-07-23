import React from "react";
function Footer() {
  return (
    <div>
      <footer>
        <div className="footer-main">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-12 col-sm-12">
                <div className="footer-widget">
                  <h4>About ThewayShop</h4>
                  <p>
                    In the Ecom project, we bring together various disciplines
                    to go beyond the current knowledge to develop an
                    evidence-based behavioural and communication package for
                    health professionals and agencies throughout Europe in case
                    of major outbreaks of infectious diseases..
                  </p>
                  <ul>
                    <li>
                      <a href="#deep">
                        <i className="fab fa-facebook" aria-hidden="true"></i>{" "}
                      </a>
                    </li>
                    <li>
                      <a href="#deep">
                        <i className="fab fa-twitter" aria-hidden="true"></i>{" "}
                      </a>
                    </li>
                    <li>
                      <a href="#deep">
                        <i className="fab fa-linkedin" aria-hidden="true"></i>{" "}
                      </a>
                    </li>
                    <li>
                      <a href="#deep">
                        <i
                          className="fab fa-google-plus"
                          aria-hidden="true"
                        ></i>{" "}
                      </a>
                    </li>
                    <li>
                      <a href="#deep">
                        <i className="fa fa-rss" aria-hidden="true"></i>{" "}
                      </a>
                    </li>
                    <li>
                      <a href="#deep">
                        <i
                          className="fab fa-pinterest-p"
                          aria-hidden="true"
                        ></i>{" "}
                      </a>
                    </li>
                    <li>
                      <a href="#deep">
                        <i className="fab fa-whatsapp" aria-hidden="true"></i>{" "}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4 col-md-12 col-sm-12">
                <div className="footer-link">
                  <h4>Information</h4>
                  <ul>
                    <li>
                      <a href="/about">About Us</a>
                    </li>
                    <li>
                      <a href="#deep">Our Sitemap</a>
                    </li>
                    <li>
                      <a href="#deep">Terms &amp; Conditions</a>
                    </li>
                    <li>
                      <a href="#deep">Privacy Policy</a>
                    </li>
                    <li>
                      <a href="#deep">Delivery Information</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4 col-md-12 col-sm-12">
                <div className="footer-link-contact">
                  <h4>Contact Us</h4>
                  <ul>
                    <li>
                      <p>
                        <i className="fas fa-map-marker-alt"></i>Address: C - 98
                        C, 2nd Floor Phase 7, Industrial Area, Sahibzada Ajit
                        Singh Nagar, Punjab 160055
                      </p>
                    </li>
                    <li>
                      <p>
                        <i className="fas fa-phone-square"></i>Phone:{" "}
                        <a href="tel:+91-9596140498">+91 9596140498</a>
                      </p>
                    </li>
                    <li>
                      <p>
                        <i className="fas fa-envelope"></i>Email:{" "}
                        <a href="mailto:contactinfo@gmail.com">
                          abrahim@gmail.com
                        </a>
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="footer-copyright">
        <p className="footer-company">
          All Rights Reserved. &copy; 2021 <a href="#">ThewayShop</a> Design By
          : Abrahim
        </p>
      </div>
    </div>
  );
}
export default Footer;
