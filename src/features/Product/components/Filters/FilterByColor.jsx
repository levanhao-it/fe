import {
  Box,
  Button,
  Collapse,
  makeStyles,
  Typography,
} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import CheckIcon from "@material-ui/icons/Check";
import colorApi from "api/colorSize";

FilterByColor.propTypes = {
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
  color: {
    width: `30px`,
    height: "30px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  boxColor: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "10px",
    minWidth: "70px",
    cursor: "pointer",
  },
  boxBtn: {
    display: "flex",
    flexFlow: "row wrap",
    padding: "0 45px",
    listStyle: "none",
  },

  nameSize: {
    fontSize: "12px",
    paddingTop: "2px",
  },
}));

function FilterByColor({ onChange }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [colors, setColors] = useState([]);
  const [colorActive, setColorActive] = useState({});

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await colorApi.getAll();
        setColors(data);

        console.log(data);
      } catch (error) {
        console.log("Failed to fetch colors", error);
      }
    })();
  }, []);

  const handleColorClick = (color) => {
    if (!onChange) return;
    setColorActive(color);
    onChange({ color: color.name });
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        className={classes.boxTitle}
        onClick={handleClick}
      >
        <Typography variant="h5" className={classes.h5}>
          Color
        </Typography>
        <Box>{open ? <ExpandLess /> : <ExpandMore />}</Box>
      </Box>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box className={classes.boxBtn}>
          {colors.map((color) => (
            <Box
              className={classes.boxColor}
              onClick={() => handleColorClick(color)}
            >
              <Box
                className={classes.color}
                style={
                  color.name === "White"
                    ? {
                        backgroundColor: `${color.code}`,
                        border: "1px solid #000",
                      }
                    : {
                        backgroundColor: `${color.code}`,
                      }
                }
              >
                {colorActive.name === color.name && (
                  <CheckIcon
                    style={
                      color.name === "White"
                        ? { color: "#000" }
                        : { color: "#fff" }
                    }
                  />
                )}
              </Box>
              <Typography className={classes.nameSize}>{color.name}</Typography>
            </Box>
          ))}
        </Box>
      </Collapse>
    </Box>
  );
}

export default FilterByColor;
