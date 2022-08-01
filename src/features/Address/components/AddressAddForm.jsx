import React, { useState } from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Grid } from "swiper";
import InputField from "components/form-controls/InputField";
import ButtonActive from "components/component-custom/ButtonActive";
import StorageKeys from "constant/storage-keys";

AddressAddForm.propTypes = {
  onSubmit: PropTypes.func,
  closeDialog: PropTypes.func,
};

const schema = yup.object().shape({
  fullName: yup
    .string()
    .required("Please enter full name")
    .test(
      "Should has at least two words",
      "Please enter at least two words",
      (value) => {
        const words = value.split(" ");
        return words.length >= 2;
      }
    ),

  phoneNumber: yup
    .string()
    .required("Please enter phone number")
    .min(10, "Phone number must be at least 10 characters"),

  address: yup.string().required("Please enter address"),
});

const useStyle = makeStyles((theme) => ({
  btnCancel: {
    marginLeft: theme.spacing(1),
  },
  boxBtn: {
    textAlign: "right",
  },
}));

function AddressAddForm({ onSubmit, closeDialog }) {
  const classes = useStyle();
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const form = useForm({
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      address: "",
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const handelSubmit = async (values) => {
    const email =
      JSON.parse(localStorage.getItem(StorageKeys.USER)).email || "";
    values.defaultAddress = checked;
    values.email = email;
    if (onSubmit) {
      await onSubmit(values);
    }
    form.reset();
  };

  const handleCloseDialog = () => {
    if (closeDialog) closeDialog();
  };

  return (
    <Box>
      <Typography component="h2" variant="h6">
        Edit Address
      </Typography>
      <form onSubmit={form.handleSubmit(handelSubmit)}>
        <InputField name="fullName" label="Full Name" form={form} />

        <InputField name="phoneNumber" label="Phone" form={form} />

        <InputField name="address" label="Address" form={form} />
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={handleChange}
              name="checkedB"
              color="primary"
            />
          }
          label="Set as default address"
        />
        <Box className={classes.boxBtn}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
          <Button
            variant="outlined"
            color="default"
            className={classes.btnCancel}
            onClick={handleCloseDialog}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default AddressAddForm;
