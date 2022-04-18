import React from 'react';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './styles.scss';

// import required modules
import { EffectFade, Navigation, Pagination } from 'swiper';

HomeSlider.propTypes = {};

function HomeSlider(props) {
  return (
    <div className="slider">
      <Swiper
        spaceBetween={30}
        effect={'fade'}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        loop={true}
        modules={[EffectFade, Navigation, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="https://graphicsfamily.com/wp-content/uploads/edd/2021/07/Professional-E-Commerce-Shoes-Banner-Design-1180x664.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://cdnb.artstation.com/p/assets/images/images/028/692/321/large/vineet-joshi-shoes-banner.jpg?1595238969" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://storage.pixteller.com/designs/designs-images/2020-12-21/05/sport-shoes-sale-banner-1-5fe0c471dbecb.png" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default HomeSlider;
