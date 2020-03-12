import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// core components
import Header from "components/Header/Header.js";
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
  const [numOfType, setNumOfType] = React.useState(0);

  const addToCart = product => {
    let tempCart = cart;
    const productInCart = tempCart.find(element => element._id == product._id);
    if (productInCart) {
      productInCart["name"] = "testname";
      productInCart["quantity"] += 1;
    } else {
      tempCart.push({
        _id: product._id,
        title: product.title,
        imgURL: product.imgURL,
        price: product.pricing.$numberDecimal,
        quantity: 1
      });
    }
    setCart(tempCart);
    setNumOfType(cart.length);
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

  const getProductsFromLocalStorage = () => {
    const productsInLocalStorage = JSON.parse(
      localStorage.getItem("shoppingCartProducts")
    );
    if (productsInLocalStorage) {
      setCart(productsInLocalStorage);
      setNumOfType(productsInLocalStorage.length);
    }
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    fetchProducts();
    getProductsFromLocalStorage();
  }, []); //Probably not a good approach.

  const classes = useStyles();
  return (
    <div>
      <Header
        brand="Brand Name"
        links={<HeaderLinks dropdownHoverColor="info" numOfType={numOfType} />}
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
