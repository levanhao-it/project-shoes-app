import { Typography } from '@material-ui/core';
import React from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Product from '../Product';
import { makeStyles } from '@material-ui/core';
import './styles.scss'
ProductRecomend.propTypes = {};

const useStyle = makeStyles((theme) => ({
  root: {
    margin: '40px 0 40px',
  },
  title: {
    fontWeight: 'bold',
    fontSize: '24px',
  },
}));

function ProductRecomend(props) {
  const classes = useStyle();
  return (
    <div className={`${classes.root} slider-recommed`}>
      <Typography variant="h3" component="h3" className={classes.title}>
        OTHERS ALSO BOUGHT
      </Typography>
      <Swiper
        slidesPerView={"auto"}
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
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 20
          },

          450: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          600: {
            slidesPerView:2,
            spaceBetween: 20
          },
          960: {
            slidesPerView: 4,
            spaceBetween: 20
          }
        }}  
      >
        <SwiperSlide>
          <Product
            imageProduct="http://nouthemes.net/html/trueshoes/images/shoe/2.jpg"
            nameProduct="Air Jordan 7 Retro"
            priceProduct="499"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Product
            imageProduct="http://nouthemes.net/html/trueshoes/images/shoe/1.jpg"
            nameProduct="Air Jordan 7 Retro TrueToSize"
            priceProduct="699"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Product
            imageProduct="http://nouthemes.net/html/trueshoes/images/shoe/3.jpg"
            nameProduct="Air Jordan 3 Retro"
            priceProduct="429"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Product
            imageProduct="http://nouthemes.net/html/trueshoes/images/shoe/4.jpg"
            nameProduct="Air Jordan 4 Retro"
            priceProduct="329"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Product
            imageProduct="http://nouthemes.net/html/trueshoes/images/shoe/5.jpg"
            nameProduct="Air Jordan 5 Retro"
            priceProduct="429"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Product
            imageProduct="http://nouthemes.net/html/trueshoes/images/shoe/6.jpg"
            nameProduct="Air Jordan 3 Retro"
            priceProduct="429"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default ProductRecomend;
