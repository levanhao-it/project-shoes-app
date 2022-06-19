import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import categoryApi from "components/api/category";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";

SelectField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
}));

function SelectField(props) {
  const { form, name, label, disabled } = props;
  const { errors } = form;
  const hasError = errors[name];
  const [categories, setCategories] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesList = await categoryApi.getAll();
      const categoriesFormat = categoriesList.map((x) => {
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
    <FormControl error={hasError} fullWidth margin="normal" variant="outlined">
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Controller
        name={name}
        control={form.control}
        as={
          <Select>
            {categories.map((x) => {
              return <MenuItem value={x.id}>{x.name}</MenuItem>;
            })}
          </Select>
        }
        label={label}
        disabled={disabled}
        error={!!hasError}
        helperText={errors[name]?.message}
      />
    </FormControl>
  );
}

export default SelectField;
