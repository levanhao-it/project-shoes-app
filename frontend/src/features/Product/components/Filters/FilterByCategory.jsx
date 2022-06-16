import { Box, Collapse, makeStyles, Typography } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import { KeyboardArrowRightIcon, ExpandMore } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';

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
}));

function FilterByCategory(props) {
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
          Category
        </Typography>
        <Box>{open ? <KeyboardArrowRightIcon /> : <ExpandMore />}</Box>
      </Box>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box className={classes.content} disablePadding>
          <ListItem button className={classes.nested}>
            <Typography variant="body2" className={classes.li}>
              Life (512)
            </Typography>
          </ListItem>
          <ListItem button className={classes.nested}>
            <Typography variant="body2" className={classes.li}>
              Running (90)
            </Typography>
          </ListItem>
          <ListItem button className={classes.nested}>
            <Typography variant="body2" className={classes.li}>
              Baseball (44)
            </Typography>
          </ListItem>
          <ListItem button className={classes.nested}>
            <Typography variant="body2" className={classes.li}>
              Football (112)
            </Typography>
          </ListItem>
          <ListItem button className={classes.nested}>
            <Typography variant="body2" className={classes.li}>
              Soccer (33)
            </Typography>
          </ListItem>
        </Box>
      </Collapse>
    </Box>
  );
}

export default FilterByCategory;
