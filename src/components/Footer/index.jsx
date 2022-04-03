import { Button, Container } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import React from 'react';
import './styles.scss';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { makeStyles } from '@mui/styles';
import Register from '../../features/Auth/components/Register';

Footer.propTypes = {};

const useStyles = makeStyles((theme) => ({
  dialog: {
    fontSize: '1.6rem',
  },
}));

function Footer(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  return (
    <div className="footer">
      <Container maxWidth="lg" fixed className="footer__container">
        <img
          className="footer__img"
          src="http://nouthemes.net/html/trueshoes/images/logo-white.png"
        ></img>

        <Box sx={{ width: '100%' }}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid className="footer__address" item xs={12} sm={12} md={3} lg={3} xl={3}>
              <h3>ADDRESS OFFICE 1</h3>
              <ul className="footer__address__content">
                <li>
                  <strong>Nguyen Trai, District 1, Ho Chi Minh City</strong>
                </li>
                <li>Email: support@store.com</li>
                <li>Phone: +1 (212) 998 8888</li>
              </ul>
            </Grid>
            <Grid className="footer__address" item xs={12} sm={12} md={3} lg={3} xl={3}>
              <h3>ADDRESS OFFICE 2</h3>
              <ul className="footer__address__content">
                <li>
                  <strong>Quarter 6, Thu Duc, Ho Chi Minh City</strong>
                </li>
                <li>Email: support@store.com</li>
                <li>Phone: +1 (212) 998 8888</li>
              </ul>
            </Grid>
            <Grid className="footer__address" item xs={12} sm={12} md={2} lg={2} xl={2}>
              <h3>GET HELP</h3>
              <ul className="footer__address__content">
                <li>
                  <a>Order Status</a>
                </li>
                <li>
                  <a>Shipping Delivery</a>
                </li>
                <li>
                  <a>Return</a>
                </li>
                <li>
                  <a>Payment Options</a>
                </li>
                <li>
                  <a onClick={handleClickOpen}>Contact Us</a>
                </li>
              </ul>
            </Grid>
            <Grid className="footer__address" item xs={12} sm={12} md={2} lg={2} xl={2}>
              <h3>PRODUCTS</h3>
              <ul className="footer__address__content">
                <li>
                  <a>Shoes</a>
                </li>
                <li>
                  <a>Clothing</a>
                </li>
                <li>
                  <a>Accessries</a>
                </li>
                <li>
                  <a>Football Boots</a>
                </li>
              </ul>
            </Grid>

            <Grid className="footer__address" item xs={12} sm={12} md={2} lg={2} xl={2}>
              <Grid item xs={2}>
                <ul className="footer__address__icons">
                  <li>
                    <a>
                      <ion-icon name="logo-facebook"></ion-icon>
                    </a>
                  </li>
                  <li>
                    <a>
                      <ion-icon name="logo-instagram"></ion-icon>
                    </a>
                  </li>
                  <li>
                    <a>
                      <ion-icon name="logo-youtube"></ion-icon>
                    </a>
                  </li>
                  <li>
                    <a>
                      <ion-icon name="logo-twitter"></ion-icon>
                    </a>
                  </li>
                </ul>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose} onBackdropClick>
        <DialogContent>
          <Register />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Footer;
