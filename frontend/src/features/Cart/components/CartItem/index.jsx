import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  InputBase,
  makeStyles,
  Typography,
  withStyles,
} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CloseIcon from '@material-ui/icons/Close';
import React, { useState } from 'react';

CartItem.propTypes = {};

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: '10px',
    },
  },
  input: {
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    fontSize: '18px',
    padding: '10px 26px 10px 36px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderColor: '#000',
      boxShadow: '0 0 0 2px rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyle = makeStyles((theme) => ({
  root: {
    border: '1px solid black',
    width: '100%',
    margin: '35px 0',
  },
  img: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: '16px',
    textTransform: 'uppercase',
    color: '#000',
    '& span': {
      fontWeight: 'bold',
    },
  },
  icon: {
    fontSize: '22px',
    color: '#000',
    '&:hover': {
      color: '#2AC37D',
    },
  },
  parent: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '20px',
    paddingLeft: '15px',
  },
  form: {
    marginTop: 'auto',
    marginBottom: '20px',
    width: '90px',
  },
  header: {
    marginBottom: '10px',
  },
  quantity: {
    fontSize: '18px',
    padding: '10px 0px 10px 20px',
  },
}));

function CartItem(props) {
  const classes = useStyle();
  const { imageProduct, nameProduct, priceProduct, sizeProduct, colorProduct, quantityProduct } =
    props;

  const [quantity, setQuantity] = useState(quantityProduct);
  // const handleInCreaseQuantity = (event) => {
  //   setQuantity(quantityProduct + 1);
  // };

  // const handleDecreaseQuantity = (event) => {
  //   setQuantity(quantityProduct - 1);
  // };

  return (
    <Box>
      <Grid container className={classes.root}>
        <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
          <img className={classes.img} src={imageProduct} alt="Day la anh"></img>
        </Grid>
        <Grid item xs={8} sm={8} md={8} lg={8} xl={8} className={classes.parent}>
          <Grid container className={classes.header}>
            <Grid item xs={11} sm={11} md={11} lg={11} xl={11}>
              <Typography className={classes.title}>
                <span>Product:</span> {nameProduct}
              </Typography>
              <Typography className={classes.title}>
                <span>Price: </span> {priceProduct}$
              </Typography>
            </Grid>
            <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
              <Box>
                <CloseIcon className={classes.icon} />
              </Box>
              <FavoriteBorderIcon className={classes.icon} />
              <Box></Box>
            </Grid>
          </Grid>
          <Typography className={classes.title}>
            <span>color: </span> {colorProduct}
          </Typography>
          <Typography className={classes.title}>
            <span>size: </span> {sizeProduct}
          </Typography>
          <Box className={classes.form}>
            <ButtonGroup variant="contained" color="inherit">
              <Button>-</Button>
              <Typography className={classes.quantity}>{quantity}</Typography>
              <Button>+</Button>
            </ButtonGroup>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CartItem;
