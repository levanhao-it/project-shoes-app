import { Typography } from '@material-ui/core';
import React from 'react';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Product from '../Product';
import { makeStyles} from '@material-ui/core';
ProductRecomend.propTypes = {

};

const useStyle = makeStyles((theme) => ({
  root: {
    margin: '40px 0 40px'
  },
  title: {
    fontWeight: 'bold',
    fontSize: '24px'
  }
}))

function ProductRecomend(props) {
  const classes = useStyle()
  return (
    <div className={classes.root}>
      <Typography variant='h3' component="h3" className={classes.title}>OTHERS ALSO BOUGHT</Typography>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        slidesPerGroup={3}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        <SwiperSlide><Product /></SwiperSlide>
        <SwiperSlide><Product /></SwiperSlide>
        <SwiperSlide><Product /></SwiperSlide>
        <SwiperSlide><Product /></SwiperSlide>
        <SwiperSlide><Product /></SwiperSlide>
        <SwiperSlide><Product /></SwiperSlide>
      </Swiper>
    </div>
  );
}

export default ProductRecomend;