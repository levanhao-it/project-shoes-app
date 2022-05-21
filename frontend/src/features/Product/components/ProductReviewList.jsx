import { Link, Dialog, DialogContent, } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Rating } from '@material-ui/lab';
import React, { useState } from 'react';
import ProductReview from './ProductReview';
import { makeStyles } from '@material-ui/core/styles';
import ProductReviewForm from './ProductReviewForm';


ProductReviewList.propTypes = {
  
};

const useStyle = makeStyles((theme) => ({
  commentLink: {
    color: '#333',
    textDecoration: 'underline',
    marginTop: theme.spacing(1),
    display: 'inline-block',
    '&:hover': {
      backgroundColor: '#000',
      color: '#fff',
      cursor: 'pointer'
    }
  },

  titleRating: {
    marginLeft: theme.spacing(1)
  }
}))

function ProductReviewList(props) {
  const [openReview, setOpenReview] = useState(false);
  const classes = useStyle();
  const handleCloseReview = () => {
    setOpenReview(false)
  }

  const handleOpenReview = () => {
    setOpenReview(true)
  }
  return (
    <Box>
      <Box display="flex" alignItems="center">
        <Rating name="read-only" defaultValue={3.5} precision={0.5} readOnly size='medium'/>
        <Typography variant='p' className={classes.titleRating}>4.5 stars</Typography>
      </Box>

      <Link className={classes.commentLink} onClick={handleOpenReview}>Write a Review</Link>

      <ProductReview />

      <Dialog open={openReview} onClose={handleCloseReview} disableEscapeKeyDown>
        <DialogContent>
          <ProductReviewForm/>
        </DialogContent>
      </Dialog>
    </Box>

    
  );
}

export default ProductReviewList;