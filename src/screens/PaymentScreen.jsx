import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import Checkout from "../components/Checkout";

export default function PaymentScreen(props) {
    const cart = useSelector(state => state.cart)
    const {shippingAddress}=cart
    if(!shippingAddress.address){
        props.history.push("/shipping")
    }
  const [paymentMethod, setPaymentMethod] = useState("Khalti");
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod))
    props.history.push("/placeorder")
  };

  return (
    <div>
      <Checkout step1 step2 step3 />
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <h1>Choose Your Payment Method</h1>
        </div>
        <div>
          <div className="payment-button">
            <input
              type="radio"
              id="khalti"
              value="Khalti"
              name="paymentMethod"
              required
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="khalti">Khalti</label>  {/*id and htmlFor should match*/}
          </div>
          <div>
            <input
              type="radio"
              id="paypal"
              value="PayPal"
              name="paymentMethod"
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="paypal">PayPal</label>
          </div>
          <div>
            <button className="primary block" type="submit">
              Continue
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
