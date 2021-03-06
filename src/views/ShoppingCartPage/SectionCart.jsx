import React from "react";
import { MyContext } from "Context.jsx";
import { makeStyles } from "@material-ui/core/styles";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Tooltip from "@material-ui/core/Tooltip";
// @material-ui icons
import Add from "@material-ui/icons/Add";
import Close from "@material-ui/icons/Close";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import PersonIcon from "@material-ui/icons/Person";
import Remove from "@material-ui/icons/Remove";
import styles from "assets/jss/material-kit-pro-react/views/sectionCartStyle.jsx";
import imagesStyles from "assets/jss/material-kit-pro-react/imagesStyles.js";

import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  ...styles,
  ...imagesStyles,
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
    flexWrap: "wrap"
  },
  button: {
    [theme.breakpoints.down("xs")]: {
      width: "100%"
    }
  }
}));

export default function SectionCart() {
  const context = React.useContext(MyContext);
  const cart = context.state.cart;
  const classes = useStyles();

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
    context.updateCart(tempCart);
  };

  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <h2>Shopping Cart</h2>

        {cart.length ? (
          cart.map(product => (
            <Grid
              container
              key={product._id}
              className={classes.productContainer}
            >
              {/* Tablet and PC */}
              <Hidden xsDown>
                <Grid item xs={4} sm={4} lg={4}>
                  <img
                    className={classes.imgCard}
                    src={product.imgURL}
                    alt="Card-img"
                  />
                </Grid>
                <Grid item xs={8} sm={8} lg={8} style={{ margin: "auto" }}>
                  <CardBody plain style={{ marginBottom: 80, marginTop: 0 }}>
                    <h4 className={classes.cardTitle}>{product.name}</h4>
                    <div>
                      <div style={{ float: "left" }}>
                        <span>Qty:</span>
                        <Button
                          onClick={() => handleQtyChange(product, -1)}
                          justIcon
                          simple
                          size="sm"
                          color="rose"
                        >
                          <Remove />
                        </Button>
                        <span>{getQty(product)}</span>
                        <Button
                          onClick={() => handleQtyChange(product, 1)}
                          justIcon
                          simple
                          size="sm"
                          color="rose"
                        >
                          <Add />
                        </Button>
                      </div>
                      <div style={{ float: "right" }}>
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
                            size="sm"
                          >
                            <Close />
                          </Button>
                        </Tooltip>
                      </div>
                    </div>
                  </CardBody>
                </Grid>
              </Hidden>
              {/* Mobile */}
              <Hidden smUp>
                <Grid item xs={4} sm={4} lg={4}>
                  <img
                    className={classes.imgCard}
                    src={product.imgURL}
                    alt="Card-img"
                  />
                </Grid>
                <Grid item xs={8} sm={8} lg={8} style={{ margin: "auto" }}>
                  <CardBody plain>
                    <b className={classes.cardTitle}>{product.name}</b>
                    <div>
                      <span>${product.price}</span>
                    </div>
                  </CardBody>
                </Grid>
                <div className={classes.mlAuto}>
                  <span>Qty:</span>
                  <Button
                    onClick={() => handleQtyChange(product, -1)}
                    justIcon
                    simple
                    size="sm"
                    color="rose"
                  >
                    <Remove />
                  </Button>
                  <span>{getQty(product)}</span>
                  <Button
                    onClick={() => handleQtyChange(product, 1)}
                    justIcon
                    simple
                    size="sm"
                    color="rose"
                  >
                    <Add />
                  </Button>
                  <Button
                    link
                    simple
                    className={classes.actionButton}
                    onClick={() => handleQtyChange(product, 0)}
                    size="sm"
                  >
                    <Close />
                    Delete
                  </Button>
                </div>
              </Hidden>
            </Grid>
          ))
        ) : (
          <h4> Your cart empty</h4>
        )}
        {cart.length ? (
          <div className={classes.buttons}>
            {context.state.loggedIn ? (
              <Link
                to={{
                  pathname: "/checkout",
                  state: {
                    cart: cart,
                    guest: false
                  }
                }}
              >
                <Button
                  className={classes.button}
                  type="button"
                  color="warning"
                  round
                >
                  <DoneAllIcon className={classes.icons} /> Checkout
                </Button>
              </Link>
            ) : (
              <div>
                <Link to="/login">
                  <Button
                    className={classes.button}
                    type="button"
                    color="info"
                    round
                  >
                    <PersonIcon className={classes.icons} /> Login
                  </Button>
                </Link>
                <Link
                  to={{
                    pathname: "/checkout",
                    state: {
                      cart: cart,
                      guest: true
                    }
                  }}
                >
                  <Button
                    className={classes.button}
                    type="button"
                    color="info"
                    round
                  >
                    <DoneAllIcon className={classes.icons} /> Checkout As Guest
                  </Button>
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div>
            <Link to="/">
              <Button
                type="button"
                color="info"
                round
                style={{ float: "right" }}
              >
                <DoneAllIcon className={classes.icons} /> Get Something!
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
