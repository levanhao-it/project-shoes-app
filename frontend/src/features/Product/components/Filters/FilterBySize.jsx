import { Box, Button, Collapse, makeStyles, Typography } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';

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
  h5: {
    fontFamily: '"Archivo Narrow", sans-serif',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#000',
    textTransform: 'uppercase',
  },
  li: {
    position: 'relative',
    display: 'block',
    fontSize: '14px',
    color: '#313131',
    marginBottom: '20px',
    paddingLeft: '30px',
    textTransform: 'uppercase',
    '&:hover': {
      color: '#2AC37D',
    },
  },
  boxTitle: {
    borderTop: 'none',
    height: '20px',
    padding: '20px',
    cursor: 'pointer',
  },
  content: {
    borderBottom: '1px solid #e5e5e5',
  },
  button: {
    minWidth: `30px`,
    width: `70px`,
    height: '70px',
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
  boxBtn: {
    padding: '0 45px',
  },
}));

function FilterBySize(props) {
  const handleCategoryClick = (category) => {};

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        className={classes.boxTitle}
        onClick={handleClick}
      >
        <Typography variant="h5" className={classes.h5}>
          Size
        </Typography>
        <Box>{open ? <ExpandLess /> : <ExpandMore />}</Box>
      </Box>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box className={classes.boxBtn}>
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
      </Collapse>
    </Box>
  );
}

export default FilterBySize;
