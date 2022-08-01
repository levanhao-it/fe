import { Box, Collapse, makeStyles, Typography } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import { ExpandMore } from "@material-ui/icons";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import categoryApi from "api/categoryApi";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

FilterByCategory.propTypes = {
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

function FilterByCategory({ onChange }) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await categoryApi.getAll();
        setCategoryList(data);
      } catch (error) {
        console.log("Fail to fetch categories list", error);
      }
    })();
  }, []);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleCategoryClick = (category) => {
    if (onChange) {
      onChange({ category: category.name });
    }
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
          Category
        </Typography>
        <Box>{open ? <ExpandLessIcon /> : <ExpandMore />}</Box>
      </Box>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box className={classes.content} disablePadding>
          {categoryList.map((category) => (
            <ListItem
              button
              className={classes.nested}
              key={category.id}
              onClick={() => handleCategoryClick(category)}
            >
              <Typography variant="body2" className={classes.li}>
                {category.name} ({category.productList.length || 0})
              </Typography>
            </ListItem>
          ))}
        </Box>
      </Collapse>
    </Box>
  );
}

export default FilterByCategory;
