import React from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Typography } from '@material-ui/core';

FilterByCategory.propTypes = {
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
}));

function FilterByCategory(props) {
  const handleCategoryClick = (category) => {};

  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="h3" className={classes.h3}>
        CAtegory
      </Typography>

      <ul className={classes.menu}>
        <li onClick={() => handleCategoryClick()}>
          <Typography variant="body2" className={classes.li}>
            Life (512)
          </Typography>
        </li>
        <li>
          <Typography variant="body2" className={classes.li}>
            Running (90)
          </Typography>
        </li>
        <li>
          <Typography variant="body2" className={classes.li}>
            Baseball (44)
          </Typography>
        </li>
        <li>
          <Typography variant="body2" className={classes.li}>
            Football (112)
          </Typography>
        </li>
        <li>
          <Typography variant="body2" className={classes.li}>
            Soccer (33)
          </Typography>
        </li>
      </ul>
    </Box>
  );
}

export default FilterByCategory;
