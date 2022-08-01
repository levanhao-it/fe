import React from "react";
import PropTypes from "prop-types";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  makeStyles,
  Typography,
} from "@material-ui/core";
import ProductReviewList from "./ProductReviewList";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DOMPurify from "dompurify";

ProductTabsMobile.propTypes = {
  product: PropTypes.object,
};

const useStyle = makeStyles((theme) => ({
  heading: {
    fontWeight: "bold",
  },
}));

function ProductTabsMobile({ product = {} }) {
  const clearDescription = DOMPurify.sanitize(product.description);
  const classes = useStyle();

  return (
    <Box>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>OVERVIEW</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div dangerouslySetInnerHTML={{ __html: clearDescription }} />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>REVIEW</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ProductReviewList product={product} />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default ProductTabsMobile;
