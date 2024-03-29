import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Typography } from '@material-ui/core';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import BusinessIcon from '@material-ui/icons/Business';
import bg from '../../../../images/bg.png';

WhyChooseeUs.propTypes = {};
const useStyles = makeStyles((theme) => ({
  leaderBoard_left_h1: {
    lineHeight: '40px',
    fontFamily: 'Inter, sans-serif',
    fontSize: '1.8rem',
    fontWeight: 'bold',
  },
  icon_box_h1: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  why_choose_us: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '45vh',
    height: 'max-content',
    overflow: 'hidden',
    background: `url(${bg})`,
    backgroundRepeat: 'no-repeat',
    objectFit: 'contain',
    backgroundPosition: 'calc(100vw - 365px) 90px',
    backgroundSize: '350px',
    margin: '40px 0px',
  },
  icon_boxes: {
    display: 'flex',
    justifyContent: 'center',
    padding: '30px 30px',
    flexWrap: 'wrap',
  },
  icon_box: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: '15px',
    marginTop: '15px',
  },
  icon_box_icon: {
    fontSize: '50px',
    color: '#212121',
  },
  icon_box_p: {
    fontFamily: 'Inter, sans-serif',
    textAlign: 'center',
    marginTop: '2px',
  },
  wcu_service: {
    fontFamily: 'Inter, sans-serif',
    padding: '0 20px',
    fontSize: '.9rem',
  },
}));

function WhyChooseeUs(props) {
  const {
    why_choose_us,
    leaderBoard_left_h1,
    icon_boxes,
    icon_box_icon,
    icon_box,
    icon_box_h1,
    icon_box_p,
    wcu_service,
  } = useStyles();
  const Iconbox = ({ details1, details2, Icon, title }) => (
    <div className={icon_box}>
      {Icon}
      <Typography className={icon_box_h1} variant="h2" component="h1">
        {title}
      </Typography>
      <Typography className={icon_box_p} component="p">
        {details1} <br /> {details2}
      </Typography>
    </div>
  );

  return (
    <div className={why_choose_us}>
      <Typography className={leaderBoard_left_h1} variant="h2" component="h1">
        Why choose us?
      </Typography>
      <Typography className={wcu_service} component="p">
        over 2 million people are happy with our service
      </Typography>

      <div className={icon_boxes}>
        <Iconbox
          Icon={<DirectionsRunIcon className={icon_box_icon} />}
          title="Easy to use"
          details1="We server the best to customers"
          details2="quality shoes"
        />
        <Iconbox
          Icon={<BusinessIcon className={icon_box_icon} />}
          title="Best offer"
          details1="We give the best offer for our"
          details2="valuable customers"
        />
        <Iconbox
          Icon={<LocalShippingIcon className={icon_box_icon} />}
          title="Fast delivery"
          details1="We have delivery van for"
          details2="fast delivery"
        />
      </div>
    </div>
  );
}

export default WhyChooseeUs;
