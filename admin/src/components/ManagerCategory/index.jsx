import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, makeStyles, Typography } from '@material-ui/core';
import { Box, Collapse } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import CategoryIcon from '@material-ui/icons/Category';
import { Link } from 'react-router-dom';

ManagerCategory.propTypes = {};
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
    fontFamily:
      'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    fontSize: '16px',
    fontWeight: 'bold',
    marginLeft: '10px',
  },
  li: {
    position: 'relative',
    display: 'block',
    fontSize: '16px',
    padding: '9px 24px 9px 40px',
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
}));

function ManagerCategory(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div>
      <Box>
        <Box
          display="flex"
          justifyContent="space-between"
          className={classes.boxTitle}
          onClick={handleClick}
        >
          <Box display="flex">
            <CategoryIcon fontSize="small" />
            <Typography variant="h5" className={classes.h5}>
              Categories
            </Typography>
          </Box>
          <Box>
            {open ? <ExpandMore fontSize="small" /> : <KeyboardArrowRightIcon fontSize="small" />}
          </Box>
        </Box>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box className={classes.content} disablePadding>
            <ListItem button className={classes.nested} component={Link} to="/categories">
              <Typography variant="body2" className={classes.li}>
                List
              </Typography>
            </ListItem>
          </Box>
        </Collapse>
      </Box>
    </div>
  );
}

export default ManagerCategory;
