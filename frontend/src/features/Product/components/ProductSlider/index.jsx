import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import './styles.scss';

ProductSilder.propTypes = {
  
};

const useStyle = makeStyles((theme)=> ({
  silderImg: {
    margin: 'auto',
  },
}))

function ProductSilder(props) {
  const classes = useStyle();
  return (
    <div className='product-slider'>
       <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        auto
        pagination={{
          clickable: true,
          
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Box width={600} className={classes.silderImg}>
            <img src="http://nouthemes.net/html/trueshoes/images/shoe-detail/1.jpg" alt="" width="100%"/>
          </Box>
        </SwiperSlide>

        <SwiperSlide>
          <Box width={600} className={classes.silderImg}>
            <img src="http://nouthemes.net/html/trueshoes/images/shoe-detail/2.jpg" alt="" width="100%"/>
          </Box>
        </SwiperSlide>

        <SwiperSlide>
          <Box width={600} className={classes.silderImg}>
            <img src="http://nouthemes.net/html/trueshoes/images/shoe-detail/3.jpg" alt="" width="100%"/>
          </Box>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default ProductSilder;