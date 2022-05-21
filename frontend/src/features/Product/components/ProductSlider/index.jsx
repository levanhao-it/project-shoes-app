import { Box, makeStyles } from '@material-ui/core';
import React from 'react';
import { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import './styles.scss';

ProductSilder.propTypes = {
  
};

const useStyle = makeStyles((theme)=> ({
  silderImg: {
    width: '600px',
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
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
          <Box className={classes.silderImg}>
            <img src="http://nouthemes.net/html/trueshoes/images/shoe-detail/1.jpg" alt="" width="100%"/>
          </Box>
        </SwiperSlide>

        <SwiperSlide>
          <Box className={classes.silderImg}>
            <img src="http://nouthemes.net/html/trueshoes/images/shoe-detail/2.jpg" alt="" width="100%"/>
          </Box>
        </SwiperSlide>

        <SwiperSlide>
          <Box  className={classes.silderImg}>
            <img src="http://nouthemes.net/html/trueshoes/images/shoe-detail/3.jpg" alt="" width="100%"/>
          </Box>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default ProductSilder;