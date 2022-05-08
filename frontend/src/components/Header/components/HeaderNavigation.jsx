import { Badge, Box } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/core/styles';
import { FavoriteBorder, ShoppingCartOutlined } from '@material-ui/icons';
import SearchIcon from '@material-ui/icons/Search';
import { HEADER_NAVIGATION } from 'constant';
import React from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',

    padding: theme.spacing(0, 4),
    height: `${HEADER_NAVIGATION}`
  },

  left: {

  },

  right: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
  },

  logo: {
    width: '150px'
  },

  nav: {

  },

  link: {
    listStyleType: 'none',
    color: '#000',
    padding: theme.spacing(2,3),
    textDecoration: 'none',

    '&:hover': {
      borderBottom: '2px solid #000'
    }
  },

  search: {
    position: 'absolute',
    top: '28px',
    right: '130px',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#f5f5f5',
    '&:hover': {
      backgroundColor: '#e5e5e5',
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function HeaderNavigation() {
  const classes = useStyles();

  return (
    <Box className={classes.root} >
          <Box className={classes.left}>
            <Link to="/">
              <img src="http://nouthemes.net/html/trueshoes/images/logo.png" alt=""  className={classes.logo}/>
            </Link>
          </Box>

          <Box className={classes.nav}>
            <Link to='/' className={classes.link}>Home</Link>
            <Link to='/products/men' className={classes.link}>Men</Link>
            <Link to='/products/woman'className={classes.link} >Woman</Link>
            <Link to='/products/kids' className={classes.link}>Kids</Link>
            <Link to='/contact' className={classes.link}>Contact</Link>
          </Box>

          <Box className={classes.right}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={1} color="primary" >
                <FavoriteBorder />
              </Badge>
            </IconButton>

            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={1} color="primary" >
                <ShoppingCartOutlined/>
              </Badge>
            </IconButton>
          </Box>
    </Box>
  );
}
