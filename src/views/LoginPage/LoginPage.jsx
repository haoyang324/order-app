import React from "react";
import { useHistory } from "react-router-dom";
import { MyContext } from "Context.jsx";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
// core components
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import loginPageStyle from "assets/jss/material-kit-pro-react/views/loginPageStyle.js";

import image from "assets/img/bg7.jpg";

const useStyles = makeStyles(loginPageStyle);
export default function LoginPage() {
  let history = useHistory();
  let context = React.useContext(MyContext);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    let status = 0;
    let data = {
      email: email,
      password: password
    };

    fetch(process.env.REACT_APP_REST_API_LOCATION + "/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(res => {
        status = res.status;
        return res.json();
      })
      .then(data => {
        if (status === 200) {
          localStorage.setItem("jwt", data.token);
          context.updateUserStatus(data);
          // console.log("Login res: ");
          // console.log(data);
          history.push("/");
        } else {
          console.log(data.error);
        }
      })
      .catch(err => console.log(err));
  };

  const classes = useStyles();
  return (
    <div>
      <Header
        brand="Brand Name"
        links={<HeaderLinks dropdownHoverColor="info" />}
        absolute
        color="transparent"
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={6}>
              <Card>
                <form onSubmit={handleSubmit} className={classes.form}>
                  <CardHeader
                    color="primary"
                    signup
                    className={classes.cardHeader}
                  >
                    <h4 className={classes.cardTitle}>Login</h4>
                    <div className={classes.socialLine}>
                      <Button
                        justIcon
                        color="transparent"
                        className={classes.iconButtons}
                        onClick={e => e.preventDefault()}
                      >
                        <i className="fab fa-twitter" />
                      </Button>
                      <Button
                        justIcon
                        color="transparent"
                        className={classes.iconButtons}
                        onClick={e => e.preventDefault()}
                      >
                        <i className="fab fa-facebook" />
                      </Button>
                      <Button
                        justIcon
                        color="transparent"
                        className={classes.iconButtons}
                        onClick={e => e.preventDefault()}
                      >
                        <i className="fab fa-google-plus-g" />
                      </Button>
                    </div>
                  </CardHeader>
                  <p className={classes.description + " " + classes.textCenter}>
                    Or Be Classical
                  </p>
                  <CardBody signup>
                    <CustomInput
                      id="email"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        placeholder: "Email...",
                        type: "email",
                        onChange: e => setEmail(e.target.value),
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      id="pass"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        placeholder: "Password",
                        type: "password",
                        onChange: e => setPassword(e.target.value),
                        startAdornment: (
                          <InputAdornment position="start">
                            <Icon className={classes.inputIconsColor}>
                              lock_utline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off"
                      }}
                    />
                  </CardBody>
                  <div className={classes.textCenter}>
                    <Button type="submit" round color="primary" size="lg">
                      Login
                    </Button>
                  </div>
                </form>
                <Button href="/signup" simple color="primary" size="lg">
                  Signup
                </Button>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
