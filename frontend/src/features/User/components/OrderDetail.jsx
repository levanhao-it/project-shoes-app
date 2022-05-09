import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import ButtonActive from 'components/component-custom/ButtonActive';
import PropTypes from 'prop-types';
import React from 'react';

OrderDetail.propTypes = {
  order: PropTypes.object,
};

 const PRODUCT_LIST = [
   {
     id: 1,
     name: 'Macbook pro 2022',
     color: 'black',
     size: '6.5',
     quantity: 1,
     price: '1200.000',
    },
    {
      id: 2,
      name: 'Macbook pro 2022',
      color: 'black',
      size: '6.5',
      quantity: 1,
      price: '1200.000',
     }
 ]

const useSytle = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    overflow: 'hidden'
  },

  titleDate: {
    color: '#999'
  },
  
  listProduct: {
    listStyle: 'none',
    padding: theme.spacing(2, 0),
    borderTop: '1px solid #ccc',
    borderBottom: '1px solid #ccc',
    margin: theme.spacing(1, 0)
  },

  product: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(0.5, 0)
  },

  boxPrice: {
    textAlign: 'right'
  },

  productLeft: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    flex: '1'
  },

  boxInfo: {
    marginLeft: theme.spacing(2),
  },

  imgProduct: {
    borderRadius: '10px',
    border: '1px solid #ccc'
  },

  nameProduct: {
    fontSize: '16px'
  },

  colorProduct: {
    color: '#999'
  },

  quantityProduct: {
    color: '#999',
    marginLeft: theme.spacing(1),
  },

  priceProduct: {
    fontSize: '20px',
    fontWeight: 'bold'
  },

  btn: {
    float: 'right'
  },

  totalPrice: {
    fontSize: '18px',
    fontWeight: 'bold'
  }
}))

function OrderDetail(props) {
  const classes = useSytle();
  return (
    <Paper elevation={0} className={classes.root}>
      <Typography variant="h5" component='h2'>Order ID: #1001</Typography>
      <Box mt={0.5}>
        <Typography variant='body2' component='span' className={classes.titleDate}>Order date: </Typography>
        <Typography variant='body2' component='span' className={classes.date}>Feb 16, 2022</Typography>
      </Box>
      
      <Box component='ul' className={classes.listProduct}>
        {
          PRODUCT_LIST.map((x) => (
            <li key={x.id} className={classes.product}>
              <Box className={classes.productLeft}>
                <img src="http://nouthemes.net/html/trueshoes/images/shoe-detail/1.jpg" alt="" width="80px" className={classes.imgProduct}/>
                <Box className={classes.boxInfo}>
                  <Typography variant='body2' component='p' className={classes.nameProduct}>{x.name}</Typography>
                  <Typography variant='body2' component='span' className={classes.colorProduct}>{x.color}</Typography>
                  <Typography variant='body2' component='span' className={classes.quantityProduct}>{x.size}</Typography>
                </Box>
              </Box>

              <Box className={classes.boxPrice} >
                <Typography variant='subtitle2' component='p' className={classes.priceProduct}>{x.price}</Typography>
                <Typography variant='body2' component='p' >x1</Typography>
              </Box>
            </li>
          ))
        }
        
      </Box>

      <Box >
        <Box display='flex' justifyContent='space-between'>
          <Typography variant='body2'>Subtotal:</Typography>
          <Typography variant='body2'>251.00</Typography>
        </Box>

        <Box display='flex' justifyContent='space-between'>
          <Typography variant='body2'>Discount:</Typography>
          <Typography variant='body2'>0</Typography>
        </Box>

        <Box display='flex' justifyContent='space-between'>
          <Typography variant='p' className={classes.totalPrice}>Total:</Typography>
          <Typography variant='p' className={classes.totalPrice}>251.00</Typography>
        </Box>
      </Box>
      
      <Box className={classes.btn}>
        <ButtonActive content='Mua lại' widthBtn='200px'/>
      </Box>
    </Paper>
  );
}

export default OrderDetail;