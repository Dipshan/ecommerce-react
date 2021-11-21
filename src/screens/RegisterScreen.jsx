import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function RegisterScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(password!==confirmPassword){
      alert("Password and Confirm password does not match")
    }else{
      dispatch(register(name, email, password))
    }
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  return (
    <div className="form" onSubmit={handleSubmit}>
      <h1>Create New Account</h1>
      {loading && <LoadingBox></LoadingBox>}
      {error && <MessageBox variant="danger">{error}</MessageBox>}
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          placeholder="Enter Your Name"
          required
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter Your Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter Your Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="Enter Confirm Password"
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div>
        <label />
        <button type="submit" className="primary">
          Create My Account
        </button>
      </div>
      <div>
        <label />
        <div>
          Already have an account?{" "}
          <Link to={`/signin?redirect=${redirect}`}>Click here to Signin</Link>
        </div>
      </div>
    </div>
  );
}
