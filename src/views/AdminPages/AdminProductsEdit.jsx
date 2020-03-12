import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Grid from "@material-ui/core/Grid";
import Slide from "@material-ui/core/Slide";
import Snackbar from "@material-ui/core/Snackbar";
import TextField from "@material-ui/core/TextField";

import AdminNav from "components/Admin/AdminNav.jsx";
import Button from "components/CustomButtons/Button.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";

// eslint-disable-next-line react/display-name
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1)
    },
    display: "flex"
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative"
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700]
    }
  },
  buttonProgress: {
    color: green[500],
    position: "fixed",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },
  snackBar: {
    position: "fixed",
    top: "10%",
    visibility: "none"
  }
}));

export default function AdminProductsEdit(props) {
  const classes = useStyles();

  const productID = props.match.params.id;

  const [file, setFile] = React.useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const [productName, setProductName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");

  const [dialogOn, setDialogOn] = React.useState(false);

  let fileInput = React.createRef();
  const handleImageChange = e => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setFile(file);
      setImagePreviewUrl(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    fileInput.current.click();
  };

  const submitProduct = productData =>
    fetch(process.env.REACT_APP_REST_API_LOCATION + "/products/" + productID, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify(productData)
    });

  const handleSubmit = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
    }

    let productData = {
      title: productName,
      description: description,
      pricing: price,
      imgURL: imagePreviewUrl
    };
    // Check if user uploaded a new image
    if (file) {
      const image = new FormData();
      image.append("image", file);
      fetch(process.env.REACT_APP_REST_API_LOCATION + "/images", {
        method: "POST",
        headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
        body: image
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          productData.imgURL = data.imageUrl;
          return submitProduct(productData);
        })
        .then(res => res.json())
        .then(data => {
          setMessage(data.success);
          setSuccess(true);
          setLoading(false);
          setTimeout(function() {
            window.location = "/admin/products";
          }, 1000);
        })
        .catch(err => console.log(err));
    } else {
      submitProduct(productData)
        .then(res => res.json())
        .then(data => {
          setMessage(data.success);
          setSuccess(true);
          setLoading(false);
          setTimeout(function() {
            window.location = "/admin/products";
          }, 1000);
        })
        .catch(err => console.log(err));
    }
  };
  const handleDelete = () =>
    fetch(process.env.REACT_APP_REST_API_LOCATION + "/products/" + productID, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    })
      .then(res => res.json())
      .then(data => {
        setMessage(data.success);
        setSuccess(true);
      })
      .catch(err => console.log(err));

  const fetchProducts = () =>
    fetch(process.env.REACT_APP_REST_API_LOCATION + "/products/" + productID, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(data => {
        const { title, description, pricing, imgURL } = data;
        setProductName(title);
        setDescription(description);
        setPrice(pricing.$numberDecimal);
        setImagePreviewUrl(imgURL);
      })
      .catch(err => console.log(err));

  React.useEffect(() => {
    fetchProducts();
  }, []); //Probably not a good approach.

  return (
    <div className={classes.root}>
      <AdminNav title="Products" />
      <main className={classes.content}>
        <div className={classes.toolbar} />
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

        <form action="">
          <Grid container spacing={3}>
            <Grid item sm={12} md={6}>
              <div>
                <TextField
                  required
                  fullWidth
                  margin="normal"
                  id="outlined"
                  label="Product Name"
                  variant="outlined"
                  value={productName}
                  onChange={e => setProductName(e.target.value)}
                />
                <TextField
                  required
                  fullWidth
                  multiline
                  margin="normal"
                  id="outlined"
                  label="Description"
                  variant="outlined"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
                <TextField
                  required
                  id="outlined-number"
                  label="Price"
                  type="number"
                  variant="outlined"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                />
              </div>
            </Grid>
            <Grid item sm={12} md={6}>
              <div className="fileinput text-center">
                <input
                  type="file"
                  onChange={handleImageChange}
                  ref={fileInput}
                />
                <div className={"thumbnail"}>
                  <img src={imagePreviewUrl} alt="..." />
                </div>
                <div>
                  <span>
                    <Button color="info" onClick={() => handleClick()}>
                      Change
                    </Button>
                    <Button color="success" onClick={() => handleSubmit()}>
                      Submit
                    </Button>
                    {loading && (
                      <CircularProgress
                        size={36}
                        className={classes.buttonProgress}
                      />
                    )}
                    <Button color="danger" onClick={() => setDialogOn(true)}>
                      Delete
                    </Button>
                  </span>
                </div>
              </div>
            </Grid>
          </Grid>
        </form>

        <Dialog
          classes={{
            root: classes.modalRoot,
            paper: classes.modal
          }}
          open={dialogOn}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => setDialogOn(false)}
          aria-labelledby="classic-modal-slide-title"
          aria-describedby="classic-modal-slide-description"
        >
          <DialogTitle
            id="classic-modal-slide-title"
            disableTypography
            className={classes.modalHeader}
          >
            <h4 className={classes.modalTitle}>Confirmation</h4>
          </DialogTitle>

          <DialogContent
            id="classic-modal-slide-description"
            className={classes.modalBody}
          >
            <p>Do you really want to delete this product?</p>
          </DialogContent>
          <DialogActions className={classes.modalFooter}>
            <Button onClick={() => setDialogOn(false)} color="secondary">
              Close
            </Button>
            <Button
              color="danger"
              onClick={() => {
                handleDelete();
                setDialogOn(false);
              }}
            >
              Delete it
            </Button>
          </DialogActions>
        </Dialog>
      </main>
    </div>
  );
}

AdminProductsEdit.propTypes = {
  container: PropTypes.any,
  match: PropTypes.object
};
