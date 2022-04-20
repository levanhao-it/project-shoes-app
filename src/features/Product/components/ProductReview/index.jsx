import React from 'react';
import PropTypes from 'prop-types';
import { Rating } from '@material-ui/lab';
import { Box, Link, makeStyles, Typography } from '@material-ui/core';

ProductReview.propTypes = {
  
};

const useStyle = makeStyles((theme) => ({
 root: {
   marginTop: '20px',
   backgroundColor: '#f1f1f1',
   padding:'12px'
 },
 title: {
  fontWeight:'bold',
  fontSize: '16px'
 },
 ratingContent: {

 },
 commentContent: {
  marginTop: '14px',
  display:'block',
  fontSize: '14px',
  color: '#5b5b5b',
 },
 commentName: {
  color: '#2AC37D',
  fontWeight: 'bold'
 },
 ratingHeading: {
   fontSize: '14px',
   marginLeft: '10px'
 }
}))

function ProductReview(props) {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant= 'p' >Nike’s best ever seller is always a nice choice</Typography>
      <Box display="flex" mt={1} className={classes.ratingContent} alignItems="center">
        <Rating name="read-only" value={3} readOnly />
        <Typography variant='p' className={classes.ratingHeading}> By <Typography display='inline' variant='p' className={classes.commentName}>Alena Studio</Typography> - November 25, 2017</Typography>
      </Box>
      
      <Typography variant='p' className={classes.commentContent} gutterBottom>
      Had to have these classics. They tend to become more and more comfortable the more you use them and they’re quite heavy too but you just can’t miss them....
      </Typography>


    </div>
  );
}

export default ProductReview;