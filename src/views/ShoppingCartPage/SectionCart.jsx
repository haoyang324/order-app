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
// @material-ui icons
import ClearIcon from "@material-ui/icons/Clear";
import DoneAllIcon from "@material-ui/icons/DoneAll";

import styles from "assets/jss/material-kit-pro-react/views/sectionCartStyle.jsx";

const useStyles = makeStyles(styles);

export default function SectionLatestOffers(props) {
  const classes = useStyles();
  const { cart, clearAll, checkOut } = props;

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
                <h4 className={classes.cardTitle}>{product.title}</h4>
                <div>
                  <span style={{ float: "left" }}>Qty: {product.quantity}</span>
                  <span style={{ float: "right", marginRight: 20 }}>
                    ${product.price}
                  </span>
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
            <Button type="button" round onClick={() => clearAll()}>
              <ClearIcon className={classes.icons} /> Clear All
            </Button>
          </div>
          <Button
            type="button"
            color="warning"
            round
            onClick={() => checkOut()}
            style={{ float: "right" }}
          >
            <DoneAllIcon className={classes.icons} /> Check Out
          </Button>
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
  clearAll: PropTypes.func,
  checkOut: PropTypes.func
};
