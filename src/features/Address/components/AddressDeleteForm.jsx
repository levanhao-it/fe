import React from "react";
import PropTypes from "prop-types";
import { Box, Button, makeStyles, Typography } from "@material-ui/core";

AddressDeleteForm.propTypes = {
  onSubmit: PropTypes.func,
  closeDialog: PropTypes.func,
};

const useStyle = makeStyles((theme) => ({
  titleDialog: {
    padding: theme.spacing(1, 20, 5, 0),
  },

  btnCancel: {
    marginLeft: theme.spacing(1),
  },

  boxBtn: {
    textAlign: "right",
  },
}));

function AddressDeleteForm({ onSubmit, closeDialog }) {
  const classes = useStyle();
  const handleDeleteAddress = () => {
    if (onSubmit) onSubmit();
  };
  return (
    <Box>
      <Typography component="h2" variant="h6" className={classes.titleDialog}>
        Delete address ?
      </Typography>
      <Box className={classes.boxBtn}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleDeleteAddress}
        >
          Delete
        </Button>
        <Button
          variant="outlined"
          color="default"
          className={classes.btnCancel}
          onClick={closeDialog}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
}

export default AddressDeleteForm;
