import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Table, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message";
import { updateUserProfile } from "../../redux/actions/authActions";
import { getUserInfo } from "../../redux/actions/authActions";
import { USER_UPDATE_PROFILE_RESET } from "../../redux/types";
import { listMyOrders } from "../../redux/actions/orderActions";
import Paginate from "../paginate/Paginate";

/***
 * this page can be seen by both customer and seller,
 * customer can see only his ordered items,
 * and seller can see only those orders added by him.
 */
function OrderList({ history }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  // The authReducer normally looks at the authAction type field to decide what happens
  const userInfo = useSelector((state) => state.userInfoReducer);
  const { user } = userInfo;
  // The authReducer normally looks at the authAction type field to decide what happens
  const userLogin = useSelector((state) => state.authReducer);
  const { userDetails } = userLogin;
  // The authReducer normally looks at the authAction type field to decide what happens
  const userUpdateProfile = useSelector(
    (state) => state.userUpdateProfileReducer
  );
  // The authReducer normally looks at the authAction type field to decide what happens
  const { success } = userUpdateProfile;
  // The orderReducer normally looks at the orderAction type field to decide what happens
  const orderList = useSelector((state) => state.orderListMyReducer);
  // The orderReducer normally looks at the orderAction type field to decide what happens
  const { loading: loadingOrders, error: errorOrders, orders } = orderList;

  useEffect(() => {
    // console.log("user....", orders);
    // setEmail(userDetails.email);
    // setName(userDetails.first_name);

    if (!userDetails) {
      history.push("/login");
    } else {
      if (!user || !user.name || success || userInfo._id !== user._id) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserInfo("profile"));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userDetails, user, success, userInfo._id]);

  function submitHandler(e) {
    // console.log("submit is called");
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        updateUserProfile({
          //   id: user._id,
          name: name,
          email: email,
          password: password,
        })
      );
      setMessage("");
    }
  }
  return (
    <Row>
      <Col md={15}>
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <Table striped responsive className="table-sm m-4">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn btn-outline-dark -sm">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
            <Paginate />
          </Table>
        )}
      </Col>
    </Row>
  );
}

export default OrderList;
