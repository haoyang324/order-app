import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import SectionCart from "views/ShoppingCartPage/SectionCart.jsx";
import Parallax from "components/Parallax/Parallax.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import shoppingCartStyle from "assets/jss/material-kit-pro-react/views/shoppingCartStyle.js";

const useStyles = makeStyles(shoppingCartStyle);

export default function ShoppingCartPage() {
  const [cart, setCart] = React.useState([]);

  const checkout = () => {};

  const getProductsFromLocalStorage = () => {
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
    getProductsFromLocalStorage();
  }, []); //Probably not safe

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
        image={require("assets/img/examples/bg2.jpg")}
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
              <h2 className={classes.title}>Shopping Page</h2>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <SectionCart cart={cart} setCart={setCart} checkout={checkout} />
        </div>
      </div>
    </div>
  );
}
