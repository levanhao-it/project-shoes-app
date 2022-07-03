import { Box, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { Close, SortSharp } from "@material-ui/icons";
import React from "react";
import FilterByBrand from "../Filters/FilterByBrand";
import FilterByCategory from "../Filters/FilterByCategory";
import FilterByColor from "../Filters/FilterByColor";
import FilterByPrice from "../Filters/FilterByPrice";
import FilterBySize from "../Filters/FilterBySize";
import FilterByWidth from "../Filters/FilterByWidth";
import ProductSort from "../Filters/ProductSort";
import PropTypes from "prop-types";
import "./styles.scss";

FilterAndSort.propTypes = {
  filters: PropTypes.object.isRequired,
  onChange: PropTypes.func,
};

const useStyles = makeStyles({
  h6: {
    fontSize: "14px",
    textTransform: "capitalize",
    fontWeight: "bold",
    marginRight: "5px",
  },
  btn: {
    border: "1px solid #000",
    height: "40px",
    borderRadius: "0px",
  },
  boxTitle: {
    borderTop: "none",
    borderBottom: "1px solid #e9ecef",
    height: "20px",
    padding: "20px",
  },
  title: {
    fontSize: "20px",
    fontWeight: "700",
  },
  close: {
    cursor: "pointer",
  },
});

function FilterAndSort({ filters, onChange }) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleSortChange = (values) => {
    if (!onChange) return;
    const newFilters = {
      ...filters,
      sort: values,
    };

    onChange(newFilters);
  };

  return (
    <div className="sideBar">
      <Button onClick={toggleDrawer("right", true)} className={classes.btn}>
        <Typography className={classes.h6} variant="h6">
          Filter & Sort
        </Typography>
        <SortSharp />
      </Button>
      <SwipeableDrawer
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
        onOpen={toggleDrawer("right", true)}
        disableDiscovery={true}
      >
        <List className={classes.root}>
          <Box
            display="flex"
            justifyContent="space-between"
            className={classes.boxTitle}
          >
            <Typography className={classes.title}>Filter & Sort</Typography>
            <Close
              onClick={toggleDrawer("right", false)}
              className={classes.close}
            />
          </Box>
          <ProductSort onChange={handleSortChange} currentSort={filters.sort} />
          <FilterByCategory />
          <FilterByPrice />
          <FilterByBrand />
          <FilterByWidth />
          <FilterBySize />
          <FilterByColor />
        </List>
      </SwipeableDrawer>
    </div>
  );
}

export default FilterAndSort;
