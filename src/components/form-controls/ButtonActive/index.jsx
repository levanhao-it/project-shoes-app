import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

ButtonActive.propTypes = {
  
};

const useStyle = makeStyles((theme) => ({
  root: {
    backgroundColor: '#000',
    color: '#fff',
    height: '50px',
    fontSize: '16px',
    fontWeight: '600',
    padding: '0 12px',
    marginTop: '10px',
    minWidth: '250px',
    borderRadius: '0',
    '&::before': {
      content: "",
      display: "block",
      width: "200px",
      height: "50px",
      left: "2px",
      top: "2px",
      border: "1px solid #000"
    },
    '&:hover': {
      backgroundColor: "#000",
      color: '#ccc',
    }
  }
}))

function ButtonActive(props) {
  const {content, widthBtn} = props;
  const classes = useStyle(props);
  return (
      <Button className={classes.root} style={{ width: {widthBtn} }}>
        {content}
      <ArrowRightAltIcon fontSize="large" />
    </Button>
   
  );
}

export default ButtonActive;