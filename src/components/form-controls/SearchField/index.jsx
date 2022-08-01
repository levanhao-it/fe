import { InputBase, makeStyles, TextField } from "@material-ui/core";

import PropTypes from "prop-types";
import React from "react";
import { Controller } from "react-hook-form";

SearchField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  params: PropTypes.object,

  disabled: PropTypes.bool,
};
const useStyles = makeStyles((theme) => ({
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function SearchField(props) {
  const { form, name, label, disabled } = props;
  const { errors } = form;
  const hasError = errors[name];
  const classes = useStyles();

  return (
    <Controller
      name={name}
      control={form.control}
      as={InputBase}
      // as={TextField}
      fullWidth
      margin="normal"
      variant="outlined"
      label={label}
      disabled={disabled}
      error={!!hasError}
      helperText={errors[name]?.message}
      id="outlined-size-normal"
      placeholder="Search..."
      classes={{
        root: classes.inputRoot,
        input: classes.inputInput,
      }}

      // defaultValue="Normal"
    />
  );
}

export default SearchField;
