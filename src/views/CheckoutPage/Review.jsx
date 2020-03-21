import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Button from "components/CustomButtons/Button.js";

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(1, 0)
  },
  total: {
    fontWeight: 700
  },
  title: {
    marginTop: theme.spacing(2)
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  }
}));

export default function Review(props) {
  const { cart, address, payment, handleSteps, placeOrder } = props;
  const classes = useStyles();

  const getTotal = () => {
    let total = 0;
    cart.forEach(product => {
      total = total + product.price * product.quantity;
    });
    return total.toFixed(2);
  };

  return (
    <React.Fragment>
      <h3>Order summary</h3>
      <List disablePadding>
        {cart.map(product => (
          <ListItem className={classes.listItem} key={product.name}>
            <ListItemText
              primary={product.name}
              secondary={"Qty: ".concat(product.quantity)}
            />
            <Typography variant="body2">{"$".concat(product.price)}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            ${getTotal()}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <h3>Shipping</h3>
          <Typography gutterBottom>{address.name}</Typography>
          <Typography>
            {address.address + ", " + address.city + ", "}
          </Typography>
          <Typography gutterBottom>
            {address.province + ", " + address.country + ", " + address.zip}
          </Typography>
          <Typography gutterBottom>{"Phone: " + address.phone}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <h3>Payment details</h3>

          <Grid container>
            <Grid item xs={12}>
              <Typography gutterBottom>{payment.cardNumber}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{payment.cardName}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{payment.expDate}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <div className={classes.buttons}>
        <Button
          variant="contained"
          onClick={() => handleSteps(-1)}
          className={classes.button}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="info"
          onClick={placeOrder}
          className={classes.button}
        >
          Place Order
        </Button>
      </div>
    </React.Fragment>
  );
}

Review.propTypes = {
  cart: PropTypes.array,
  address: PropTypes.object,
  payment: PropTypes.object,
  handleSteps: PropTypes.func,
  placeOrder: PropTypes.func
};
