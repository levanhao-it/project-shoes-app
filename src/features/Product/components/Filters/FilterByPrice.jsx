import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, makeStyles, Slider, TextField, Typography } from '@material-ui/core';

FilterByPrice.propTypes = {
  onChange: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    borderBottom: '1px solid #e5e5e5',
    paddingBottom: '25px',
    marginBottom: '25px',
  },

  range: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',

    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),

    '& > span': {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  },
  h3: {
    fontFamily: '"Archivo Narrow", sans-serif',
    fontSize: '24px',
    fontWeight: '700',
    color: '#626262',
    textTransform: 'uppercase',
    marginBottom: '2.5rem',
  },
  h4: {
    display: 'block',
    fontFamily: '"Archivo Narrow", sans-serif',
    fontWeight: '400',
    fontStyle: 'italic',
    fontSize: '14px',
    color: '#898989',
    marginBottom: '1.8rem',
  },
  btn: {
    padding: '5px 30px',
    fontSize: '12px',
    lineHeight: '15px',
    textTransform: 'uppercase',
    letterSpacing: '.1em',
    backgroundColor: '#2AC37D',
    color: '#fff',
    '&:hover': {
      textDecoration: 'none',
      backgroundColor: '#2AC37D',
    },
  },
  range: {
    color: '#2AC37D',
  },
}));
function valuetext(value) {
  return `${value}$`;
}

function FilterByPrice(props) {
  const handleCategoryClick = (category) => {};

  const classes = useStyles();
  const [value, setValue] = React.useState([300, 1200]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className={classes.root}>
      <Typography variant="h3" className={classes.h3}>
        price
      </Typography>

      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
        className={classes.range}
        min={0}
        max={2000}
        step={200}
      />
      <Typography variant="h4" className={classes.h4}>
        Price: $300 - $1200
      </Typography>

      <Button size="normal" className={classes.btn}>
        Filter
      </Button>
    </Box>
  );
}

export default FilterByPrice;
