import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "components/form-controls/InputField";
import { Box, Button, Grid, makeStyles } from "@material-ui/core";

import SelectField from "components/form-controls/SelectField";
import PriceField from "components/form-controls/PriceField";

ProductEditForm.propTypes = {
  onSubmit: PropTypes.func,
  product: PropTypes.object,
};

const schema = yup.object().shape({
  name: yup.string().required("Please enter name product"),
  description: yup
    .string()
    .required("Please enter description")
    .min(6, "Title must be at least 6 characters"),
  categoryId: yup.string().required("Please choose category"),
  originalPrice: yup
    .number()
    .required("Please enter price")
    .min(1, "Price must be more than 0"),
});
const useStyle = makeStyles((theme) => ({
  boxFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: theme.spacing(4, 0),
  },

  btn: {
    "& > span": {
      textTransform: "capitalize",
    },
  },
}));

function ProductEditForm({ onSubmit, product }) {
  const classes = useStyle();
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      categoryId: "",
      originalPrice: "",
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const handelSubmit = async (values) => {
    if (onSubmit) {
      values.categoryId = Number(values.categoryId);
      await onSubmit(values);
    }

    form.reset();
  };

  useEffect(() => {
    const fieldList = ["name", "description", "categoryId", "originalPrice"];
    fieldList.forEach((element, i) => {
      form.setValue(element, product[element]);
    });
  }, [product]);

  return (
    <form onSubmit={form.handleSubmit(handelSubmit)}>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <InputField name="name" label="Product Name" form={form} />
        </Grid>

        <Grid item xs={6}>
          <InputField name="description" label="Description" form={form} />
        </Grid>

        <Grid item xs={6}>
          <SelectField name="categoryId" label="Category" form={form} />
        </Grid>
        <Grid item xs={6}>
          <PriceField name="originalPrice" label="Price" form={form} />
        </Grid>
      </Grid>

      <Box className={classes.boxFooter}>
        <Box>
          <Button
            variant="contained"
            size="large"
            color="primary"
            className={classes.btn}
            style={{ marginRight: "16px" }}
            type="submit"
          >
            Update
          </Button>

          <Button
            variant="outlined"
            size="large"
            color="primary"
            className={classes.btn}
          >
            Cancel
          </Button>
        </Box>

        <Button size="large" color="secondary" className={classes.btn}>
          Delete product
        </Button>
      </Box>
    </form>
  );
}

export default ProductEditForm;
