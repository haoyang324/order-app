// /* eslint-disable */
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

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
  const { dropdownHoverColor, badgeNumber } = props;
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
        window.location = "/";
        localStorage.removeItem("shoppingCartProducts");
        localStorage.removeItem("jwt");
        console.log("Sign out res:");
        console.log(data);
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
      {!localStorage.getItem("jwt") ? (
        <ListItem className={classes.listItem}>
          <Button
            href="/login-page"
            className={classes.navLink}
            color="transparent"
          >
            Login
          </Button>
        </ListItem>
      ) : (
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
              <div>
                <PersonIcon />{" "}
                {window.innerWidth < 960 &&
                  "Hi, " + JSON.parse(localStorage.getItem("userProfile")).name}
              </div>
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
      )}
      <ListItem className={classes.listItem}>
        <Button
          href="/shopping-cart"
          color={window.innerWidth < 960 ? "info" : "white"}
          target="_blank"
          className={classes.navButton}
          round
        >
          <Badge badgeContent={badgeNumber} variant="dot" color="secondary">
            <ShoppingCart className={classes.icons} /> Cart
          </Badge>
        </Button>
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
  ]),
  badgeNumber: PropTypes.number
};
