import React from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router";
import IndexPage from "views/IndexPage/IndexPage.jsx";
// pages for admin
import AdminHome from "views/AdminPages/AdminHome.jsx";
import AdminOrdersPage from "views/AdminPages/AdminOrdersPage.jsx";
import AdminProductsPage from "views/AdminPages/AdminProductsPage.jsx";
import AdminProductsAdd from "views/AdminPages/AdminProductsAdd.jsx";
import AdminProductsEdit from "views/AdminPages/AdminProductsEdit.jsx";
// pages for users
import SignupPage from "views/SignupPage/SignupPage.jsx";
import LoginPage from "views/LoginPage/LoginPage.jsx";
import ProfilePage from "views/ProfilePage/ProfilePage.jsx";
import ShoppingCartPage from "views/ShoppingCartPage/ShoppingCartPage.jsx";
import CheckoutPage from "views/CheckoutPage/CheckoutPage.jsx";

var hist = createBrowserHistory();

export default function App() {
  const updateUserStatus = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      console.log("Found JWT");
      console.log(jwt);
      let status = false;
      fetch(process.env.REACT_APP_REST_API_LOCATION + "/users/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt
        }
      })
        .then(res => {
          status = res.status;
          return res.json();
        })
        .then(data => {
          if (status === 200) {
            localStorage.setItem("userProfile", JSON.stringify(data));
            console.log("Status 200. User profile:");
            console.log(data);
          } else {
            localStorage.removeItem("jwt");
            console.log("JWT invalid. JWT removed");
            localStorage.removeItem("userProfile");
          }
        })
        .catch(err => console.log(err));
    } else {
      console.log("JWT not found");
      localStorage.removeItem("userProfile");
    }
  };

  React.useEffect(() => {
    updateUserStatus();
  });

  return (
    <Router history={hist}>
      <Switch>
        <Route path="/" exact component={IndexPage} />

        <Route path="/admin/home" component={AdminHome} />
        <Route path="/admin/orders" component={AdminOrdersPage} />
        <Route path="/admin/products" exact component={AdminProductsPage} />
        <Route path="/admin/products/add" component={AdminProductsAdd} />
        <Route path="/admin/products/:id" component={AdminProductsEdit} />

        <Route path="/signup" component={SignupPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/shopping-cart" component={ShoppingCartPage} />
        <Route path="/checkout" component={CheckoutPage} />
      </Switch>
    </Router>
  );
}
