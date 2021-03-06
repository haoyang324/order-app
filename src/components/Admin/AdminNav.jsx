import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
// @material-ui/icons
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import PeopleIcon from "@material-ui/icons/People";

import adminNavStyle from "assets/jss/material-kit-pro-react/views/admin/adminNavStyle.jsx";

const useStyles = makeStyles(adminNavStyle);

export default function AdminNav(props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logout = () => {
    fetch(process.env.REACT_APP_REST_API_LOCATION + "/users/me/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    })
      .then(res => res.json())
      .then(() => {
        localStorage.clear();
        window.location = "/";
      })
      .catch(err => console.log(err));
  };

  const { title } = props;
  const classes = useStyles();

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List>
        <ListItem button onClick={() => (window.location.href = "/  ")}>
          <ListItemIcon>
            <ArrowBackIcon />
          </ListItemIcon>
          <ListItemText primary="Back To Store" />
        </ListItem>
      </List>
      <Divider />
      <List>
        {["Products", "Orders", "Customers"].map(text => (
          <ListItem
            button
            onClick={() =>
              (window.location.href = "/admin/" + text.toLowerCase())
            }
            selected={title === text}
            key={text}
          >
            <ListItemIcon>
              {text === "Products" ? (
                <LocalOfferIcon />
              ) : text === "Orders" ? (
                <AttachMoneyIcon />
              ) : (
                <PeopleIcon />
              )}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem button onClick={() => logout()}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>

      <nav className={classes.drawer} aria-label="mailbox folders">
        <div className={classes.root}>
          <nav className={classes.drawer} aria-label="mailbox folders">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden mdUp implementation="css">
              <Drawer
                // container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper
                }}
                ModalProps={{
                  keepMounted: true // Better open performance on mobile.
                }}
              >
                {drawer}
              </Drawer>
            </Hidden>
            <Hidden smDown implementation="css">
              <Drawer
                classes={{
                  paper: classes.drawerPaper
                }}
                variant="permanent"
                open
              >
                {drawer}
              </Drawer>
            </Hidden>
          </nav>
        </div>
      </nav>
    </div>
  );
}

AdminNav.propTypes = {
  title: PropTypes.string
};
