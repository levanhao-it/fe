import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import AddressEdit from "./AddressEdit";
import { useSnackbar } from "notistack";
import addressApi from "api/addressApi";
import StorageKeys from "constant/storage-keys";
import AddressDelete from "./AddressDelete";

AddressDetail.propTypes = {
  data: PropTypes.object,
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func,
};

const useStyle = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  title: {
    width: "120px",
    color: "#aa9c90",
    fontSize: "14px",
  },
  box: {
    display: "flex",
    alignItems: "center",
    marginBottom: "6px",
  },
  chip: {
    marginLeft: theme.spacing(1),
  },
  btn: {
    "& > span": {
      textTransform: "capitalize",
    },
  },

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

const MODE = {
  DELETE: "delete",
  UPDATE: "update",
};

function AddressDetail({ data, onDelete, onUpdate }) {
  const classes = useStyle();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.UPDATE);
  const { enqueueSnackbar } = useSnackbar();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickEdit = () => {
    setMode(MODE.UPDATE);
    handleClickOpen();
  };

  const handleClickDelete = () => {
    setMode(MODE.DELETE);
    handleClickOpen();
  };

  const handleSetDefault = async () => {
    try {
      const values = {
        defaultAddress: true,
        email: JSON.parse(localStorage.getItem(StorageKeys.USER)).email || "",
      };
      await addressApi.update(data.id, values);

      const email =
        JSON.parse(localStorage.getItem(StorageKeys.USER)).email || "";
      const result = await addressApi.getAll({ email });

      onUpdate(result.data);
      enqueueSnackbar("Set default for your address successfully!", {
        variant: "success",
        autoHideDuration: 1000,
      });
    } catch (error) {
      console.log("Fail to set default for your address: ", error.message);
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 1000,
      });
    }
  };

  const handleChangeEditAddress = (data) => {
    onUpdate(data);
  };

  return (
    <>
      <Divider />
      <Box className={classes.root}>
        <Grid container>
          <Grid xs={12} sm={10} md={10} lg={10} item>
            <Box className={classes.box}>
              <Typography
                component="p"
                variant="span"
                className={classes.title}
              >
                Full Name
              </Typography>

              <Typography component="p" variant="span">
                {data.fullName}
              </Typography>

              {data.defaultAddress && (
                <>
                  <Chip
                    label="Default"
                    size="small"
                    color="primary"
                    className={classes.chip}
                  />
                  <Chip
                    label="Pickup"
                    variant="outlined"
                    size="small"
                    color="primary"
                    className={classes.chip}
                  />
                  <Chip
                    label="Return address"
                    variant="outlined"
                    size="small"
                    color="primary"
                    className={classes.chip}
                  />
                </>
              )}
            </Box>

            <Box className={classes.box}>
              <Typography
                component="p"
                variant="span"
                className={classes.title}
              >
                Phone
              </Typography>

              <Typography component="p" variant="span">
                {data.phoneNumber}
              </Typography>
            </Box>

            <Box className={classes.box}>
              <Typography
                component="p"
                variant="span"
                className={classes.title}
              >
                Address
              </Typography>

              <Typography component="p" variant="span">
                {data.address}
              </Typography>
            </Box>
          </Grid>
          <Grid xs={12} sm={2} md={2} lg={2} item>
            <Box mb={2}>
              <Button
                size="small"
                color="primary"
                className={classes.btn}
                onClick={handleClickEdit}
              >
                Edit
              </Button>

              {!data.defaultAddress && (
                <Button
                  size="small"
                  color="secondary"
                  className={classes.btn}
                  onClick={handleClickDelete}
                >
                  Delete
                </Button>
              )}
            </Box>

            <Button
              variant="outlined"
              size="medium"
              className={classes.btn}
              disabled={data.defaultAddress}
              onClick={handleSetDefault}
            >
              Set as default
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Dialog open={open} onClose={handleClose} disableEscapeKeyDown>
        <DialogContent>
          {mode === MODE.UPDATE && (
            <>
              <AddressEdit
                data={data}
                closeDialog={handleClose}
                handelSubmitSuccess={handleChangeEditAddress}
              />
            </>
          )}

          {mode === MODE.DELETE && (
            <>
              <AddressDelete
                data={data}
                closeDialog={handleClose}
                handelSubmitSuccess={handleChangeEditAddress}
              />
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddressDetail;
