import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss'


HeaderNavigation.propTypes = {
  
};

function HeaderNavigation(props) {
  return (
    <div className='header-nav'>
      <div className="header-nav__logo">
        <img src="http://nouthemes.net/html/trueshoes/images/logo.png" alt="" className='header-nav__logo-img'/>
      </div>

      <div className="header-nav__list">
          <li className="header-nav__item">
            <a href="#" className="header-nav__link">Home</a>
          </li>

          <li className="header-nav__item">
            <a href="#" className="header-nav__link">Men</a>
          </li>

          <li className="header-nav__item">
            <a href="#" className="header-nav__link">Women</a>
          </li>

          <li className="header-nav__item">
            <a href="#" className="header-nav__link">Kids</a>
          </li>

          <li className="header-nav__item">
            <a href="#" className="header-nav__link">New</a>
          </li>

          <li className="header-nav__item">
            <a href="#" className="header-nav__link">Contact</a>
          </li>
      </div>

      <div className="header-nav__wrapper">
        <div className="header-nav__search">
          <input type="text" placeholder='Search Product...'className='header-nav__search-input'/>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='header-nav__search-icon'>
            <path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"/>
          </svg>
        </div>

        <div className="header-cart">
            <a href="" className="header-cart__link">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className='header-cart__icon'>
              <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM272 180H316V224C316 235 324.1 244 336 244C347 244 356 235 356 224V180H400C411 180 420 171 420 160C420 148.1 411 140 400 140H356V96C356 84.95 347 76 336 76C324.1 76 316 84.95 316 96V140H272C260.1 140 252 148.1 252 160C252 171 260.1 180 272 180zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z"/></svg>

              <span className='header-cart__quantity'>20</span>
            </a>
        </div>
      </div>
    </div>
  );
}

export default HeaderNavigation;