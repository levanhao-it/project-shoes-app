import React from 'react';
import PropTypes from 'prop-types';
import HomeSlider from './components/HomeSlider';
import { Box } from '@material-ui/core';

Home.propTypes = {};

function Home(props) {
  return (
    <Box>
      <HomeSlider />
      <></>
    </Box>
  );
}

export default Home;
