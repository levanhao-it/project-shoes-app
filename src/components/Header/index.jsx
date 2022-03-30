import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss'
import { Button } from '@mui/material';
import HeaderAuthentic from './components/HeaderAuthentic';
import HeaderNavigation from './components/HeaderNavigation';

Header.propTypes = {
  
};

function Header(props) {
  return (
    <div className='header'>
     <HeaderAuthentic/>
     <HeaderNavigation/>
    </div>
  );
}

export default Header;