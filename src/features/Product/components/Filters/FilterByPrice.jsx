import { Box, Collapse, makeStyles, Typography } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { MAX_PRICE, MIN_PRICE } from "constant";
import PropTypes from "prop-types";
import React, { useState } from "react";

FilterByPrice.propTypes = {
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
}));

function FilterByPrice({ onChange }) {
  const handleCategoryClick = (category) => {};

  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const handleClickOpen = () => {
    setOpen(!open);
  };

  const handleClick = (price_gte, price_lte) => {
    const values = { price_gte, price_lte };
    if (onChange) onChange(values);
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        className={classes.boxTitle}
        onClick={handleClickOpen}
      >
        <Typography variant="h5" className={classes.h5}>
          price
        </Typography>
        <Box>{open ? <ExpandLess /> : <ExpandMore />}</Box>
      </Box>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box className={classes.content} disablePadding>
          <ListItem
            button
            className={classes.nested}
            onClick={() => handleClick(MIN_PRICE, 50)}
          >
            <Typography variant="body2" className={classes.li}>
              less than $50
            </Typography>
          </ListItem>
          <ListItem
            button
            className={classes.nested}
            onClick={() => handleClick(50, 100)}
          >
            <Typography variant="body2" className={classes.li}>
              $50 - $100
            </Typography>
          </ListItem>
          <ListItem
            button
            className={classes.nested}
            onClick={() => handleClick(100, 200)}
          >
            <Typography variant="body2" className={classes.li}>
              $100 - $200
            </Typography>
          </ListItem>
          <ListItem
            button
            className={classes.nested}
            onClick={() => handleClick(200, 300)}
          >
            <Typography variant="body2" className={classes.li}>
              $200 - $300
            </Typography>
          </ListItem>
          <ListItem
            button
            className={classes.nested}
            onClick={() => handleClick(300, MAX_PRICE)}
          >
            <Typography variant="body2" className={classes.li}>
              $300 or more
            </Typography>
          </ListItem>
        </Box>
      </Collapse>
    </Box>
  );
}

export default FilterByPrice;
