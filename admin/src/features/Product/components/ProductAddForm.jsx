import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "components/form-controls/InputField";
import { Box, Button, Grid, makeStyles } from "@material-ui/core";

import SelectField from "components/form-controls/SelectField";
import PriceField from "components/form-controls/PriceField";
import { useHistory } from "react-router-dom";
import categoryApi from "components/api/category";

ProductAddForm.propTypes = {
  onSubmit: PropTypes.func,
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

function ProductAddForm({ onSubmit }) {
  const classes = useStyle();
  const [categories, setCategories] = useState([]);
  const history = useHistory();
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

  const handleCancel = () => {
    history.push("/products");
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesList = await categoryApi.getAll();
      const categoriesFormat = categoriesList.data.map((x) => {
        return {
          id: x.id,
          name: x.name,
          code: x.code,
        };
      });

      setCategories(categoriesFormat);
    };

    fetchCategories();
  }, []);

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
          <SelectField
            name="categoryId"
            label="Category"
            form={form}
            values={categories}
          />
        </Grid>
        <Grid item xs={6}>
          <PriceField name="originalPrice" label="Price" form={form} />
        </Grid>
      </Grid>

      <Box mt={4}>
        <Button
          variant="contained"
          size="large"
          color="primary"
          className={classes.btn}
          style={{ marginRight: "16px" }}
          type="submit"
        >
          Submit
        </Button>

        <Button
          variant="outlined"
          size="large"
          color="primary"
          className={classes.btn}
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </Box>
    </form>
  );
}

export default ProductAddForm;
