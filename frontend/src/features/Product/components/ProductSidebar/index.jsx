import { Box, Button, Hidden, makeStyles, Typography } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import StraightenIcon from '@material-ui/icons/Straighten';
import { Rating } from '@material-ui/lab';
import ButtonActive from 'components/component-custom/ButtonActive';
import PropTypes from 'prop-types';
import { useState } from 'react';
import ProductSilder from '../ProductSlider';
ProductSidebar.propTypes = {
  product: PropTypes.object,
};

const useStyle = makeStyles((theme) => ({
  root: {
    padding: '30px 0 0 40px',
    [theme.breakpoints.down('sm')]: {
      padding: '0',
    },
  },
  productName: {
    margin: '20px 0 10px',
    fontWeight: 'bold',
  },
  productPrice: {
    fontWeight: 'bold',
    fontSize: '24px',
    fontFamily: '"Archivo Narrow"',
  },
  title: {
    textTransform: 'uppercase',
    fontSize: '18px',
    color: '#313131',
    borderBottom: '1px solid #e5e5e5',
    display: 'block',
    paddingBottom: '10px',
    margin: '30px 0 10px',
    fontWeight: '500',
  },
  reviewDesc: {
    fontSize: '14px',
  },

  listSize: {
    display: 'flex',
    flexFlow: 'row wrap',
    padding: '0',
    listStyle: 'none',
  },

  size: {
    width: '50px',
    height: '50px',
    border: '1px solid #e9ecef',
    marginBottom: '-1px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#000',
      color: '#fff',
    },
  },

  buttonCart: {
    width: '80%',
    backgroundColor: '#000',
    color: '#fff',
    height: '50px',
    fontSize: '16px',
    fontWeight: '600',
    '&:hover': {
      backgroundColor: '#000',
      color: '#ccc',
      opacity: '0.7',
    },
  },
  buttonHeart: {
    width: '100%',
    height: '50px',
    border: '2px solid #000',
    marginTop: '10px',
    borderRadius: '0 !important',
  },
  subTitle: {
    fontSize: '14px',
    fontStyle: 'italic',
    textDecoration: 'underline',
  },
  subTitleIcon: {
    margin: '4px 4px 0 0',
  },
  buttonTitle: {
    fontSize: '16px',
    fontWeight: '600',
  },
  imgStyle: {
    width: '54px',
    border: '2px solid #ccc',
    marginRight: '10px',
    cursor: 'pointer',
    '&:hover': {
      border: '2px solid #2AC37D',
    },
  },
  containerButton: {
    margin: '15px 0 0 10px',
  },
  wishList: {
    fontWeight: 'bold',
  },
}));

function ProductSidebar({ product = {} }) {
  const classes = useStyle();
  const listDetail = product.productDetailList || [];

  return (
    <div className={classes.root}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="body2" component="h3">
          {product.categoryName}
        </Typography>
        <p>{product.rating}</p>
        <Rating name="read-only" value={product.rating} precision={0.5} readOnly size="medium" />
      </Box>

      <Box mt={2}>
        <Typography variant="h4" className={classes.productName}>
          {product.name}
        </Typography>
        <Typography variant="h5" className={classes.productPrice}>
          ${product.originalPrice}
        </Typography>
      </Box>

      <Hidden mdUp>
        <ProductSilder product={product} />
      </Hidden>

      <Hidden smDown>
        <Box>
          <Typography variant="p" className={classes.title} gutterBottom>
            Quick review
          </Typography>
          <Typography variant="p" className={classes.reviewDesc} gutterBottom>
            {product.description}
          </Typography>
        </Box>
      </Hidden>

      <Box>
        <Typography variant="p" className={classes.title} gutterBottom>
          Choose your styles
        </Typography>
        <Box>
          {listDetail?.map((productDetail) => (
            <img
              key={productDetail.id}
              src={productDetail.linkImg}
              className={classes.imgStyle}
              alt=""
            />
          ))}
        </Box>
      </Box>

      <Box>
        <Box position="relative">
          <Typography variant="p" className={classes.title} gutterBottom>
            Available sizes
          </Typography>
          <Box position="absolute" right="0" top={5} display="flex" alignItems="center">
            <StraightenIcon className={classes.subTitleIcon} />
            <Typography variant="p" component="a" position="absolute" className={classes.subTitle}>
              Size guide
            </Typography>
          </Box>
        </Box>

        <Box component="ul" className={classes.listSize}>
          {listDetail?.map((productDetail) => (
            <li key={productDetail.id} className={classes.size}>
              {productDetail.size}
            </li>
          ))}
        </Box>
      </Box>

      <Box mt={3}>
        <ButtonActive content="Add to cart" className={classes.btnActive} />
        <Button variant="outlined" className={classes.buttonHeart}>
          <Typography variant="button" component="p" className={classes.wishList}>
            Add to wishList
          </Typography>
          <FavoriteBorderIcon fontSize="large" />
        </Button>
      </Box>
    </div>
  );
}

export default ProductSidebar;
