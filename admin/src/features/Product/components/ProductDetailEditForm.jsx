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

ProductDetailEditForm.propTypes = {
  onSubmit: PropTypes.func,
  product: PropTypes.object,
  onDelete: PropTypes.func,
  onCancel: PropTypes.func,
};

const schema = yup.object().shape({
  salePrice: yup
    .number()
    .required("Please enter price")
    .min(1, "Price must be more than 0"),
  quantity: yup
    .number()
    .required("Please enter price")
    .min(1, "Price must be more than 0"),

  size: yup
    .number()
    .required("Please enter price")
    .min(1, "Price must be more than 0"),

  color: yup.string().required("Please choose color"),
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

function ProductDetailEditForm({ onSubmit, row, onDelete }) {
  const classes = useStyle();
  const [categories, setCategories] = useState([]);

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

  useEffect(() => {
    const fieldList = ["name", "description", "categoryId", "originalPrice"];
    fieldList.forEach((element, i) => {
      form.setValue(element, row[element]);
    });
  }, [row]);

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

  const handelSubmit = async (values) => {
    if (onSubmit) {
      values.categoryId = Number(values.categoryId);
      await onSubmit(values);
    }

    form.reset();
  };

  const handleDelete = async (id) => {
    if (onDelete) {
      await onDelete(id);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handelSubmit)}>
      <Grid container spacing={1}>
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

      <Box className={classes.boxFooter}>
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
          size="large"
          color="secondary"
          className={classes.btn}
          onClick={() => handleDelete(row.id)}
        >
          Delete product
        </Button>
      </Box>
    </form>
  );
}

export default ProductDetailEditForm;
