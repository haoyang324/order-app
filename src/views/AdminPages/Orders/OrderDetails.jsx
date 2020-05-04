import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";

import CancelIcon from "@material-ui/icons/Cancel";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import DoneAllIcon from "@material-ui/icons/DoneAll";

import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";

const useStyles = makeStyles({
  info: {
    margin: "20px"
  },
  adtions: {
    margin: "20px"
  }
});

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

const GST_RATE = 0.05;
const PST_RATE = 0.07;

export default function OrderDetails(props) {
  const classes = useStyles();
  const { order } = props;
  const [notes, setNotes] = React.useState(order.notes);
  const [success, setSuccess] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const updateOrder = (id, order) => {
    setSuccess(false);
    fetch(process.env.REACT_APP_REST_API_LOCATION + "/admin/orders/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify(order)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data.success);
        if (data.success) {
          setMessage(data.success);
          setSuccess(true);
        }
      })
      .catch(err => console.log(err));
  };

  const handleCancel = order => {
    order.status = "Canceled";
    updateOrder(order._id, order);
  };

  const handleNotes = order => {
    order.notes = notes;
    updateOrder(order._id, order);
  };

  const handleComplete = order => {
    order.status = "Completed";
    updateOrder(order._id, order);
  };

  return (
    <React.Fragment>
      <Snackbar
        open={success}
        autoHideDuration={2000}
        onClose={() => setSuccess(false)}
      >
        <SnackbarContent
          className={classes.snackBar}
          onClose={() => setSuccess(false)}
          message={
            <span>
              <b>{message}</b>
            </span>
          }
          color="success"
          icon="check"
        />
      </Snackbar>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Details
            </TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Qty</TableCell>
            <TableCell align="right">Unit</TableCell>
            <TableCell align="right">Sum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {order.products.map(product => (
            <TableRow key={product.name}>
              <TableCell component="th" scope="row">
                {product.name}
              </TableCell>
              <TableCell align="right">{product.quantity}</TableCell>
              <TableCell align="right">
                {product.price.$numberDecimal}
              </TableCell>
              <TableCell align="right">
                {ccyFormat(product.price.$numberDecimal * product.quantity)}
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={4}></TableCell>
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{order.value.$numberDecimal}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>GST</TableCell>
            <TableCell align="right">
              {ccyFormat(order.value.$numberDecimal * GST_RATE)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>PST</TableCell>
            <TableCell align="right">
              {ccyFormat(order.value.$numberDecimal * PST_RATE)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">
              {ccyFormat(
                order.value.$numberDecimal * (1 + GST_RATE + PST_RATE)
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Grid container spacing={1} className={classes.info}>
        <Grid item md={4} sm={6} xs={12}>
          <Typography variant="h6">Shipping Address</Typography>
          <Typography variant="body1">{order.address.name}</Typography>
          <Typography variant="body1">{order.address.address}</Typography>
          <Typography variant="body1">
            {order.address.city +
              ", " +
              order.address.province +
              ", " +
              order.address.zip}
          </Typography>
          <Typography variant="body1">{order.address.country}</Typography>
          <Typography variant="body1">{order.address.phone}</Typography>
        </Grid>
        <Grid item md={8} sm={8} xs={12}>
          <CustomInput
            labelText="Write some notes for this order..."
            formControlProps={{
              fullWidth: true,
              margin: "dense"
            }}
            inputProps={{
              multiline: true,
              rows: 6,
              defaultValue: notes,
              onChange: e => setNotes(e.target.value)
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1} className={classes.actions}>
        <Button simple color="danger" onClick={() => handleCancel(order)}>
          <CancelIcon />
          Cancel Order
        </Button>
        <Button simple color="success" onClick={() => handleComplete(order)}>
          <DoneAllIcon />
          Mark As Completed
        </Button>
        <Button simple color="info" onClick={() => handleNotes(order)}>
          <NoteAddIcon />
          Update Notes
        </Button>
      </Grid>
    </React.Fragment>
  );
}

OrderDetails.propTypes = {
  order: PropTypes.any
};
