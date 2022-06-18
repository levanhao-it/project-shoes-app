import React from "react";
import PropTypes from "prop-types";
import SearchByName from "./Filters/SearchByName";
import { Box, Divider, makeStyles } from "@material-ui/core";
import FilterViewer from "./Filters/FilterViewer";
import SearchByCategory from "./Filters/SearchByCategory";
import ProductSort from "./Filters/ProductSort";

ProductFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  onChange: PropTypes.func,
};

const useStyle = makeStyles((theme) => ({
  boxFilter: {
    display: "flex",
  },
}));

function ProductFilters({ filters, onChange }) {
  const classes = useStyle();
  return (
    <Box mt={4}>
      <SearchByName />
      <FilterViewer />
      <Divider />
      <Box className={classes.boxFilter}>
        <SearchByCategory />
        <ProductSort />
      </Box>
    </Box>
  );
}

export default ProductFilters;
