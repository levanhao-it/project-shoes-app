import { Box, Grid, InputBase, makeStyles, Typography, withStyles } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';

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
    fontSize: '1.8rem',
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
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
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
    width: '240px',
    height: '240px',
  },
  title: {
    fontSize: '1.6rem',
    textTransform: 'uppercase',
    color: '#000',
    '& span': {
      fontWeight: 'bold',
    },
  },
  icon: {
    fontSize: '2.2rem',
    color: '#000',
    '&:hover': {
      color: '#2AC37D',
    },
  },
  parent: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '20px',
  },
  form: {
    marginTop: 'auto',
    marginBottom: '20px',
    width: '90px',
  },
  header: {
    marginBottom: '10px',
  },
}));

function CartItem(props) {
  const classes = useStyle();
  const { imageProduct, nameProduct, priceProduct, sizeProduct, colorProduct, quantityProduct } =
    props;

  const [quantity, setQuantity] = React.useState({ quantityProduct });
  const handleChange = (event) => {
    setQuantity(event.target.value);
  };

  return (
    <Box>
      <Grid container className={classes.root}>
        <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
          <img className={classes.img} src={imageProduct}></img>
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
          <FormControl className={classes.form}>
            <NativeSelect id="" value={quantity} onChange={handleChange} input={<BootstrapInput />}>
              <option value={0}>{quantityProduct}</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
            </NativeSelect>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CartItem;
