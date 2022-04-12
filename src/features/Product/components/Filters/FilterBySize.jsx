import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, makeStyles, Typography } from '@material-ui/core';

FilterBySize.propTypes = {
  onChange: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    borderBottom: '1px solid #e5e5e5',
    paddingBottom: '25px',
    marginBottom: '25px',
  },

  menu: {
    padding: 0,
    margin: 0,
    listStyleType: 'none',

    '& > li': {
      marginTop: theme.spacing(1),
      transition: 'all .25s',

      '&:hover': {
        color: theme.palette.primary.dark,
        cursor: 'pointer',
      },
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
  li: {
    position: 'relative',
    display: 'block',
    fontSize: '14px',
    color: '#313131',
    marginBottom: '2rem',
    '&:hover': {
      color: '#2AC37D',
    },
  },
  button: {
    minWidth: `30px`,
    width: `40px`,
    height: '40px',
    borderRadius: '0',
    fontSize: '14px',
    fontWeight: '500',
    border: '1px solid #ccc',

    '&:hover': {
      backgroundColor: '#2AC37D',
      color: '#fff',
      border: '1px solid #fff',
    },
  },
}));

function FilterBySize(props) {
  const handleCategoryClick = (category) => {};

  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="h3" className={classes.h3}>
        CAtegory
      </Typography>

      <Box>
        <Button variant="outlined" size="large" className={classes.button}>
          3
        </Button>
        <Button variant="outlined" size="large" className={classes.button}>
          5.5
        </Button>
        <Button variant="outlined" size="large" className={classes.button}>
          8
        </Button>
        <Button variant="outlined" size="large" className={classes.button}>
          10.5
        </Button>
        <Button variant="outlined" size="large" className={classes.button}>
          13
        </Button>
        <Button variant="outlined" size="large" className={classes.button}>
          3.5
        </Button>
        <Button variant="outlined" size="large" className={classes.button}>
          6
        </Button>
        <Button variant="outlined" size="large" className={classes.button}>
          8.5
        </Button>
        <Button variant="outlined" size="large" className={classes.button}>
          11
        </Button>
        <Button variant="outlined" size="large" className={classes.button}>
          13.5
        </Button>
        <Button variant="outlined" size="large" className={classes.button}>
          4
        </Button>
        <Button variant="outlined" size="large" className={classes.button}>
          6.5
        </Button>
        <Button variant="outlined" size="large" className={classes.button}>
          9
        </Button>
        <Button variant="outlined" size="large" className={classes.button}>
          11.5
        </Button>
        <Button variant="outlined" size="large" className={classes.button}>
          14
        </Button>
        <Button variant="outlined" size="large" className={classes.button}>
          4.5
        </Button>
        <Button variant="outlined" size="large" className={classes.button}>
          7
        </Button>
        <Button variant="outlined" size="large" className={classes.button}>
          9.5
        </Button>
        <Button variant="outlined" size="large" className={classes.button}>
          12
        </Button>
        <Button variant="outlined" size="large" className={classes.button}>
          14.5
        </Button>
        <Button variant="outlined" size="large" className={classes.button}>
          5
        </Button>
        <Button variant="outlined" size="large" className={classes.button}>
          7.5
        </Button>
        <Button variant="outlined" size="large" className={classes.button}>
          10
        </Button>
        <Button variant="outlined" size="large" className={classes.button}>
          12.5
        </Button>
        <Button variant="outlined" size="large" className={classes.button}>
          15
        </Button>
      </Box>
    </Box>
  );
}

export default FilterBySize;
