import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../../components/FormContainers";
import CheckoutSteps from "../../components/CheckoutSteps";
import { savePaymentMethod } from "../../redux/actions/cartAction";

/***
 * JSX format of payment form
 */
function Payment({ history }) {
  // The cartReducer normally looks at the cartAction type field to decide what happens
  const cart = useSelector((state) => state.cartReducer);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();

  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  //   const [PaymentMethod, setpaymentMethod] = useState("Stripe");

  if (!shippingAddress.address) {
    history.push("/shipping");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />

      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="PayPal or Credit Card"
              id="Paypal"
              value="Paypal"
              name="paymentMethod"
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>

          <Col>
            <Form.Check
              type="radio"
              label="Pay With Stripe"
              id="stripe"
              name="paymentMethod"
              value="Stripe"
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <br />
        <Button type="submit" variant="outline-dark">
          <i class="fas fa-arrow-right"></i>
        </Button>
      </Form>
    </FormContainer>
  );
}

export default Payment;
