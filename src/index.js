/*!

=========================================================
* Material Kit PRO React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router";

import "assets/scss/material-kit-pro-react.scss?v=1.8.0";

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

ReactDOM.render(
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
  </Router>,
  document.getElementById("root")
);
