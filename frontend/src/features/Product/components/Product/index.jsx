import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, makeStyles, Button } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import './styles.scss'

Product.propTypes = {};

const useStyles = makeStyles((theme) => ({
  box: {
    position: 'relative',
    transition: 'all 0.4s ease',
    '&:hover': {
      border: '1px solid #000',
      
    },
    // '&:before': {
    //   content: '"',
    //   position: 'absolute',
    //   top: '-15px',
    //   left: '-15px',
    //   width: 'calc(100% + 30px)',
    //   height: 'calc(100% + 108px)',
    //   border: '1px solid #000',
    //   zIndex: '1000',
    //   visibility: 'hidden',
    //   opacity: '0',
    //   transform: 'scale(0.8, 0.8)',
    //   transition: 'all 0.3s ease',
    // },
  },
  container: {
    position: 'relative'
  },
  btn: {
    background: '#2AC37D',
    fontSize: '16px',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
    width: '100%',
    margin: '0 0 20px 0',
    '&:hover': {
      background: 'linear-gradient(45deg, #5c5c5c 30%, #383838 90%)',
      transition: 'all 0.3s ease-in-out',
    },

  },
  img: {
    cursor: 'pointer',
  },
  name: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#5b5b5b',
    lineHeight: '20px',
    cursor: 'pointer',
    marginBottom: '10px',
    '&:hover': {
      color: '#2AC37D',
    },
  },
  favorite: {
    color: '#2AC37D',
    fontSize: '20px',
    position: 'absolute',
    top: '20px',
    right: '18px',
    display: 'block',
    width: '40px',
    height: '40px',
    zIndex: '2',
    backgroundColor: '#4d4d4d',
    webkitBorderRadius: '50%',
    mozBorderRadius: '50%',
    msBorderRadius: '50%',
    borderRadius: '50%',
    webkitTransition: 'all 0.4s ease',
    mozTransition: 'all 0.4s ease',
    transition: 'all 0.4s ease',
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: '#2AC37D',
      color: '#fff',
    },
  },
  icon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: '#fff',
    fontSize: '20px',
  },
  price: {
    position: 'absolute',
    left: "14px",
    bottom: "0px",
    backgroundColor: '#fff',
    padding: '3px 5px'
  },
  nameDesc: {
    color: '#767677',
    fontSize: '12px'
  }
  
}));

function Product(props) {
  const { imageProduct, nameProduct, priceProduct } = props;
  const classes = useStyles();
  return (
    <Box padding={1} className={`${classes.box} product-root`}>
      <Box minHeight="215px" className={classes.container}>
        <Box className={classes.favorite}>
          <FavoriteBorderIcon className={classes.icon} />
        </Box>

        <img src={imageProduct} alt={nameProduct} width="100%" className={classes.img} />

        <Box component="span" fontSize="14px" mr={1} className={`${classes.price} product-root__price`}>
          <Typography variant="p" component="p">
              {priceProduct} $
          </Typography>
        </Box>
      <Box>

    </Box>
      </Box>
      {/* <Button className={classes.btn}>Add to cart</Button> */}
      <Box>
        <Typography variant="p" className={classes.name}>
          {nameProduct}
        </Typography>

        <Typography variant='p' component="p" className={classes.nameDesc}>
            Men's Running
        </Typography>

      </Box>
    </Box>
  );
}

export default Product;
