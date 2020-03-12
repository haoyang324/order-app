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
import Tooltip from "@material-ui/core/Tooltip";
// @material-ui icons
// import Remove from "@material-ui/icons/Remove";
// import Add from "@material-ui/icons/Add";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import styles from "assets/jss/material-kit-pro-react/views/ecommerceSections/latestOffersStyle.js";

const useStyles = makeStyles(styles);

export default function SectionLatestOffers(props) {
  const classes = useStyles();
  const { products, addToCart } = props;
  // const [state, setState] = React.useState({});
  // const init = () => {
  //   products.forEach(element => {
  //     const key = "id_" + element._id;
  //     let tempArr = {};
  //     tempArr[key] = 0;
  //     setState(prevState => ({
  //       ...prevState,
  //       ...tempArr
  //     }));
  //   });
  // };
  // const handleRemove = product => {
  //   const key = "id_" + product._id;
  //   if (state[key] !== 0) {
  //     let tempState = state;
  //     tempState[key] = state[key] - 1;
  //     setState(tempState);
  //   }
  //   console.log(state);
  // };
  // const handleAdd = product => {
  //   const key = "id_" + product._id;
  //   let tempState = state;
  //   tempState[key] = state[key] + 1;
  //   tempState["data"] = state["data"] + 1;
  //   setState(tempState);
  //   console.log(state);
  // };
  // React.useEffect(() => {
  //   init();
  // }, [products]);
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <h2>Latest Offers</h2>
        <GridContainer>
          {products.map((product, index) => (
            <GridItem key={index} lg={4} md={4} sm={6}>
              <Card product plain>
                <CardHeader image plain>
                  <a href="#pablo">
                    <img src={product.imgURL} alt="..." />
                  </a>
                  <div
                    className={classes.coloredShadow}
                    style={{
                      backgroundImage: `url(${product.imgURL})`,
                      opacity: 1
                    }}
                  />
                </CardHeader>
                <CardBody className={classes.textCenter} plain>
                  <h4 className={classes.cardTitle}>{product.title}</h4>
                  <p className={classes.cardDescription}>
                    {product.description}
                  </p>
                </CardBody>
                <CardFooter plain>
                  <div className={classes.priceContainer}>
                    <span>${product.pricing.$numberDecimal}</span>
                  </div>
                  <div className={classNames(classes.stats, classes.mlAuto)}>
                    {/* <Button
                      onClick={() => handleRemove(product)}
                      justIcon
                      simple
                      color="rose"  
                    >
                      <Remove />
                    </Button>
                    <span>{state.id_5e64612051f6253f9a1032ee}</span>
                    <Button
                      onClick={() => handleAdd(product)}
                      justIcon
                      simple
                      color="rose"
                    >
                      <Add />
                    </Button> */}
                    <Tooltip
                      id="tooltip-top"
                      title="Add to cart"
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}
                      onClick={() => addToCart(product)}
                    >
                      <Button justIcon simple color="rose">
                        <ShoppingCartIcon />
                      </Button>
                    </Tooltip>
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
          ))}
        </GridContainer>
      </div>
    </div>
  );
}

SectionLatestOffers.propTypes = {
  products: PropTypes.any,
  addToCart: PropTypes.func
};
