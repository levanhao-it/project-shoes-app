import { Dialog, DialogContent, Link } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import { Rating } from '@material-ui/lab';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ProductReview from '../ProductReview';
import ProductReviewForm from '../ProductReviewForm';
import './styles.scss';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    marginTop: '60px',
  },
  tabTitle: {
      fontSize: '16px',
      fontWeight: '700',
      color: '#626262'
  },
  tabList: {
    boxShadow: 'none',
    backgroundColor: '#fff',
    borderBottom: '1px solid #ccc'
  },
  titleRating: {
    fontSize: '14px',
    marginLeft: '10px'
  },
  commentLink: {
    fontSize: '14px',
    textDecoration: 'underline',
    color: '#000',
    marginTop: '6px',
    cursor: 'pointer',
    display: 'block'
  }
}));

export default function ProductTabs() {
  const [openReview, setOpenReview] = useState(false);
  const classes = useStyles();
  const [value, setValue] = useState(0);


  const handleCloseReview = () => {
    setOpenReview(false)
  }

  const handleOpenReview = () => {
    setOpenReview(true)
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" className={classes.tabList}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          className={classes.tabs}
        >
          <Tab label="Overview" {...a11yProps(0)} className={classes.tabTitle} />
          <Tab label="Review" {...a11yProps(1)} className={classes.tabTitle} />
          <Tab label="Product tag" {...a11yProps(2)} className={classes.tabTitle} />
          <Tab label="Additional" {...a11yProps(3)} className={classes.tabTitle} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Typography>
        Caramels tootsie roll carrot cake sugar plum. Sweet roll jelly bear claw liquorice. Gingerbread lollipop dragée cake. Pie topping jelly-o. Fruitcake dragée candy canes tootsie roll. Pastry jelly-o cupcake. Bonbon brownie soufflé muffin.

Sweet roll soufflé oat cake apple pie croissant. Pie gummi bears jujubes cake lemon drops gummi bears croissant macaroon pie. Fruitcake tootsie roll chocolate cake Carrot cake cake bear claw jujubes topping cake apple pie. Jujubes gummi bears soufflé candy canes topping gummi bears cake soufflé cake. Cotton candy soufflé sugar plum pastry sweet roll..
        </Typography>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <>
          <Box display="flex" alignItems="center">
            <Rating name="read-only" defaultValue={3.5} precision={0.5} readOnly size='large'/>
            <Typography variant='p' className={classes.titleRating}>4.5 stars</Typography>
          </Box>

          <Link className={classes.commentLink} onClick={handleOpenReview}>Write a Review</Link>

          <ProductReview />
        </>
        


      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>



      <Dialog open={openReview} onClose={handleCloseReview} disableEscapeKeyDown>
        <DialogContent>
          <ProductReviewForm/>
        </DialogContent>
      </Dialog>
    </div>
  );
}
