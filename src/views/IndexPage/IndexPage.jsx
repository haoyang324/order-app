import React from "react";
import { MyContext } from "Context.jsx";
// nodejs library that concatenates classes
import classNames from "classnames";
// core components
import Header from "components/Header/Header.jsx";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";
// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import SectionOffers from "views/IndexPage/SectionOffers.jsx";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import styles from "assets/jss/material-kit-pro-react/views/ecommerceStyle.js";

const useStyles = makeStyles(styles);

export default function EcommercePage() {
  const context = React.useContext(MyContext);
  const [products, setProducts] = React.useState([]);

  const addToCart = (product, qty) => {
    let tempCart = context.state.cart;
    const productInCart = tempCart.find(element => element._id === product._id);
    if (productInCart) {
      productInCart["quantity"] += qty;
    } else {
      tempCart.push({
        _id: product._id,
        name: product.name,
        imgURL: product.imgURL,
        price: product.price.$numberDecimal,
        quantity: qty
      });
    }
    context.updateCart(tempCart);
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

  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    fetchProducts();
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
