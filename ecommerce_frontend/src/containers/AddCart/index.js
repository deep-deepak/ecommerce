import React, { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../../components/Message";
import { Redirect } from "react-router-dom";

import { addToCart, removeFromCart } from "../../redux/actions/cartAction";
import { constants } from "../../config";

/**
 * functionality of Cart where we show our added products in our cart and can add  quantity,
 */
function Cart({ history, location, match }) {
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();

  // The cartReducer normally looks at the cartAction type field to decide what happens
  const cart = useSelector((state) => state.cartReducer);
  const { cartItems } = cart;
  // to fetch data
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);
  // remove products from cart
  const removeFromCartHandler = (_id) => {
    dispatch(removeFromCart(_id));
  };

  const checkoutHandler = () => {
    history.push("/login?.redirect=");
  };

  return (
    <Row>
      <Col md={8}>
        <h4>Your Cart</h4>
        {cartItems.length === 0 ? (
          <Message variant="info">
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush m-3">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to="/">{item.name}</Link>
                  </Col>

                  <Col md={2}>{item.price}</Col>

                  <Col md={3}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      className="card border-dark"
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.stock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>

                  <Col md={1}>
                    <Button
                      type="button"
                      variant="light"
                      className="btn btn-outline-dark border-dark"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <Redirect to="/cart"></Redirect>{" "}
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>

      <Col md={4}>
        <Card className="card border-dark m-5">
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>
                Total ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
              </h3>

              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
          </ListGroup>

          <ListGroup.Item>
            <Button
              type="button"
              className="btn-block btb btn-outline-dark"
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
            >
              Proceed To Checkout
            </Button>
          </ListGroup.Item>
        </Card>
      </Col>
    </Row>
  );
}
export default withRouter(Cart);
