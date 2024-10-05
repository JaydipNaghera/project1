import React, { useState, useEffect } from "react";
import { Table, Form, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listMyOrders } from "../actions/orderActions";
import {
  getUserDetails,
  updateUserProfile,
  updateUserPassword,
} from "../actions/userActions";

import { USER_UPDATE_PASSWORD_RESET } from "../constants/userConstants";
import FormContainer from "../components/FormContainer";

const ChangePassword = ({ location, history }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {} = userUpdateProfile;

  const userUpdatePassword = useSelector((state) => state.userUpdatePassword);
  const { success } = userUpdatePassword;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PASSWORD_RESET });
        dispatch(listMyOrders());
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (confirmPassword !== password) {
      setMessage("Passwords do not match");
    } else {
      dispatch(updateUserPassword({ password }));
    }
  };

  return (
    <FormContainer>
      <h2>User Profile</h2>
      {message && <Message variant="danger">{message}</Message>}
      {}
      {success && <Message variant="success">Profile Updated</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="oldpassword">
            <Form.Label>old Password</Form.Label>
            <Form.Control
              type="oldpassword"
              placeholder="Enter oldpassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Col md={9}>
            <h2>My Orders</h2>
            {loadingOrders ? (
              <Loader />
            ) : errorOrders ? (
              <Message variant="danger">{errorOrders}</Message>
            ) : (
              <>
                <div className=" form-group" data-select2-id="55">
                  <label>Brand</label>
                  <select
                    className="form-control select2 select2-hidden-accessible"
                    data-select2-id="9"
                    tabindex="-1"
                    aria-hidden="true"
                  >
                    {orders.map((order) => {
                      return (
                        <option selected="selected" value={order._id}>
                          {order._id}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </>
            )}
          </Col>
          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      )}
    </FormContainer>
  );
};

export default ChangePassword;
