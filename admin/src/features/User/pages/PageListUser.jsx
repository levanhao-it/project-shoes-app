import { Box, Button, makeStyles, withStyles } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';
import userApi from 'components/api/userApi';
import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import UserList from '../components/UserList';

PageListUser.propTypes = {};

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  },
}))(Button);
const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  padding: {
    padding: '0 50px',
  },
  box: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  h1: {
    margin: '0 ',
  },
  icon: {
    float: 'right',
    position: 'absolute',
    top: '5px',
    right: '5px',
    cursor: 'pointer',
    fontSize: '30px',
  },
}));

function PageListUser(props) {
  const classes = useStyles();
  const history = useHistory();

  const [userList, setUserList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await userApi.getAllUser();
        setUserList(data);
      } catch (error) {
        console.log('Failed to fetch getAllUser list', error);
      }
    })();
  }, []);

  return (
    <div className={classes.padding}>
      <Box className={classes.box}>
        <h1 className={classes.h1}>Customers</h1>
        <ColorButton
          variant="contained"
          color="primary"
          className={classes.margin}
          component={Link}
          to="/users/add"
        >
          + Add
        </ColorButton>
      </Box>

      <UserList data={userList} />
    </div>
  );
}

export default PageListUser;
