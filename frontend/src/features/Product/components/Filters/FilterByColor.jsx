import { Box, Button, Collapse, makeStyles, Typography } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';

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
    minWidth: `20px`,
    width: `25px`,
    height: '25px',
    borderRadius: '50%',
    fontSize: '14px',
    fontWeight: '500',
    border: '1px solid #ccc',
    padding: '0',
    marginBottom: '20px',
    marginRight: '20px',
    border: '1px solid #fff',
  },
  boxBtn: {
    padding: '0 45px',
  },
}));

function FilterByColor(props) {
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
          Color
        </Typography>
        <Box>{open ? <ExpandLess /> : <ExpandMore />}</Box>
      </Box>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box className={classes.boxBtn}>
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
      </Collapse>
    </Box>
  );
}

export default FilterByColor;
