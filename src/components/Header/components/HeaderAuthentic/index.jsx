import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss'

HeaderAuthentic.propTypes = {
  
};

function HeaderAuthentic(props) {
  return (
    <div>
       <div className="header-authetic">
        <p className="header-authetic__info">
        460 West 34th Street, 15th floor, New York - Hotline: 804-377-3580 - 804-399-3580
        </p>

        <ul className="header-authetic__list">
          <li className="header-authetic__item">
            <a href="./" className="header-authetic__link">Login</a>
          </li>

          <li className="header-authetic__item">
            <a href="./" className="header-authetic__link">Register</a>
          </li>

          <li className="header-authetic__item">
            <a href="./" className="header-authetic__link">Usd</a>
          </li>

          <li className="header-authetic__item">
            <a href="./" className="header-authetic__link">Language</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default HeaderAuthentic;