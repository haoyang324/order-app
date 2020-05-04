/*eslint-disable*/
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// @material-ui/icons
// core components
import Header from "components/Header/Header.jsx";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import OrdersTable from "./OrdersTable.jsx";

import profilePageStyle from "assets/jss/material-kit-pro-react/views/profilePageStyle.js";

const useStyles = makeStyles(profilePageStyle);

export default function ProfilePage() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  return (
    <div>
      <Header
        brand="Brand Name"
        links={<HeaderLinks dropdownHoverColor="info" />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 80,
          color: "info",
        }}
      />
      <Parallax
        image={require("assets/img/examples/city.jpg")}
        filter="dark"
        className={classes.parallax}
      />
      <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <h2 className={classes.pageTitle}>Your Orders</h2>
            {/* PC */}
            <OrdersTable />
        </div>
      </div>
    </div>
  );
}
