import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@material-ui/core";

FilterViewer.propTypes = {};

function FilterViewer(props) {
  return (
    <Box padding={3}>
      <Typography component="p">No filters applied</Typography>
    </Box>
  );
}

export default FilterViewer;
