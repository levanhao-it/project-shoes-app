import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Typography, Button, makeStyles, IconButton, Hidden } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import StraightenIcon from '@material-ui/icons/Straighten';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import ButtonActive from 'components/component-custom/ButtonActive';
import ProductSilder from '../ProductSlider';
ProductSidebar.propTypes = {};

const useStyle = makeStyles((theme) => ({
  root: {
    padding: '30px 0 0 40px',
    [theme.breakpoints.down('sm')]: {
      padding: '0',
    }
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
    }
  },

  buttonCart: {
    width: '80%',
    backgroundColor: '#000',
    color: '#fff',
    height: '50px',
    fontSize: '16px',
    fontWeight: '600',
    '&:hover': {
      backgroundColor: "#000",
      color: '#ccc',
      opacity: '0.7'
    }
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
    margin: '15px 0 0 10px'
  },
  wishList: {
    fontWeight: 'bold'
  }
}));

function ProductSidebar(props) {
  const classes = useStyle();
  const [value, setValue] = useState(2);
  return (
    <div className={classes.root}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="body2" component="h3">
          Basketball
        </Typography>
        <Rating
          name="simple-controlled"
          value={value}
          readOnly
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      </Box>

      <Box mt={2}>
        <Typography variant="h4" className={classes.productName}>
          HARDEN VOL. 6 SHOES
        </Typography>
        <Typography variant="h5" className={classes.productPrice}>
          $140
        </Typography>
      </Box>
      
      <Hidden mdUp>
        <ProductSilder />
      </Hidden>
      
      <Hidden smDown>
        <Box>
          <Typography variant="p" className={classes.title} gutterBottom>
            Quick review
          </Typography>
          <Typography variant="p" className={classes.reviewDesc} gutterBottom>
            The Nike Free RN 2017 Men's Running Shoe weighs less than previous versions and features
            an updated knit material…
          </Typography>
        </Box>
      </Hidden>
      

      <Box>
        <Typography variant="p" className={classes.title} gutterBottom>
          Choose your styles
        </Typography>
        <Box>
          <img
            src="http://nouthemes.net/html/trueshoes/images/shoe/sidebar/1.jpg"
            className={classes.imgStyle}
            alt=""
          />
          <img
            src="http://nouthemes.net/html/trueshoes/images/shoe/sidebar/2.jpg"
            className={classes.imgStyle}
            alt=""
          />
          <img
            src="http://nouthemes.net/html/trueshoes/images/shoe/sidebar/3.jpg"
            className={classes.imgStyle}
            alt=""
          />
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

        <Box component='ul' className={classes.listSize}>
          <li className={classes.size}>4</li>
          <li className={classes.size}>4.5</li>
          <li className={classes.size}>5</li>
          <li className={classes.size}>5.5</li>
          <li className={classes.size}>6</li>
          <li className={classes.size}>6.5</li>
          <li className={classes.size}>7</li>
          <li className={classes.size}>7.5</li>
          <li className={classes.size}>8</li>
          <li className={classes.size}>8.5</li>
          <li className={classes.size}>9</li>
          <li className={classes.size}>9.5</li>
        </Box>
      </Box>

      <Box mt={3}>
          <ButtonActive content="Add to cart" className={classes.btnActive}/>
          <Button variant="outlined" className={classes.buttonHeart} >
            <Typography  variant='button' component='p' className={classes.wishList}>Add to wishList</Typography>
            <FavoriteBorderIcon fontSize="large" />
          </Button>
      </Box>
    </div>
  );
}

export default ProductSidebar;
