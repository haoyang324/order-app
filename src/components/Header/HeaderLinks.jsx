// /* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { useHistory, Link } from "react-router-dom";
import { MyContext } from "Context.jsx";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import PersonIcon from "@material-ui/icons/Person";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-pro-react/components/headerLinksStyle.jsx";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  let context = React.useContext(MyContext);
  let badge = context.state.cart.length;
  let history = useHistory();
  const { dropdownHoverColor } = props;
  const classes = useStyles();

  const signOut = () => {
    fetch(process.env.REACT_APP_REST_API_LOCATION + "/users/me/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    })
      .then(res => res.json())
      .then(data => {
        localStorage.clear();
        context.updateUserStatus();
        console.log("Sign out res:");
        console.log(data);
        history.push("/");
      })
      .catch(err => console.log(err));
  };

  return (
    <List className={classes.list + " " + classes.mlAuto}>
      <ListItem className={classes.listItem}>
        <Button
          href="/admin/products"
          className={classes.navLink}
          color="transparent"
          target="_blank"
        >
          Admin
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="#pablo"
          className={classes.navLink}
          onClick={e => e.preventDefault()}
          color="transparent"
        >
          About us
        </Button>
      </ListItem>
      {localStorage.getItem("jwt") ? (
        <ListItem className={classes.listItem}>
          <CustomDropdown
            noLiPadding
            navDropdown
            left
            caret={false}
            hoverColor={dropdownHoverColor}
            // dropdownHeader="Dropdown Header"
            buttonText={
              // <img src={profileImage} className={classes.img} alt="profile" />
              <MyContext.Consumer>
                {context => (
                  <React.Fragment>
                    <PersonIcon />
                    {"Hi, " + context.state.userProfile["name"]}
                    {/* {window.innerWidth < 960 &&
                      "Hi, " + context.state.userProfile["name"]} */}
                  </React.Fragment>
                )}
              </MyContext.Consumer>
            }
            buttonProps={{
              className: classes.navLink + " " + classes.imageDropdownButton,
              color: "transparent"
            }}
            dropdownList={[
              <Link
                to="/profile"
                className={classes.dropdownLink}
                key={"profile"}
              >
                Profile
              </Link>,
              <Link
                to="/orders"
                className={classes.dropdownLink}
                key={"orders"}
              >
                Orders
              </Link>,
              <Link
                to="/"
                className={classes.dropdownLink}
                onClick={() => signOut()}
                key={"signout"}
              >
                Sign Out
              </Link>
            ]}
          />
        </ListItem>
      ) : (
        <ListItem className={classes.listItem}>
          <Button
            onClick={() => history.push("/login")}
            className={classes.navLink}
            color="transparent"
          >
            Login
          </Button>
        </ListItem>
      )}
      <ListItem className={classes.listItem}>
        <Link to="/shopping-cart">
          <Button
            color={window.innerWidth < 960 ? "info" : "white"}
            className={classes.navButton}
            round
          >
            <Badge badgeContent={badge} variant="dot" color="secondary">
              <ShoppingCart className={classes.icons} /> Cart
            </Badge>
          </Button>
        </Link>
      </ListItem>
    </List>
  );
}

HeaderLinks.defaultProps = {
  hoverColor: "primary"
};

HeaderLinks.propTypes = {
  dropdownHoverColor: PropTypes.oneOf([
    "dark",
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "rose"
  ])
};
