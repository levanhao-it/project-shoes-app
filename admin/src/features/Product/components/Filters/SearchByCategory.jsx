import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  makeStyles,
  Menu,
  MenuItem,
  Popover,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

SearchByCategory.propTypes = {};

const useStyle = makeStyles((theme) => ({
  btn: {
    padding: theme.spacing(1, 2),
    "& > span": {
      fontWeight: "bold",
      textTransform: "capitalize",
    },
  },
}));

function SearchByCategory(props) {
  const classes = useStyle();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClickCategory = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseCategory = () => {
    setAnchorEl(null);
  };

  return (
    <Box padding={1}>
      <Button
        endIcon={<ExpandMoreIcon />}
        className={classes.btn}
        onClick={handleClickCategory}
      >
        Category
      </Button>
      <Popover
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseCategory}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <MenuItem>
          <FormControlLabel control={<Checkbox name="men" />} label="Men" />
        </MenuItem>
        <MenuItem>
          <FormControlLabel control={<Checkbox name="men" />} label="Woman" />
        </MenuItem>
        <MenuItem>
          <FormControlLabel control={<Checkbox name="men" />} label="Kids" />
        </MenuItem>
      </Popover>
    </Box>
  );
}

export default SearchByCategory;
