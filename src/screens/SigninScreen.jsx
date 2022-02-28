import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signin } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function SigninScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //props.location.search -> returns query string
  //1 represents second value in query string
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo, loading, error } = userSignIn;

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signin(email, password)); // signin is a function, so we need to call it with the parameter it accepts
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  return (
    <div className="signin">
      <form className="signin-card" onSubmit={handleSubmit}>
        <h1>Sign-In</h1>
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div className="signin-detail">
          <label htmlFor="email">Email or Mobile Phone Number</label>
          <input
            type="email"
            id="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="signin-detail">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="signin-button">
          <button type="submit">Sign-in 
          {loading && <LoadingBox></LoadingBox>}</button>
        </div>

        <div className="new-account">
          <div className="t-and-c">
            By continuing, you agree to our <a>Conditions of Use</a> and{" "}
            <a>Privacy Policy</a>
          </div>

          <div className="acc-login">
            <h5>New User?</h5>
            <Link
              className="register-redirect"
              to={`/register?redirect=${redirect}`}
            >
              Create New Account
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
