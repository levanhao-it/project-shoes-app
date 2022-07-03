import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Typography, makeStyles, Button } from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import "./styles.scss";

Product.propTypes = {
  data: PropTypes.object.isRequired,
};

Product.defaultProps = {
  data: {},
};

const useStyles = makeStyles((theme) => ({
  box: {
    position: "relative",
    transition: "all 0.4s ease",
    "&:hover": {
      border: "1px solid #000",
    },
  },
  container: {
    position: "relative",
  },
  btn: {
    background: "#2AC37D",
    fontSize: "16px",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
    width: "100%",
    margin: "0 0 20px 0",
    "&:hover": {
      background: "linear-gradient(45deg, #5c5c5c 30%, #383838 90%)",
      transition: "all 0.3s ease-in-out",
    },
  },
  img: {
    cursor: "pointer",
    width: "100%",
    height: "260px",
  },

  imgChildren: {
    cursor: "pointer",
    height: "50px",
    width: "50px",
    paddingRight: "5px",
    "&:hover": {
      borderBottom: "2px solid #000",
    },
  },
  name: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#5b5b5b",
    lineHeight: "20px",
    cursor: "pointer",
    marginBottom: "10px",
    "&:hover": {
      color: "#2AC37D",
    },
  },
  favorite: {
    color: "#2AC37D",
    fontSize: "20px",
    position: "absolute",
    top: "20px",
    right: "18px",
    display: "block",
    width: "40px",
    height: "40px",
    zIndex: "2",
    backgroundColor: "#4d4d4d",
    webkitBorderRadius: "50%",
    mozBorderRadius: "50%",
    msBorderRadius: "50%",
    borderRadius: "50%",
    webkitTransition: "all 0.4s ease",
    mozTransition: "all 0.4s ease",
    transition: "all 0.4s ease",
    cursor: "pointer",

    "&:hover": {
      backgroundColor: "#2AC37D",
      color: "#fff",
    },
  },
  icon: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "#fff",
    fontSize: "20px",
  },
  price: {
    position: "absolute",
    left: "14px",
    bottom: "0px",
    backgroundColor: "#fff",
    padding: "3px 5px",
    display: "flex",
  },
  nameDesc: {
    color: "#767677",
    fontSize: "12px",
  },
  salePrice: {
    color: "#e32b2b",
    marginLeft: "8px",
  },
  banPrice: {
    textDecoration: "line-through",
  },
}));

function Product(props) {
  const { data } = props;
  const classes = useStyles();
  const [image, setImage] = useState(data.productDetailList[0].linkImg);
  const [priceSale, setPriceSale] = useState(
    data.productDetailList[0].salePrice
  );
  const handleMouseLeave = () => {
    setImage(data.productDetailList[0].linkImg);
  };

  const handleMouseOver = (img, salePrice) => {
    setImage(img);
    setPriceSale(salePrice);
  };
  return (
    <Box padding={1} className={`${classes.box} product-root`}>
      <Box minHeight="215px" className={classes.container}>
        <Box className={classes.favorite}>
          <FavoriteBorderIcon className={classes.icon} />
        </Box>

        <img src={image} alt={data.name} className={classes.img} />

        <Box
          component="span"
          fontSize="14px"
          mr={1}
          className={`${classes.price} product-root__price`}
        >
          {data.originalPrice > priceSale ? (
            <>
              <Typography
                variant="p"
                component="p"
                className={classes.banPrice}
              >
                {data.originalPrice}$
              </Typography>

              <Typography
                variant="p"
                component="p"
                className={classes.salePrice}
              >
                {priceSale}$
              </Typography>
            </>
          ) : (
            <Typography variant="p" component="p">
              {data.originalPrice}$
            </Typography>
          )}
        </Box>
      </Box>
      <Box>
        <Box>
          {data.productDetailList.map((productDetail) => {
            return (
              <img
                onMouseOver={() =>
                  handleMouseOver(
                    productDetail.linkImg,
                    productDetail.salePrice
                  )
                }
                onMouseLeave={handleMouseLeave}
                src={productDetail.linkImg}
                alt={data.name}
                width="30px"
                height="30px"
                className={classes.imgChildren}
              />
            );
          })}
        </Box>

        <Typography variant="p" className={classes.name}>
          {data.name}
        </Typography>

        <Typography variant="p" component="p" className={classes.nameDesc}>
          {data.categoryName}
        </Typography>
      </Box>
    </Box>
  );
}

export default Product;
