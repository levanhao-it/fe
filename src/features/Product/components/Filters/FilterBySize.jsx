import {
  Box,
  Button,
  Collapse,
  makeStyles,
  Typography,
} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import sizeApi from "api/sizeApi";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

FilterBySize.propTypes = {
  onChange: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    borderBottom: "1px solid #e5e5e5",
    paddingBottom: "25px",
    marginBottom: "25px",
  },

  menu: {
    padding: 0,
    margin: 0,
    listStyleType: "none",

    "& > li": {
      marginTop: theme.spacing(1),
      transition: "all .25s",

      "&:hover": {
        color: theme.palette.primary.dark,
        cursor: "pointer",
      },
    },
  },
  h5: {
    fontFamily: '"Archivo Narrow", sans-serif',
    fontSize: "14px",
    fontWeight: "bold",
    color: "#000",
    textTransform: "uppercase",
  },
  li: {
    position: "relative",
    display: "block",
    fontSize: "14px",
    color: "#313131",
    marginBottom: "20px",
    paddingLeft: "30px",
    textTransform: "uppercase",
    "&:hover": {
      color: "#2AC37D",
    },
  },
  boxTitle: {
    borderTop: "none",
    height: "20px",
    padding: "20px",
    cursor: "pointer",
  },
  content: {
    borderBottom: "1px solid #e5e5e5",
  },
  size: {
    width: "60px",
    height: "60px",
    border: "1px solid #e9ecef",
    marginBottom: "-1px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#000",
      color: "#fff",
    },
  },

  sizeActive: {
    backgroundColor: "#000",
    color: "#fff",
  },

  boxBtn: {
    display: "flex",
    flexFlow: "row wrap",
    padding: "0 45px",
    listStyle: "none",
  },
}));

function FilterBySize({ onChange }) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [sizes, setSizes] = useState([]);
  const [sizeActive, setSizeActive] = useState({});
  const handleClickOpen = () => {
    setOpen(!open);
  };

  const handleSizeClick = (size) => {
    if (!onChange) return;
    setSizeActive(size);
    onChange({ size: size.name });
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await sizeApi.getAll();
        setSizes(data);
      } catch (error) {
        console.log("Failed to fetch sizes", error);
      }
    })();
  }, []);

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        className={classes.boxTitle}
        onClick={handleClickOpen}
      >
        <Typography variant="h5" className={classes.h5}>
          Size
        </Typography>
        <Box>{open ? <ExpandLess /> : <ExpandMore />}</Box>
      </Box>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box className={classes.boxBtn}>
          {sizes.map((size) => (
            <li
              className={
                classes.size +
                " " +
                (sizeActive.id === size.id ? classes.sizeActive : "")
              }
              key={size.id}
              onClick={() => handleSizeClick(size)}
            >
              {size.name}
            </li>
          ))}
        </Box>
      </Collapse>
    </Box>
  );
}

export default FilterBySize;
