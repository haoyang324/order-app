import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// core components
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
// @material-ui icons
import Add from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";
import Close from "@material-ui/icons/Close";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import Remove from "@material-ui/icons/Remove";

import styles from "assets/jss/material-kit-pro-react/views/sectionCartStyle.jsx";

const useStyles = makeStyles(styles);

export default function SectionLatestOffers(props) {
  const classes = useStyles();
  const { cart, setCart, checkout } = props;

  const getQty = product => {
    const productInCart = cart.find(e => e._id === product._id);
    return productInCart ? productInCart.quantity : 1;
  };

  const handleQtyChange = (product, qty) => {
    let tempCart = [];
    Object.assign(tempCart, cart);
    const index = tempCart.findIndex(e => e._id === product._id);
    if (qty === 0) {
      tempCart.splice(index, 1);
    } else {
      tempCart[index]["quantity"] += qty;
      tempCart[index]["quantity"] < 1 && (tempCart[index]["quantity"] = 1);
    }

    localStorage.setItem("shoppingCartProducts", JSON.stringify(tempCart));
    setCart(tempCart);
  };

  const handleClearAll = () => {
    localStorage.setItem("shoppingCartProducts", JSON.stringify([]));
    setCart([]);
  };

  return (
    <div className={classes.section}>
      <div className={classes.container}></div>
      <h2>Shopping Cart</h2>

      {cart.length ? (
        cart.map(product => (
          <Grid
            container
            // md={10}
            // lg={8}
            spacing={3}
            style={{ margin: "auto" }}
            key={product._id}
          >
            <Grid item xs={4} sm={4} lg={4}>
              <CardMedia className={classes.cardMedia} image={product.imgURL} />
            </Grid>
            <Grid item xs={8} sm={8} lg={8}>
              <CardBody plain style={{ marginBottom: 80, marginTop: 0 }}>
                <h4 className={classes.cardTitle}>{product.name}</h4>
                <div>
                  <div style={{ float: "left" }}>
                    <span>Qty: </span>
                    <Button
                      onClick={() => handleQtyChange(product, -1)}
                      justIcon
                      simple
                      color="rose"
                    >
                      <Remove />
                    </Button>
                    <span>{getQty(product)}</span>
                    <Button
                      onClick={() => handleQtyChange(product, 1)}
                      justIcon
                      simple
                      color="rose"
                    >
                      <Add />
                    </Button>
                  </div>
                  <div style={{ float: "right", marginRight: 20 }}>
                    <span>${product.price}</span>
                    <Tooltip
                      title="Remove item"
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <Button
                        link
                        className={classes.actionButton}
                        onClick={() => handleQtyChange(product, 0)}
                      >
                        <Close />
                      </Button>
                    </Tooltip>
                  </div>
                </div>
              </CardBody>
            </Grid>
          </Grid>
        ))
      ) : (
        <h4> Your cart empty</h4>
      )}
      {cart.length ? (
        <div>
          <div style={{ float: "left" }}>
            <Button type="button" round onClick={() => handleClearAll()}>
              <ClearIcon className={classes.icons} /> Clear All
            </Button>
          </div>
          <div style={{ float: "right" }}>
            <Button
              type="button"
              color="warning"
              round
              onClick={() => checkout()}
            >
              <DoneAllIcon className={classes.icons} /> Checkout
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <Button
            type="button"
            color="info"
            round
            onClick={() => (window.location = "/")}
            style={{ float: "right" }}
          >
            <DoneAllIcon className={classes.icons} /> Get Something!
          </Button>
        </div>
      )}
    </div>
  );
}

SectionLatestOffers.propTypes = {
  cart: PropTypes.array,
  setCart: PropTypes.func,
  checkout: PropTypes.func
};
