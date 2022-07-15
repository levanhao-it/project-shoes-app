import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import { useForm } from "react-hook-form";
import AirportShuttleOutlinedIcon from "@material-ui/icons/AirportShuttleOutlined";
import StoreMallDirectoryOutlinedIcon from "@material-ui/icons/StoreMallDirectoryOutlined";
import InputField from "components/form-controls/InputField";
import ButtonActive from "components/component-custom/ButtonActive";
import DeliveryOption from "./DeliveryOption";

DeliveryForm.propTypes = {};

const useStyle = makeStyles((theme) => ({
  headingTitle: {
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: "26px",
  },
  subHeading: {
    fontSize: "16px",
  },
  iconDelivery: {
    fontSize: "20px",
  },
}));

function DeliveryForm(props) {
  const classes = useStyle();
  const form = useForm({
    defaultValues: {
      fullName: "",
      address: "",
      email: "",
      phone: "",
      locationStore: "",
    },
  });
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <form>
      <Box mt={4}>
        <Typography variant="h3" className={classes.headingTitle}>
          Shipping Adrress
        </Typography>
        <InputField name="fullName" label="Full Name *" form={form} />
        <InputField name="address" label="Delivery address *" form={form} />
      </Box>

      <Box mt={4}>
        <Typography variant="h3" className={classes.headingTitle}>
          Contact details
        </Typography>
        <Typography variant="p" className={classes.subHeading}>
          We'll use these details to keep you informed on your delivery.
        </Typography>
        <Grid container spacing={matches ? 0 : 2}>
          <Grid item xs={12} md={6}>
            <InputField name="email" label="Email *" form={form} />
          </Grid>
          <Grid item xs={12} md={6}>
            <InputField name="phone" label="Phone *" form={form} />
          </Grid>
        </Grid>
      </Box>

      <Box mt={4}>
        <Typography variant="h3" className={classes.headingTitle}>
          Delivery options
        </Typography>

        <DeliveryOption
          titleDelivery="Standard Delivery"
          descDelivery="Enter your address to see when you'll get your order"
          icon={<AirportShuttleOutlinedIcon className={classes.iconDelivery} />}
          active
        />
        <DeliveryOption
          titleDelivery="Pick up a order at the store"
          descDelivery="Pay now and find a store near you"
          icon={
            <StoreMallDirectoryOutlinedIcon className={classes.iconDelivery} />
          }
        />
      </Box>
      <ButtonActive
        content="Review and pay"
        widthBtn={matches ? "100%" : "50%"}
        type="submit"
      />
    </form>
  );
}

export default DeliveryForm;
