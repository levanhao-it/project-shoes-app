import React from 'react';
import PropTypes from 'prop-types';

import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Zoom, Pagination, Navigation } from 'swiper';

import './styles.scss';
import { Box } from '@material-ui/core';

HomeSlider.propTypes = {};

function HomeSlider(props) {
  return (
    <Box className="root">
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        zoom={true}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Zoom, Navigation, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="swiper-zoom-container">
            <img src="https://nouthemes.net/html/trueshoes/images/slider/3.jpg" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiper-zoom-container">
            <img src="https://nouthemes.net/html/trueshoes/images/slider/2.jpg" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiper-zoom-container">
            <img src="https://nouthemes.net/html/trueshoes/images/slider/1.jpg" />
          </div>
        </SwiperSlide>
      </Swiper>
    </Box>
  );
}

export default HomeSlider;
