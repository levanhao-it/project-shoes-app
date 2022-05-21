import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, AccordionDetails, AccordionSummary, Box, makeStyles, Typography } from '@material-ui/core';
import ProductReviewList from './ProductReviewList';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

ProductTabsMobile.propTypes = {
  
};

const useStyle = makeStyles((theme) => ({
  heading: {
    fontWeight: 'bold'
  }
}))

function ProductTabsMobile(props) {
  const classes = useStyle()

  return (
    <Box>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography className={classes.heading}>OVERVIEW</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography className={classes.heading}>REVIEW</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ProductReviewList />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default ProductTabsMobile;