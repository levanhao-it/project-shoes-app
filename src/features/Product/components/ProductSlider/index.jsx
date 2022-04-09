import React from 'react';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";

ProductSilder.propTypes = {
  
};

function ProductSilder(props) {
  return (
    <div>
       <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="http://nouthemes.net/html/trueshoes/images/shoe-detail/1.jpg" alt="" width="100%"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src="http://nouthemes.net/html/trueshoes/images/shoe-detail/2.jpg" alt="" width="100%"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src="http://nouthemes.net/html/trueshoes/images/shoe-detail/3.jpg" alt="" width="100%"/>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default ProductSilder;