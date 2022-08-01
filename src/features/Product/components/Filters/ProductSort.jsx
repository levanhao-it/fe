import {
  Box,
  Collapse,
  makeStyles,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import PropTypes from "prop-types";
import React from "react";
import "./styles.scss";

ProductSort.propTypes = {
  currentSort: PropTypes.string.isRequired,
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

function ProductSort({ currentSort, onChange }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleSortChange = (event, newValue) => {
    if (onChange) onChange(newValue);
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
          Short By
        </Typography>
        <Box>{open ? <ExpandLess /> : <ExpandMore />}</Box>
      </Box>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box className={`${classes.content} product-sort`} disablePadding>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={currentSort}
            onChange={handleSortChange}
          >
            <Tab label="NEWEST" value="createdDate,desc" />
            <Tab label="OLDEST" value="createdDate,asc" />
            <Tab label="PRICE (LOW - HIGH)" value="originalPrice,asc" />
            <Tab label="PRICE (HIGH - LOW)" value="originalPrice,desc" />
          </Tabs>
        </Box>
      </Collapse>
    </Box>
  );
}

export default ProductSort;
