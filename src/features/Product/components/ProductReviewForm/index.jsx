import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid, makeStyles, Radio, RadioGroup, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import InputField from '../../../../components/form-controls/InputField';
import { useForm } from 'react-hook-form';

ProductReviewForm.propTypes = {
  
};

const useStyle = makeStyles((theme) => ({
  root: {
    width: '500px'
  },
  titleHeading: {
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },

  titleSub: {
    fontSize: '14px',
    color: '#8d8d8d',
    marginTop: '4px'
  },

  content: {
    marginTop: '30px'
  },

  titleContent: {
    fontSize: '14px'
  },

  containerContent: {
    marginTop: '20px'
  }
}))

function ProductReviewForm(props) {
  const form = useForm({
    defaultValues: {
      title: '',
      content: '',
    },
  });
  const classes = useStyle();
  const [valueRating, setValueRating] = useState(2);
  
  const [sizeValue, setSizeValue] = useState('female');
  const [comfortValue, setComfortValue] = useState('Very Comfortable');
  const [durabilityValue, setDurabilityValue] = useState('female');

  const handleChangeSize = (event) => {
    setSizeValue(event.target.value);
  };

  const handleChangeComfort = (event) => {
    setComfortValue(event.target.value);
  };

  const handleChangeDurability = (event) => {
    setDurabilityValue(event.target.value);
  };
  return (
    <form>
      <Grid align='center' className={classes.root}>
        <Typography variant='h4' align='center' className={classes.titleHeading}>Write a review</Typography>
        <Typography variant='p' align='center' className={classes.titleSub}>Please share your experience</Typography>
      </Grid>

      <Grid container className={classes.content}>
        <Grid item sx={12} sm={4}>
          <Typography className={classes.titleContent}>My overall rating:</Typography>
        </Grid>

        <Grid item sx={12} sm={8}>
        <Rating
          name="simple-controlled"
          value={valueRating}
          onChange={(event, newValue) => {
            setValueRating(newValue);
          }}
        />
        </Grid>
      </Grid>

      <Grid container className={classes.containerContent}>
        <Grid sx={12} sm={4} >
            <FormControl component="fieldset">
            <FormLabel component="legend">Size:</FormLabel>
            <RadioGroup aria-label="gender" name="gender1" value={sizeValue} onChange={handleChangeSize}>
              <FormControlLabel value="Runs Small" control={<Radio color="default"/>} label="Runs Small" size="small" />
              <FormControlLabel value="Just Right" control={<Radio color="default"/>} label="Just Right"  size="small"/>
              <FormControlLabel value="Runs Big" control={<Radio color="default"/>} label="Runs Big" size="small"/>
            </RadioGroup>
            </FormControl>
        </Grid>
        <Grid sx={12} sm={4}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Comfort:</FormLabel>
            <RadioGroup aria-label="gender" name="gender1" value={comfortValue} onChange={handleChangeComfort}>
              <FormControlLabel value="Uncomfortable" control={<Radio color="default"/>} label="Uncomfortable" size="small"/>
              <FormControlLabel value="Average" control={<Radio color="default"/>} label="Average"  size="small"/>
              <FormControlLabel value="Very Comfortable" control={<Radio color="default"/>} label="Very Comfortable" size="small"/>
            </RadioGroup>
            </FormControl>
        </Grid>
        <Grid sx={12} sm={4}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Durability</FormLabel>
            <RadioGroup aria-label="gender" name="gender1" value={durabilityValue} onChange={handleChangeDurability}>
              <FormControlLabel value="Not Durable" control={<Radio color="default"/>} label="Not Durable" size="small"/>
              <FormControlLabel value="Average" control={<Radio color="default"/>} label="Average"  size="small"/>
              <FormControlLabel value="Very Durable" control={<Radio color="default"/>} label=" Very Durable" size="small"/>
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
        

        <Grid item sx={12} sm={12}>
          <InputField name="title" label="Review Title" form={form} />
        </Grid>

        <Grid item sx={12} sm={12}>
          <InputField name="content" label="Review Content" form={form} />
        </Grid>


      <Button
            className={classes.submit}
            variant="contained"
            fullWidth
            size="large"
            type="submit"
            style={{ backgroundColor: '#000', color: '#fff' }}
          >
            Submit
          </Button>

    </form>
  );
}

export default ProductReviewForm;