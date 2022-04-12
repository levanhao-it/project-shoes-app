import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, makeStyles, Typography } from '@material-ui/core';

FilterByColor.propTypes = {
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
    minWidth: `20px`,
    width: `25px`,
    height: '25px',
    borderRadius: '50%',
    fontSize: '14px',
    fontWeight: '500',
    border: '1px solid #ccc',
    padding: '0',
    marginBottom: '2rem',
    marginRight: '2rem',
    border: '1px solid #fff',
  },
}));

function FilterByColor(props) {
  const handleCategoryClick = (category) => {};

  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="h3" className={classes.h3}>
        Color
      </Typography>

      <Box>
        <Button
          variant="outlined"
          className={classes.button}
          style={{ backgroundColor: '#2AC37D' }}
        ></Button>
        <Button
          variant="outlined"
          className={classes.button}
          style={{ backgroundColor: '#2AC87e' }}
        ></Button>
        <Button
          variant="outlined"
          className={classes.button}
          style={{ backgroundColor: 'red' }}
        ></Button>
        <Button
          variant="outlined"
          className={classes.button}
          style={{ backgroundColor: 'yellow' }}
        ></Button>
        <Button
          variant="outlined"
          className={classes.button}
          style={{ backgroundColor: 'pink' }}
        ></Button>
        <Button
          variant="outlined"
          className={classes.button}
          style={{ backgroundColor: 'blue' }}
        ></Button>
        <Button
          variant="outlined"
          className={classes.button}
          style={{ backgroundColor: 'black' }}
        ></Button>
        <Button
          variant="outlined"
          className={classes.button}
          style={{ backgroundColor: '#8b572a' }}
        ></Button>
        <Button
          variant="outlined"
          className={classes.button}
          style={{ backgroundColor: 'green' }}
        ></Button>
        <Button
          variant="outlined"
          className={classes.button}
          style={{ backgroundColor: '#563462' }}
        ></Button>
        <Button
          variant="outlined"
          className={classes.button}
          style={{ backgroundColor: '#83222a' }}
        ></Button>
      </Box>
    </Box>
  );
}

export default FilterByColor;
