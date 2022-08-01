import React from "react";
import PropTypes from "prop-types";
import { Box, Chip, Divider, makeStyles, Typography } from "@material-ui/core";
import { MAX_PRICE, MIN_PRICE } from "constant";
import "./styles.scss";

FilterViewer.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
};

const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexFlow: "row wrap",
    alignItems: "center",
    margin: "12px",
    listStyleType: "none",

    "& > li": {
      margin: 0,
      padding: theme.spacing(1),
    },
  },

  title: {
    fontSize: "16px",
    fontWeight: "bold",
    padding: "20px 0 0 20px",
  },
}));

const FILTER_LIST = [
  {
    id: 1,
    getLabel: (filters) => `${filters.category}`,
    isVisible: (filters) => filters.category,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters.category;
      return newFilters;
    },
  },
  {
    id: 2,
    getLabel: (filters) => {
      if (filters.price_lte === MAX_PRICE) {
        return `> $${filters.price_gte}`;
      }
      if (filters.price_gte === MIN_PRICE) {
        return `< $${filters.price_lte}`;
      }

      return `$${filters.price_gte} - $${filters.price_lte}`;
    },
    isVisible: (filters) =>
      Object.keys(filters).includes("price_gte") &&
      Object.keys(filters).includes("price_lte"),
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters.price_gte;
      delete newFilters.price_lte;
      return newFilters;
    },
  },
  {
    id: 3,
    getLabel: (filters) => filters.size,
    isVisible: (filters) => Object.keys(filters).includes("size"),
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters.size;
      return newFilters;
    },
  },
  {
    id: 4,
    getLabel: (filters) => filters.color,
    isVisible: (filters) => Object.keys(filters).includes("color"),
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters.color;
      return newFilters;
    },
  },
];

function FilterViewer({ filters = {}, onChange }) {
  const classes = useStyle();

  console.log(filters);

  return (
    <Box>
      <Divider />
      <Typography className={classes.title}>Applied filters</Typography>
      <Box component="ul" className={classes.root}>
        {FILTER_LIST.filter((x) => x.isVisible(filters)).map((x) => (
          <li key={x.id}>
            <Chip
              label={x.getLabel(filters)}
              onClick={() => {
                if (!onChange) return;
                const newFilters = x.onRemove(filters);
                onChange(newFilters);
              }}
              onDelete={() => {
                if (!onChange) return;
                const newFilters = x.onRemove(filters);
                onChange(newFilters);
              }}
            />
          </li>
        ))}
      </Box>
    </Box>
  );
}

export default FilterViewer;
