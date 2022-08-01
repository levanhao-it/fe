import { Box, Grid, Hidden, makeStyles } from '@material-ui/core';
import ProductTabsMobile from 'features/Product/components/ProductTabsMobile';
import useProductDetail from 'features/Product/hooks/useProductDetail';
import { Helmet } from 'react-helmet-async';
import { useRouteMatch } from 'react-router-dom';
import ProductInfo from '../../components/ProductInfo';
import ProductRecomend from '../../components/ProductRecomend';
import ProductSidebar from '../../components/ProductSidebar';

ProductDetailPage.propTypes = {};

const useStyle = makeStyles((theme) => ({
  root: {
    padding: '60px 40px 0',
    [theme.breakpoints.down('xs')]: {
      padding: '40px 20px',
    },
  },

  tabsMobile: {
    marginTop: '20px',
  },
}));

function ProductDetailPage(props) {
  const classes = useStyle();
  const {
    params: { productId },
    url,
  } = useRouteMatch();
  const { product, loading } = useProductDetail(productId);

  return (
    <div className={classes.root}>
      <Helmet>
        <title>{product.name}</title>
      </Helmet>
      {/* Laptop */}
      <Hidden smDown>
        <Grid container spacing={0}>
          <Grid item xs={12} md={8} lg={8}>
            <ProductInfo product={product} />
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <ProductSidebar product={product} />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <ProductRecomend product={product} />
          </Grid>
        </Grid>
      </Hidden>

      {/* Tablet - Mobile */}
      <Hidden mdUp>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12}>
            <ProductSidebar product={product} />
          </Grid>

          <Grid item xs={12} sm={12}>
            <ProductTabsMobile product={product} />
          </Grid>

          <Grid item xs={12} sm={12}>
            <ProductRecomend product={product} />
          </Grid>
        </Grid>
      </Hidden>
    </div>
  );
}

export default ProductDetailPage;
