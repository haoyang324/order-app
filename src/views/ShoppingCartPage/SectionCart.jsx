import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui icons

import styles from "assets/jss/material-kit-pro-react/views/ecommerceSections/latestOffersStyle.js";

const useStyles = makeStyles(styles);

export default function SectionLatestOffers(props) {
  const classes = useStyles();

  return (
    <div className={classes.section}>
      <div className={classes.container}></div>
    </div>
  );
}

SectionLatestOffers.propTypes = {};
