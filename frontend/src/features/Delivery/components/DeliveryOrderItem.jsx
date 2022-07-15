import React from "react";
import PropTypes from "prop-types";
import { Box, makeStyles, Typography } from "@material-ui/core";

DeliveryOrderItem.propTypes = {};

const useStyle = makeStyles((theme) => ({
  root: {
    marginTop: "15px",
  },
  imgProduct: {
    width: "90px",
    height: "90px",
  },
  title: {
    fontSize: "14px",
  },
  containerInfo: {
    paddingLeft: "15px",
  },
}));

function DeliveryOrderItem(props) {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <Box display="flex">
        <img
          src="https://assets.adidas.com/images/w_280,h_280,f_auto,q_auto:sensitive/b6d8b1beb4214b0fb5aead4a00a3ffb9_9366/GV7699_580_GV7699_01_standard.jpg.jpg?sh=364&strip=false&sw=364"
          alt="giay"
          className={classes.imgProduct}
        />

        <Box className={classes.containerInfo}>
          <Box>
            <Typography variant="p" className={classes.title}>
              ZX 5K BOOST Shoes
            </Typography>
          </Box>

          <Box>
            <Typography variant="p" className={classes.title}>
              {" "}
              COLOR: <Typography variant="p">Semi Screaming Green </Typography>
            </Typography>
          </Box>

          <Box>
            <Typography variant="p" className={classes.title}>
              {" "}
              SIZE: <Typography variant="p">6.5</Typography>/ Quanlity:{" "}
              <Typography variant="p">1</Typography>
            </Typography>
          </Box>

          <Box>
            <Typography variant="p" className={classes.title}>
              $150
            </Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default DeliveryOrderItem;
