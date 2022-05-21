import { Badge, Box, Divider, Drawer, Hidden, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/core/styles';
import { FavoriteBorder, ShoppingCartOutlined } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { HEADER_NAVIGATION } from 'constant';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import ReceiptIcon from '@material-ui/icons/Receipt';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',

    padding: theme.spacing(0, 4),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0,2)
    },

    [theme.breakpoints.up('xs')]: {
      padding: theme.spacing(0,2)
    },
    height: `${HEADER_NAVIGATION}`
  },

  drawer: {
    width: '320px',
    maxWidth: '100%'
  },

  right: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
  },

  logo: {
    width: '150px'
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

  mobileLink: {
    paddingLeft: '56px',
    '& > span' : {
      fontWeight: 'bold',
    }
  },

  mobileList: {
    width: '320px',
    padding: '0 20px',
    maxWidth: '100%',
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
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (isOpen) => {
    setOpenDrawer(isOpen)
  }

  return (
    <Box className={classes.root} >
      <Hidden mdUp>
        <>
          <IconButton onClick={() => toggleDrawer(true)}>
            <MenuIcon fontSize='large'/>
          </IconButton>
          
          <Drawer open={openDrawer} onClose={() => toggleDrawer(false)}>
            <Box display="flex" justifyContent='right'>
                <IconButton color="default" aria-label="add to shopping cart" onClick={() => toggleDrawer(false)}>
                  <CloseIcon size='large'/>
                </IconButton>
            </Box>
         
            <Box className={classes.mobileList} onClick={() => toggleDrawer(false)}>
              <List component="nav" aria-label="main mailbox folders">
                <ListItem button component={Link} to='/' >
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItem>

                <ListItem button component={Link} to='/products/men' >
                  <ListItemText primary="Men" className={classes.mobileLink} />
                </ListItem>

                <ListItem button component={Link} to='/products/woman' >
                  <ListItemText primary="Woman" className={classes.mobileLink}/>
                </ListItem>

                <ListItem button component={Link} to='/produts/kids' >
                  <ListItemText primary="Kids" className={classes.mobileLink}/>
                </ListItem>
              </List>
            <Divider />

            <List component="nav" aria-label="main mailbox folders">
                <ListItem button component={Link} to='/user'>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary="Account" />
                </ListItem>

                <ListItem button component={Link} to='/user/order'>
                  <ListItemIcon>
                    <ReceiptIcon />
                  </ListItemIcon>
                  <ListItemText primary="My orders" />
                </ListItem>

                <ListItem button component={Link} to='/user/wishList'>
                  <ListItemIcon>
                    <FavoriteIcon />
                  </ListItemIcon>
                  <ListItemText primary="My wishList" />
                </ListItem>

                <ListItem button component={Link} to='/login' >
                  <ListItemIcon>
                    <ExitToAppIcon />
                  </ListItemIcon>
                  <ListItemText primary="Log In" />
                </ListItem>

                {/* <ListItem button component={Link} to='/logout' >
                  <ListItemIcon>
                    <ExitToAppIcon />
                  </ListItemIcon>
                  <ListItemText primary="Log out" className={classes.mobileLink} />
                </ListItem> */}
              </List>

            </Box>
          </Drawer>
        </>
      </Hidden>
          <Box className={classes.left}>
            <Link to="/">
              <img src="http://nouthemes.net/html/trueshoes/images/logo.png" alt=""  className={classes.logo}/>
            </Link>
          </Box>
          <Hidden smDown>
            <Box className={classes.nav}>
              <Link to='/' className={classes.link}>Home</Link>
              <Link to='/products/men' className={classes.link}>Men</Link>
              <Link to='/products/woman'className={classes.link} >Woman</Link>
              <Link to='/products/kids' className={classes.link}>Kids</Link>
              <Link to='/contact' className={classes.link}>Contact</Link>
            </Box>
          </Hidden>
          

          <Box className={classes.right}>
            <Hidden smDown>
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
            </Hidden>
            
            
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
