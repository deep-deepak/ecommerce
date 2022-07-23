import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message";
import { listUsers, deleteUser } from "../../../src/redux/actions/authActions";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import queryString from "querystring";

import AdminUserListPaginate from "./userPaginate";

/***
 * list all user at admin side
 */
function UserList({ history, location }) {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userListReducer);
  const { users, loading, error, pages } = userList;
  const userLogin = useSelector((state) => state.authReducer);
  const { userDetails } = userLogin;
  const userDelete = useSelector((state) => state.userDeleteReducer);
  const { success: successDelete } = userDelete;
  const { page } = queryString.parse(location.search?.replace("?", ""));

  const columns = [
    { title: "ID", field: "id" },
    // {
    //   title: "Avatar",
    //   render: (rowData) => (
    //     <Avatar
    //       maxInitials={1}
    //       size={40}
    //       round={true}
    //       name={rowData === undefined ? " " : rowData.first_name}
    //     />
    //   ),
    // },
    { title: "Name", field: "first_name" },
    { title: "Email", field: "email" },
    { title: "Role", field: "role" },
  ];

  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const handleSort = (field, order = "asc") => {
    setSortBy(field);
    setSortOrder(order);
  };
  useEffect(() => {
    if (userDetails && userDetails.isAdmin) {
      dispatch(listUsers({ sortBy, sortOrder, page }));
    } else {
      history.push("/login");
    }
  }, [dispatch, history, successDelete, userDetails, sortBy, sortOrder, page]);
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };
  return (
    <div className="m-5">
      <i className="fa-solid fa-users">Users</i>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table
          id="selectedColumn"
          className="table-bordered "
          cellspacing="0"
          width="100%"
        >
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
              <th>Admin</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.users?.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.first_name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  {user.isAdmin ? (
                    <i
                      class="far fa-check-circle"
                      style={{ color: "black" }}
                    ></i>
                  ) : (
                    <i
                      className="far fa-times-circle"
                      style={{ color: "black" }}
                    ></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant="" className="btn-sm">
                      <i className="fa-solid fa-pen"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="outlined-dark"
                    className="btn-sm"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className="fa fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <div>
        <AdminUserListPaginate pages={pages} page={page} />
      </div>
    </div>
  );
}

export default UserList;
