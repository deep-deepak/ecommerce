import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message";
import FormContainer from "../../components/FormContainers";
import { getUserInfo, updateUser } from "../../redux/actions/authActions";
import { USER_UPDATE_RESET } from "../../redux/types";

/***
 * edit users at admin side
 */
function UserEdit({ match, history }) {
  const userId = match.params.id;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [role, setRole] = useState(false);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfoReducer);
  const { error, loading, user } = userInfo;
  const userUpdate = useSelector((state) => state.userUpdateReducer);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = userUpdate;
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push("/admin/userlist");
    } else {
      if (!user?.first_name || user._id !== Number(userId)) {
        dispatch(getUserInfo(userId));
      } else {
        setName(user.first_name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
        setRole(user.role);
      }
    }
  }, [
    dispatch,
    history,
    successUpdate,
    user._id,
    user.email,
    user.first_name,
    user.isAdmin,
    userId,
    user.role,
  ]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: user._id, name, email, isAdmin, role }));
  };
  return (
    <div>
      <Link to="/admin/userlist">Go Back</Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            {/* Role as 'customer' or 'seller' */}
            <Form.Group controlId="role">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => setRole(e.target.value)}
              >
                <option selected={user.role}>{user.role}</option>
                {/* if the role of user is customer, it will display as customer and same for seller */}
                <option>
                  {user.role === "seller" ? "customer" : "seller"}
                </option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="isAdmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
}
export default UserEdit;
