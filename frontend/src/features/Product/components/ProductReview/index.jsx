import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Rating } from '@material-ui/lab';
import { Box, Link, makeStyles, Typography } from '@material-ui/core';
import { useEffect } from 'react';
import rateApi from 'api/rateApi';

ProductReview.propTypes = {
  product: PropTypes.object,
};

const useStyle = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    backgroundColor: '#f1f1f1',
    padding: '12px',
  },
  commentContent: {
    marginTop: '14px',
    display: 'block',
    fontSize: '14px',
    color: '#5b5b5b',
    borderBottom: '2px solid #e0e0e0',
    paddingBottom: '20px',
  },
  commentName: {
    color: '#2AC37D',
    fontWeight: 'bold',
  },
  ratingHeading: {
    fontSize: '14px',
  },
}));

function ProductReview({ product = {} }) {
  const [rateList, setRate] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const result = await rateApi.getById(product.id);
        setRate(result.data);
      } catch (error) {
        console.log('Failed to fetch rate', error);
      }
    })();
  }, [product.id]);

  const classes = useStyle();
  return (
    <div className={classes.root}>
      {rateList.map((item) => (
        <Box key={item.idRate}>
          <Box className={classes.ratingContent}>
            <Rating name="read-only" value={item.rating} readOnly size="small" />
            <Typography variant="p" className={classes.ratingHeading} component="p">
              By {''}
              <Typography display="inline" variant="p" className={classes.commentName}>
                {item.userName}
              </Typography>{' '}
              {item.modifyDate}
            </Typography>
          </Box>

          <Typography variant="p" className={classes.commentContent} gutterBottom>
            {item.content}
          </Typography>
        </Box>
      ))}
    </div>
  );
}

export default ProductReview;
