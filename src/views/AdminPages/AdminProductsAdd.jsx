import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import AdminNav from "components/Admin/AdminNav.jsx";
import Button from "components/CustomButtons/Button.js";

import defaultImage from "assets/img/image_placeholder.jpg";

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
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
}));

export default function AdminProductPage() {
  const classes = useStyles();

  const [file, setFile] = React.useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = React.useState(defaultImage);
  const [loading, setLoading] = React.useState(false);
  const [, setSuccess] = React.useState(false);

  const [productName, setProductName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");

  const timer = React.useRef();

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
  // const handleRemove = () => {
  //   setFile(null);
  //   setImagePreviewUrl(defaultImage);
  //   fileInput.current.value = null;
  // };
  const handleSubmit = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 4000);
    }
    const image = new FormData();
    image.append("image", file);
    let productData = {
      title: productName,
      description: description,
      pricing: price,
      imgURL: ""
    };
    fetch(process.env.REACT_APP_REST_API_LOCATION + "/image/upload", {
      method: "POST",
      headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
      body: image
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        productData.imgURL = data.imageUrl;
        return fetch(process.env.REACT_APP_REST_API_LOCATION + "/product/add", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt")
          },
          body: JSON.stringify(productData)
        });
      })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));
  };

  return (
    <div className={classes.root}>
      <AdminNav title="Products" />
      <main className={classes.content}>
        <div className={classes.toolbar} />

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
                  onChange={e => setProductName(e.target.value)}
                />
                <TextField
                  fullWidth
                  multiline
                  margin="normal"
                  id="outlined"
                  label="Description"
                  variant="outlined"
                  onChange={e => setDescription(e.target.value)}
                />
                <TextField
                  required
                  id="outlined-number"
                  label="Price"
                  type="number"
                  variant="outlined"
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
                  {file === null ? (
                    <Button color="info" onClick={() => handleClick()}>
                      {"Select image"}
                    </Button>
                  ) : (
                    <span>
                      <Button color="info" onClick={() => handleClick()}>
                        Change
                      </Button>
                      {/* <Button color="warning" onClick={() => handleRemove()}>
                        Remove
                      </Button> */}
                      <Button color="success" onClick={() => handleSubmit()}>
                        Submit
                      </Button>
                      {loading && (
                        <CircularProgress
                          size={36}
                          className={classes.buttonProgress}
                        />
                      )}
                    </span>
                  )}
                </div>
              </div>
            </Grid>
          </Grid>
        </form>
      </main>
    </div>
  );
}

AdminProductPage.propTypes = {
  container: PropTypes.any
};
