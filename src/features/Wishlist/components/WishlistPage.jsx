import React from "react";
import PropTypes from "prop-types";
import { Box, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import Product from "features/Product/components/Product";
import { useSelector } from "react-redux";
import { wishlistCountSelector } from "../selector";

WishlistPage.propTypes = {};

const useStyle = makeStyles((theme) => ({
  root: {
    minHeight: "300px",
    padding: "32px 16px",
  },

  title: {
    fontSize: "30px",
    textTransform: "uppercase",
    color: "#000",
    fontWeight: "700",
    paddingBottom: "16px ",
  },

  titleCount: {
    textTransform: "uppercase",
    fontSize: "16px",
    paddingBottom: theme.spacing(2),
  },
}));

function WishlistPage(props) {
  const classes = useStyle();
  const wishList = useSelector((state) => state.wishList.current);
  const wishlistCount = useSelector(wishlistCountSelector);
  return (
    <Paper variant={0}>
      <Box className={classes.root}>
        <Typography className={classes.title}>My wishlist</Typography>
        <Typography component="p" variant="h6" className={classes.titleCount}>
          {wishlistCount} Items
        </Typography>
        {wishlistCount > 0 ? (
          <Grid container>
            {wishList.map((item) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                  <Product data={item.product} />
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <Typography>
            You haven't saved any items to your wishlist yet. Start shopping and
            add your favorite items to your wishlist.
          </Typography>
        )}
      </Box>
    </Paper>
  );
}

export default WishlistPage;
