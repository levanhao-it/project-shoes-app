import { InputBase, InputLabel, NativeSelect, Select, withStyles } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.

    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  text: {
    textTransform: 'uppercase',
  },
}));

ShortBy.propTypes = {};

function ShortBy(props) {
  const classes = useStyles();
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <FormControl className={classes.margin}>
      <NativeSelect
        id="demo-customized-select-native"
        value={age}
        onChange={handleChange}
        input={<BootstrapInput />}
        className={classes.text}
      >
        <option value={0} className={classes.text}>
          SHORTBY
        </option>
        <option value={10} className={classes.text}>
          NAME
        </option>
        <option value={20} className={classes.text}>
          PRICE (LOW TO HIGHT)
        </option>
        <option value={30} className={classes.text}>
          PRICE (HIGHT TO LOW )
        </option>
      </NativeSelect>
    </FormControl>
  );
}

export default ShortBy;
