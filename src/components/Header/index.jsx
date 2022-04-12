import React from 'react';
import PropTypes from 'prop-types';
import HeaderAuthentic from './components/HeaderAuthentic';
import HeaderNavigation from './components/HeaderNavigation';
import HeaderServices from './components/HeaderServices';

Header.propTypes = {};

function Header(props) {
  return (
    <div className="header">
      <HeaderAuthentic />
      <HeaderNavigation />
      <HeaderServices />
    </div>
  );
}

export default Header;
