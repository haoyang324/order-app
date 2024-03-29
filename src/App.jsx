import React from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router";
import { MyProvider } from "Context.jsx";
import IndexPage from "views/IndexPage/IndexPage.jsx";
// pages for admin
import AdminOrdersPage from "views/AdminPages/Orders/AdminOrdersPage.jsx";
import AdminProductsPage from "views/AdminPages/AdminProductsPage.jsx";
import AdminProductsAdd from "views/AdminPages/AdminProductsAdd.jsx";
import AdminProductsEdit from "views/AdminPages/AdminProductsEdit.jsx";
import AdminCustomersPage from "views/AdminPages/Customers/AdminCustomersPage.jsx";
// pages for users
import SignupPage from "views/SignupPage/SignupPage.jsx";
import LoginPage from "views/LoginPage/LoginPage.jsx";
import ProfilePage from "views/ProfilePage/ProfilePage.jsx";
import OrderHistoryPage from "views/OrderHistoryPage/OrderHistoryPage.jsx";
import ShoppingCartPage from "views/ShoppingCartPage/ShoppingCartPage.jsx";
import CheckoutPage from "views/CheckoutPage/CheckoutPage.jsx";

var hist = createBrowserHistory();

export default function App() {
  return (
    <MyProvider>
      <Router history={hist}>
        <Switch>
          <Route path="/" exact component={IndexPage} />

          <Route path="/admin/orders" component={AdminOrdersPage} />
          <Route path="/admin/products" exact component={AdminProductsPage} />
          <Route path="/admin/products/add" component={AdminProductsAdd} />
          <Route path="/admin/products/:id" component={AdminProductsEdit} />
          <Route path="/admin/customers" exact component={AdminCustomersPage} />

          <Route path="/signup" component={SignupPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/orders" component={OrderHistoryPage} />
          <Route path="/shopping-cart" component={ShoppingCartPage} />
          <Route path="/checkout" component={CheckoutPage} />
        </Switch>
      </Router>
    </MyProvider>
  );
}
