import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";

import Button from "components/CustomButtons/Button.js";

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  stepper: {
    padding: theme.spacing(3, 0, 5)
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

const steps = ["Shipping address", "Payment details", "Review your order"];

export default function Checkout({ ...params }) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [address, setAddress] = React.useState({
    name: "Haoyang",
    phone: "7785529180",
    address: "Parker Street",
    city: "Burnaby",
    province: "BC",
    zip: "V5C3E3",
    country: "Canada",
    save: false
  });
  const [payment, setPayment] = React.useState({
    cardName: "Haoyang Wang",
    cardNumber: "xxxx-xxxx-xxxx-1234",
    expDate: "04/2024",
    cvv: "000"
  });
  const [cart, setCart] = React.useState([]);

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm address={address} setAddress={setAddress} />;
      case 1:
        return <PaymentForm payment={payment} setPayment={setPayment} />;
      case 2:
        return <Review address={address} payment={payment} cart={cart} />;
      default:
        throw new Error("Unknown step");
    }
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    if (activeStep === 2) {
      placeOrder();
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const placeOrder = () => {
    const data = {
      date: new Date(),
      address: address,
      products: cart
    };

    // Place the order
    fetch(process.env.REACT_APP_REST_API_LOCATION + "/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      })
      .catch(err => console.log(err));

    // Save the address for further shopping
    if (address.save) {
      fetch(
        process.env.REACT_APP_REST_API_LOCATION + "/users/me/defaultaddress",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt")
          },
          body: JSON.stringify(address)
        }
      )
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
    }
  };

  React.useEffect(() => {
    setCart(params.location.state);
  }, [params.location.state]);

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <h2>Checkout</h2>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="info"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Place order" : "Next"}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}
