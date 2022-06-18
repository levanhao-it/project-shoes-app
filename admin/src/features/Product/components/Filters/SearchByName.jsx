import React from "react";
import PropTypes from "prop-types";
import { Box, InputAdornment, SvgIcon, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

SearchByName.propTypes = {};

function SearchByName(props) {
  return (
    <div>
      <Box>
        <TextField
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SvgIcon fontSize="small" color="action">
                  <SearchIcon />
                </SvgIcon>
              </InputAdornment>
            ),
          }}
          placeholder="Search product"
          variant="outlined"
        />
      </Box>
    </div>
  );
}

export default SearchByName;
