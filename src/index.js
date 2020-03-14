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

// pages for admin
import AdminHome from "views/AdminPages/AdminHome.jsx";
import AdminOrdersPage from "views/AdminPages/AdminOrdersPage.jsx";
import AdminProductsPage from "views/AdminPages/AdminProductsPage.jsx";
import AdminProductsAdd from "views/AdminPages/AdminProductsAdd.jsx";
import AdminProductsEdit from "views/AdminPages/AdminProductsEdit.jsx";

// pages for this product
import AboutUsPage from "views/AboutUsPage/AboutUsPage.js";
import BlogPostPage from "views/BlogPostPage/BlogPostPage.js";
import BlogPostsPage from "views/BlogPostsPage/BlogPostsPage.js";
import ComponentsPage from "views/ComponentsPage/ComponentsPage.js";
import ContactUsPage from "views/ContactUsPage/ContactUsPage.js";
import EcommercePage from "views/EcommercePage/EcommercePage.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import LoginPage from "views/LoginPage/LoginPage.jsx";
import PresentationPage from "views/PresentationPage/PresentationPage.js";
import PricingPage from "views/PricingPage/PricingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.jsx";
import ProductPage from "views/ProductPage/ProductPage.js";
import SectionsPage from "views/SectionsPage/SectionsPage.js";
import ShoppingCartPage from "views/ShoppingCartPage/ShoppingCartPage.jsx";
import SignupPage from "views/SignupPage/SignupPage.jsx";
import ErrorPage from "views/ErrorPage/ErrorPage.js";

import IndexPage from "views/IndexPage/IndexPage.jsx";

var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/admin/home" component={AdminHome} />
      <Route path="/admin/orders" component={AdminOrdersPage} />

      <Route path="/admin/products/add" component={AdminProductsAdd} />
      <Route path="/admin/products/:id" component={AdminProductsEdit} />
      <Route path="/admin/products" component={AdminProductsPage} />

      <Route path="/signup" component={SignupPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/shopping-cart" component={ShoppingCartPage} />

      <Route path="/about-us" component={AboutUsPage} />
      <Route path="/blog-post" component={BlogPostPage} />
      <Route path="/blog-posts" component={BlogPostsPage} />
      <Route path="/components" component={ComponentsPage} />
      <Route path="/contact-us" component={ContactUsPage} />
      <Route path="/ecommerce-page" component={EcommercePage} />
      <Route path="/landing-page" component={LandingPage} />
      <Route path="/pricing" component={PricingPage} />
      <Route path="/product-page" component={ProductPage} />
      <Route path="/sections" component={SectionsPage} />
      <Route path="/error-page" component={ErrorPage} />
      <Route path="/presentation-page" component={PresentationPage} />
      <Route path="/" component={IndexPage} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
