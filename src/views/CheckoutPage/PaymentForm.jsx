import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "components/CustomButtons/Button.js";

const useStyles = makeStyles(theme => ({
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  }
}));
export default function PaymentForm(props) {
  const classes = useStyles();
  const { payment, setPayment, handleSteps } = props;

  const handleChange = event => {
    event.persist();
    setPayment(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  };

  return (
    <React.Fragment>
      <h3> Payment method</h3>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            name="cardName"
            label="Name on card"
            value={payment.cardName}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            name="cardNumber"
            label="Card number"
            value={payment.cardNumber}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            name="expDate"
            label="Expiry date"
            value={payment.expDate}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            name="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            value={payment.cvv}
            onChange={handleChange}
            fullWidth
          />
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
          onClick={() => handleSteps(1)}
          className={classes.button}
        >
          Next
        </Button>
      </div>
    </React.Fragment>
  );
}
PaymentForm.propTypes = {
  payment: PropTypes.object,
  setPayment: PropTypes.func,
  handleSteps: PropTypes.func
};
