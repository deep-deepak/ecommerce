import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader/Loader";
import Message from "../../../components/Message";
import { SellerlistOrders } from "../../../redux/actions/orderActions";
import { KEYS } from "../../../config/constants";

/***
 * function for the orders received from customers
 */
function SellerOrder({ history }) {
  const dispatch = useDispatch();
  // The orderReducer normally looks at the orderAction type field to decide what happens
  const orderList = useSelector((state) => state.sellerorderListReducer);
  const { loading, error, orders } = orderList;
  // The authReducer normally looks at the authAction type field to decide what happens
  const userLogin = useSelector((state) => state.authReducer);
  const { userDetails } = userLogin;
  // fetch data from remote location
  useEffect(() => {
    if (userDetails && userDetails.role === KEYS.seller) {
      dispatch(SellerlistOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userDetails]);
  return (
    <div className="m-3">
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>Total</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user.first_name}</td>
                <td>{order.createdAt?.substring(0, 10)}</td>
                <td>{order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order?.paidAt?.substring(0, 10)
                  ) : (
                    <i
                      class="far fa-times-circle"
                      style={{ color: "black" }}
                    ></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order?.deliveredAt?.substring(0, 10)
                  ) : (
                    <i
                      class="far fa-times-circle"
                      style={{ color: "black" }}
                    ></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant="" className="btn-sm btn btn-outline-dark">
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
export default SellerOrder;
