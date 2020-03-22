import React from "react";
import { MyContext } from "Context.jsx";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
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

export default function AddressForm(props) {
  let context = React.useContext(MyContext);
  const classes = useStyles();
  const { address, setAddress, handleSteps } = props;
  const [checked, setChecked] = React.useState(false);
  const [validate, setValidate] = React.useState(false);

  const handleChange = event => {
    event.persist();
    setAddress(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  };
  const handleToggle = () => {
    setAddress(prevState => ({
      ...prevState,
      save: !checked
    }));
    setChecked(!checked);
  };

  const submitAddress = () => {
    let completed = true;
    for (let x in address) {
      if (address[x] === "") {
        setValidate(true);
        completed = false;
      }
    }
    completed && handleSteps(1);
  };

  return (
    <React.Fragment>
      <h3> Shipping address</h3>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="name"
            name="name"
            label="Contact name"
            value={address.name}
            onChange={handleChange}
            error={address.name === "" && validate}
            fullWidth
            autoComplete="fname"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="phone"
            name="phone"
            label="Phone Number"
            value={address.phone}
            onChange={handleChange}
            error={address.phone === "" && validate}
            fullWidth
            autoComplete="lname"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label="Address line"
            value={address.address}
            onChange={handleChange}
            error={address.address === "" && validate}
            fullWidth
            autoComplete="billing address-line1"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            value={address.city}
            onChange={handleChange}
            error={address.city === "" && validate}
            fullWidth
            autoComplete="billing address-level2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="province"
            name="province"
            label="Province"
            value={address.province}
            onChange={handleChange}
            error={address.province === "" && validate}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Postal code"
            value={address.zip}
            onChange={handleChange}
            error={address.zip === "" && validate}
            fullWidth
            autoComplete="billing postal-code"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            value={address.country}
            onChange={handleChange}
            error={address.country === "" && validate}
            fullWidth
            autoComplete="billing country"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                onClick={handleToggle}
                color="secondary"
                name="saveAddress"
                value="no"
                checked={checked}
              />
            }
            label="Save this address for further shopping"
          />
        </Grid>
      </Grid>
      <div className={classes.buttons}>
        {context.state.userProfile.defaultAddress && (
          <Button
            color="warning"
            className={classes.button}
            onClick={() => {
              setAddress(context.state.userProfile.defaultAddress);
              setChecked(false);
            }}
          >
            Load your last address
          </Button>
        )}
        <Button
          variant="contained"
          color="info"
          onClick={submitAddress}
          className={classes.button}
        >
          Next
        </Button>
      </div>
    </React.Fragment>
  );
}
AddressForm.propTypes = {
  address: PropTypes.object,
  setAddress: PropTypes.func,
  handleSteps: PropTypes.func
};
