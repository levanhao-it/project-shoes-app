import React from 'react';
import PropTypes from 'prop-types';
import HeaderAuthentic from './components/HeaderAuthentic';
import HeaderNavigation from './components/HeaderNavigation';
import HeaderServices from './components/HeaderServices';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

Header.propTypes = {};

const useStyle = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    zIndex: '10',
    top: 0,
    right: 0,
    left: 0,
    backgroundColor: "#fff"
  }
}))

function Header(props) {
  const classes =  useStyle();
  return (
    <Box className={classes.root} >
      <HeaderAuthentic />
      <HeaderNavigation />
      <HeaderServices />
    </Box>
  );
}

export default Header;
