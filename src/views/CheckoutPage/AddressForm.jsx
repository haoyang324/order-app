import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

export default function AddressForm(props) {
  const { address, setAddress } = props;

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
      save: !address.save
    }));
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
              />
            }
            label="Save this address for further shopping"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
AddressForm.propTypes = {
  address: PropTypes.object,
  setAddress: PropTypes.func
};
