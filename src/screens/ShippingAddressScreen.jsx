import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import Checkout from "../components/Checkout";

export default function ShippingAddressScreen(props) {

    const userSignIn=useSelector(state=>state.userSignIn)
    const {userInfo}=userSignIn
    const cart =useSelector(state=>state.cart)
    const {shippingAddress} = cart
    if(!userInfo){
        props.history.push("/signin")
    }

  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ fullName, address, city, postalCode, country })
    );
    props.history.push("/payment");
  };

  return (
    <div>
      <Checkout step1 step2></Checkout>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <h1>Shipping Address</h1>
        </div>
        <div>
          <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            id="fullname"
            placeholder="Enter Your Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            placeholder="Enter Your Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            placeholder="Enter Your city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="postalcode">Postal Code</label>
          <input
            type="text"
            id="postalcode"
            value={postalCode}
            placeholder="Enter Your Postal Code"
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            placeholder="Enter Your Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
