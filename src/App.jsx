import { Snackbar } from "@mui/material";
import React, { useContext } from "react";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import { signOut } from "./actions/userActions";
import "./App.css";
import { SnackbarContext } from "./contexts/Snackbar";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import OrderDetailScreen from "./screens/OrderDetailScreen";
import OrderScreen from "./screens/OrderScreen";
import PaymentScreen from "./screens/PaymentScreen";
import ProductScreen from "./screens/ProductScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import SigninScreen from "./screens/SigninScreen";
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function App() {
  const { snackbar, closeSnackbar } = useContext(SnackbarContext);
  const cart = useSelector((state) => state.cart);
  const userSignIn = useSelector((state) => state.userSignIn);
  const { cartItems } = cart;
  const { userInfo } = userSignIn;

  const dispatch = useDispatch();

  const handleSignout = () => {
    dispatch(signOut());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <BrowserRouter>
      <Snackbar
        open={snackbar.open} // true | false
        autoHideDuration={3000}
        onClose={closeSnackbar}
      >
        <Alert onClose={closeSnackbar} severity={snackbar.type} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      <header className="header">
        <Link to="/">
          <img className="site-logo" src="/images/logo.png" alt="" />
        </Link>
        <div className="header-search">
          <i className="fa fa-search"></i>
          <input onSubmit={handleSubmit} type="text" name="" id="" />
        </div>

        <div className="header-right">
          {userInfo ? (
            <div className="dropdown">
              <Link to="#">
                {userInfo.name} <i className="fa fa-caret-down"></i>
              </Link>
              <ul className="dropdown-content">
                <li>
                  <Link
                    to="#signout"
                    className="sign-out"
                    onClick={handleSignout}
                  >
                    Sign Out
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/signin">Sign-In</Link>
          )}

          <Link to="/cart">
            <span className="cart">
              <FaCartPlus className="cart-icon" size="25" />
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </span>
          </Link>
        </div>
      </header>

      <div className="grid-container">
        <main className="app">
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen}></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentScreen}></Route>
          <Route path="/placeorder" component={OrderScreen}></Route>
          <Route path="/order/:id" component={OrderDetailScreen}></Route>
          <Route path="/" component={HomeScreen} exact></Route>
        </main>

        <footer className="footer">
          <Link to="/">
            <img className="footer-logo" src="/images/logo.png" alt="" />
          </Link>
        </footer>
      </div>
    </BrowserRouter>
  );
}
