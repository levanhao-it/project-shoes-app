import { Box, Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

AccountPage.propTypes = {
  
};

const useStyle = makeStyles(() => ({
  root: {
    backgroundColor: '#fff',
    padding: '32px 16px',
    marginBottom: '30px'
  },
  heading: {
    fontSize: '30px',
    marginTop: '15px',
    textTransform: 'uppercase',
    fontWeight: '700'
  },
  subHeding: {
    fontSize: '16px',
    marginTop: '10px'
  },
  container: {
    marginTop: '60px',
  },
  content: {
    fontSize: '15px',
    textTransform: 'uppercase',
    marginTop: '10px'
  },
  edit:{
    display: 'inline-block',
    fontSize: '15px',
    textTransform: 'uppercase',
    marginTop: '10px',
    textDecoration: 'underline',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#000',
      color: '#fff',
      cursor: 'pointer'
    }
  },
  headingTitle: {
    fontSize: '20px',
    textTransform: 'uppercase',
    marginTop: '15px',
    fontWeight: 'bold'
  },
  containerItem: {
    marginTop: '40px'
  },
  btnActive: {
    borderRadius: '0',
    marginTop: '10px',
    height: '48px',
    width: '50%',
    color: '#000',
    fontWeight: 'bold',
    border: '2px solid #000'
  },
  link: {
    display: "block",
    textDecoration: "none",
    marginBottom: '5px',
    color: '#000',
    "&:hover" : {
      backgroundColor: '#000',
      color: '#fff'
    }
  }
  
}))

const MODE = {
  'INFORMATION': 'infomation',
  'EMAIL': 'email',
  'PASSWORD': 'password'
}

function AccountPage(props) {
  const classes = useStyle();

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.INFORMATION);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Box>
        <Box className={classes.root}>
        <Box>
          <Typography variant='h5' component='h5' className={classes.heading}>My details</Typography>
          <Typography variant='p' component='p' className={classes.subHeding}>Feel free to edit any of your details below so your account is up to date.</Typography>
        </Box>

        <Box className={classes.container}>
          <Typography variant='h5' component='h5' className={classes.heading}>DETAILS</Typography>
          <Typography variant='p' component='p' className={classes.content}>Huy le</Typography>
          <Typography variant='p' component='p' className={classes.content}>29-02-2000</Typography>
          <Typography variant='p' component='p' className={classes.content}>Male</Typography>
          <Typography variant= 'p' component='span' className={classes.edit} onClick={handleClickOpen}>Edit</Typography>
        </Box>

        <Box className={classes.container}>
          <Typography variant='h5' component='h5' className={classes.heading}>Login details</Typography>

          <Box className={classes.containerItem}>
            <Typography variant='p' component='p' className={classes.headingTitle}>Email</Typography>
            <Typography variant='p' component='p' className={classes.content}>huyle123@gmail.com</Typography>
            <Typography variant= 'p' component='span' className={classes.edit} onClick={handleClickOpen}>Edit</Typography>
          </Box>

          <Box className={classes.containerItem}>
            <Typography variant='p' component='p' className={classes.headingTitle}>Password</Typography>
            <Typography variant='p' component='p' className={classes.content}>***********</Typography>
            <Typography variant= 'p' component='span' className={classes.edit} onClick={handleClickOpen}>Edit</Typography>
          </Box>

          <Box className={classes.containerItem}>
            <Typography variant='p' component='p' className={classes.headingTitle}>LOG OUT FROM ALL WEB BROWSERS</Typography>
            <Typography variant='p' component='p' className={classes.subHeding}>This will log you out from all web browsers you have used to access the adidas website. To log in again, you'll have to enter your credentials.</Typography>
            <Button variant="outlined" className={classes.btnActive}> Log me out <ArrowRightAltIcon /> </Button>
          </Box>

          <Box className={classes.containerItem}>
            <Typography variant='p' component='p' className={classes.headingTitle}>MANAGE ACCOUNT</Typography>
            <Button variant="outlined" className={classes.btnActive}>Delete account <ArrowRightAltIcon /></Button>
            <Typography variant='p' component='p' className={classes.subHeding}>By deleting your account you will no longer be a member of the adidas adiClub.</Typography>
            
          </Box>
        
        </Box>
        </Box>

        <Box className={classes.footer}>
          <Typography variant='p' component='p' className={classes.headingTitle}>Nedd help ?</Typography>

          <Box className={classes.root} mt={2}>
            <Grid container spacing={4}>
              <Grid item xs={3}>
                <Link path="" className={classes.link}>Products</Link>
                <Link path="" className={classes.link}>Ordering & Payments</Link>
                <Link path="" className={classes.link}>Delivery</Link>
              </Grid>
              <Grid item xs={3}>
                <Link path="" className={classes.link}>Promotion & Voucher</Link>
                <Link path="" className={classes.link}>Returns & Refunds</Link>
                <Link path="" className={classes.link}>Account & Newsletter</Link>
              </Grid>
              <Grid item xs={3}>
              <Link path="" className={classes.link}>Company Information</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>

      <Dialog
        // disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        {/* <IconButton className={classes.closeButton} onClick={handleClose}>
          <Close />
        </IconButton> */}

        <DialogContent>
          {/* {mode === MODE.INFORMATION && (
            <>
              <Register closeDialog={handleClose} />

              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
                  Already have an account. Login here
                </Button>
              </Box>
            </>
          )} */}

          {/* {mode === MODE.PASSWORD && (
            <>
              <Login closeDialog={handleClose} />

              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode(MODE.REGISTER)}>
                  Dont have an account. Register here
                </Button>
              </Box>
            </>
          )} */}

          {/* {mode === MODE.EMAIL && (
            <>
              <Login closeDialog={handleClose} />

              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode(MODE.REGISTER)}>
                  Dont have an account. Register here
                </Button>
              </Box>
            </>
          )} */}
        </DialogContent>
      </Dialog>
    </div>
    
  );
}

export default AccountPage;