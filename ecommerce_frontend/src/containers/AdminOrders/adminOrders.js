import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message";
import { listOrders } from "../../redux/actions/orderActions";
import { listUsers } from "../../redux/actions/authActions";
import UserList from "../AdminuserList/userListScreen";
import SearchBox from "../searchBox/SearchBox";
import queryString from "querystring";
import AdminOrderPaginate from "./OrderPaginate";
/***
 * show orderlist at admin side
 */
function OrderListAdmin({ history, location }) {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderListReducer);
  const { loading, error, orders, pages } = orderList;

  const userLogin = useSelector((state) => state.authReducer);
  const { userDetails } = userLogin;

  const { page } = queryString.parse(location.search?.replace("?", ""));

  const columns = [
    { title: "ID", field: "_id" },
    { title: "NAME", field: "user" },
    { title: "DATE", field: "createdAt" },
    { title: "PRICE", field: "totalPrice" },
    { title: "PAID", field: "paidAt" },
    { title: "DELIVERED", field: "deliveredAt" },
  ];

  const [sortBy, setSortBy] = useState("_id");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    if (userDetails && userDetails.isAdmin) {
      dispatch(listOrders({ sortBy, sortOrder, page }));
    } else {
      history.push("/login");
    }
    console.log("..sort", { sortBy, sortOrder });
  }, [dispatch, history, userDetails, sortBy, sortOrder, page]);

  const handleSort = (field, order = "asc") => {
    setSortBy(field);
    setSortOrder(order);
  };

  return (
    <div className="m-5">
      {/* <SearchBox /> */}
      <i class="fa-solid fa-cart-shopping">orders</i>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table bordered>
          <thead className="table-dark">
            <tr>
              {columns.map(({ title, field }) => {
                return (
                  <th>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <div style={{ marginRight: 5 }}>{title}</div>
                      <div onClick={() => handleSort(field, "asc")}>
                        <i
                          class="fa-solid fa-arrow-up"
                          style={{
                            cursor: "pointer",
                            color:
                              sortBy === field && sortOrder === "asc"
                                ? "white"
                                : "black",
                          }}
                        ></i>
                      </div>

                      <div onClick={() => handleSort(field, "desc")}>
                        <i
                          class="fa-solid fa-arrow-down"
                          style={{
                            cursor: "pointer",
                            color:
                              sortBy === field && sortOrder === "desc"
                                ? "white"
                                : "black",
                          }}
                        ></i>
                      </div>
                    </div>
                  </th>
                );
              })}
            </tr>
            {/* <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>Total</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr> */}
          </thead>

          <tbody>
            {orders.orders?.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user.first_name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>

                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i
                      className="fas fa-circle-check"
                      style={{ color: "black" }}
                    ></i>
                  )}
                </td>

                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i
                      className="fas fa-circle-check"
                      style={{ color: "black" }}
                    ></i>
                  )}
                </td>

                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant="light" className="btn-sm">
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
          <br />
        </Table>
      )}
      <div>
        <AdminOrderPaginate pages={pages} page={page} />
      </div>
    </div>
  );
}

export default OrderListAdmin;
