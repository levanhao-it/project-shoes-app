import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { NavLink } from 'react-router-dom';
import './style.scss'


UserSidebar.propTypes = {
  
};

const useStyle = makeStyles((theme) =>  ({
  root: {
    
  },
  title: {
    fontSize: "20px",
    fontWeight: 'bold'
  },
  menuList: {
    backgroundColor: "#fff",
  },
  link: {
    display: 'flex',
    textDecoration: 'none',
    color: '#000',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '17px 15px',
    transition: 'all 0.3 ease',
    '&:hover': {
      backgroundColor: '#000',
      color: '#fff',
      fontWeight: 'bold',
      textDecoration: 'underline'
    }
  }
}))

function UserSidebar(props) {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <Typography variant='h5' component='h5' className={classes.title}>ACCOUNT OVERVIEW</Typography>

      <Box className={classes.menuList} mt={4}>
          <Box>
            <NavLink to="/user" className={classes.link} activeClassName='active-menu'>
              Personal Information 
              <ChevronRightIcon />
            </NavLink>
          </Box>

          <Box>
            <NavLink to="/user/whishList" className={classes.link} activeClassName='active-menu'>
              My WishList
              <ChevronRightIcon />
            </NavLink>
          </Box>

          <Box>
            <NavLink to="/user/order" className={classes.link} activeClassName='active-menu'>
              My orders
              <ChevronRightIcon />
            </NavLink>
          </Box>
          
          <Box>
            <NavLink to="/user" className={classes.link}>
              Log out
            </NavLink>
          </Box>
          
          
      </Box>
    </div>
  );
}

export default UserSidebar;