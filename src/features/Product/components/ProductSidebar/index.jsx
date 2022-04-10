import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Typography, Button } from '@material-ui/core'
import { Rating } from '@material-ui/lab';
import StraightenIcon from '@material-ui/icons/Straighten';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { makeStyles } from '@material-ui/styles';
ProductSidebar.propTypes = {
  
};

const useStyle = makeStyles((theme) => ({
  root: {
    padding: '30px 0 0 40px'
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
    paddingBottom:'10px',
    margin: '30px 0 10px',
    fontWeight: '500'
  },
  reviewDesc: {
    fontSize: '14px'
  },
  button: {
    width: `calc(100% / 5)`,
    height: '40px',
    borderRadius: '0',
    fontSize: '14px',
    fontWeight: '500',
    border: '1px solid #ccc',
    margin: '1px',
    '&:hover': {
      backgroundColor: '#2AC37D',
      color: '#fff',
      border: '1px solid #fff'
    },
  },
  buttonCart: {
    width: '80%',
    backgroundColor: '#000',
    color: '#fff',
    height: '50px',
    fontSize: '16px',
    fontWeight: '600'
  },
  buttonHeart: {
    width: 'calc(20% - 5px)',
    marginLeft: '5px',
    height: '50px',
    border: '2px solid #000',
  },
  subTitle: {
    fontSize: '14px',
    fontStyle: 'italic',
    textDecoration:'underline'
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
    "&:hover": {
      border: '2px solid #2AC37D'
    }
  },
}))

function ProductSidebar(props) {
  const classes = useStyle();
  const [value, setValue] = useState(2);
  return (
    <div className={classes.root}>
      <Box display='flex' justifyContent='space-between'>
      <Typography variant='h5' component='h3'>Basketball</Typography>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />

      </Box>
      
      <Box mt={2}>
        <Typography variant='h3' className={classes.productName}>HARDEN VOL. 6 SHOES</Typography>
        <Typography variant='h5' className={classes.productPrice}>$140</Typography>
      </Box>

      <Box>
        <Typography variant='p' className={classes.title} gutterBottom>Quick review</Typography>
        <Typography variant='p' className={classes.reviewDesc} gutterBottom>The Nike Free RN 2017 Men's Running Shoe weighs less than previous versions and features an updated knit material…</Typography>
      </Box>

      <Box>
        <Typography variant='p' className={classes.title} gutterBottom>Choose your styles</Typography>
        <Box>
          <img src='http://nouthemes.net/html/trueshoes/images/shoe/sidebar/1.jpg' className={classes.imgStyle} alt=""/>
          <img src='http://nouthemes.net/html/trueshoes/images/shoe/sidebar/2.jpg' className={classes.imgStyle} alt=""/>
          <img src='http://nouthemes.net/html/trueshoes/images/shoe/sidebar/3.jpg' className={classes.imgStyle} alt=""/>
        </Box>
      </Box>

      <Box>
        <Box position='relative'>
          <Typography variant='p' className={classes.title}  gutterBottom>Available sizes</Typography>
          <Box position="absolute" right='0' top={5} display='flex' alignItems='center'>
            <StraightenIcon className={classes.subTitleIcon} />
            <Typography variant='p' component='a' position='absolute' className={classes.subTitle}>Size guide</Typography>
          </Box>
        </Box>
        
        <Box>
          <Button variant='outlined' size='large' className={classes.button}>4</Button>
          <Button variant='outlined' size='large' className={classes.button}>4.5</Button>
          <Button variant='outlined' size='large' className={classes.button}>5</Button>
          <Button variant='outlined' size='large' className={classes.button}>5.5</Button>
          <Button variant='outlined' size='large' className={classes.button}>6</Button>
          <Button variant='outlined' size='large' className={classes.button}>6.5</Button>
        </Box>
      </Box>

      <Box mt={3}>
        <Button variant='contained' className={classes.buttonCart} size="large">
          <Box display='flex' justifyContent='space-between' width='100%'>
            <Typography variant='h5' className={classes.buttonTitle}>ADD TO CART</Typography>
            <ArrowRightAltIcon fontSize='large'/>
          </Box>
          </Button>
        <Button variant='outlined' className={classes.buttonHeart}>
          <FavoriteBorderIcon fontSize='large' />
        </Button>
      </Box>
      
    </div>
  );
}

export default ProductSidebar;