import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// core components
import Header from "components/Header/Header.jsx";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";
// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import SectionOffers from "views/EcommercePage/Sections/SectionOffers.jsx";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import styles from "assets/jss/material-kit-pro-react/views/ecommerceStyle.js";

const useStyles = makeStyles(styles);

export default function EcommercePage() {
  const [products, setProducts] = React.useState([]);
  const [cart, setCart] = React.useState([]);
  const [, setNum] = React.useState(0);

  const addToCart = (product, qty) => {
    let tempCart = cart;
    const productInCart = tempCart.find(element => element._id === product._id);
    if (productInCart) {
      productInCart["quantity"] += qty;
    } else {
      tempCart.push({
        _id: product._id,
        title: product.title,
        imgURL: product.imgURL,
        price: product.pricing.$numberDecimal,
        quantity: qty
      });
    }
    setCart(tempCart);
    setNum(1); // Why it works? Badge won't update without it
    localStorage.setItem("shoppingCartProducts", JSON.stringify(tempCart));
  };

  const fetchProducts = () =>
    fetch(process.env.REACT_APP_REST_API_LOCATION + "/products", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.log(err));

  const fetchUserStatus = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      console.log("Found JWT");
      console.log(jwt);
      let statusOK = false;
      fetch(process.env.REACT_APP_REST_API_LOCATION + "/users/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt
        }
      })
        .then(res => {
          res.status === 200 && (statusOK = true);
          return res.json();
        })
        .then(data => {
          statusOK &&
            localStorage.setItem("userProfile", JSON.stringify(data)) &&
            console.log(data);
          console.log("Fetch user status res:");
          console.log(data);
        })
        .catch(err => console.log(err));
    } else {
      console.log("JWT not found");
    }
  };
  const getCartFromLocalStorage = () => {
    const productsInLocalStorage = JSON.parse(
      localStorage.getItem("shoppingCartProducts")
    );
    if (productsInLocalStorage) {
      setCart(productsInLocalStorage);
    }
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    fetchProducts();
    fetchUserStatus();
    getCartFromLocalStorage();
  }, []); //Probably not a good approach.

  const classes = useStyles();
  return (
    <div>
      <Header
        brand="Brand Name"
        links={<HeaderLinks dropdownHoverColor="info" />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 300,
          color: "info"
        }}
      />
      <Parallax
        image={require("assets/img/examples/clark-street-merc.jpg")}
        filter="dark"
        small
      >
        <div className={classes.container}>
          <GridContainer>
            <GridItem
              md={8}
              sm={8}
              className={classNames(
                classes.mlAuto,
                classes.mrAuto,
                classes.textCenter
              )}
            >
              <div className={classes.brand}>
                <h1 className={classes.title}>Index Page!</h1>
                {/* <h4>
                  Free global delivery for all products. Use coupon{" "}
                  <b>25summer</b> for an extra 25% Off
                </h4> */}
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <SectionOffers products={products} addToCart={addToCart} />
      </div>

      {/* <SectionBlog /> */}
    </div>
  );
}
