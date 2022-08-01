import { Box, Container, makeStyles } from '@material-ui/core';
import { useEffect, useMemo, useState } from 'react';

import { Pagination } from '@material-ui/lab';
import productApi from 'api/productApi';
import OfferBanner from 'components/OfferBanner';
import FilterAndSort from 'features/Product/components/FilterAndSort';
import ProductList from 'features/Product/components/ProductList';
import ProductSkeletonList from 'features/Product/components/ProductSkeletonList';
import './styles.scss';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { Helmet } from 'react-helmet-async';

ProductListPage.propTypes = {};
const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '80px',
  },

  left: {
    width: '250px',
  },

  right: {
    flex: '1 1 0',
  },

  pagination: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',

    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(3),
  },
  filter: {
    float: 'right',
    marginBottom: '20px',
  },
}));

function ProductListPage(props) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    return {
      ...params,
      page: Number.parseInt(params.page) || 1,
      limit: Number.parseInt(params.limit) || 16,
      sort: params.sort || 'createdDate,desc',
    };
  }, [location.search]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // const [filters, setFilters] = useState(() => ({
  //   ...queryParams,
  //   page: Number.parseInt(queryParams.page) || 1,
  //   limit: Number.parseInt(queryParams.limit) || 21,
  //   sort: queryParams.sort || "createdDate,desc",
  // }));

  const [pagination, setPagination] = useState({
    total: 10,
    page: 1,
  });

  useEffect(() => {
    (async () => {
      try {
        const { data } = await productApi.getAll(queryParams);
        setProducts(data.products);
        setPagination({
          total: data.totalPages,
          page: data.currentPage,
        });
      } catch (error) {
        console.log('Failed to fetch products', error);
      }
      setLoading(false);
    })();
  }, [queryParams]);

  const handlePageChange = (e, page) => {
    const filters = {
      ...queryParams,
      page,
    };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const handleFiltersChange = (newFilters) => {
    const filters = {
      ...queryParams,
      ...newFilters,
    };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const setNewFilters = (newFilters) => {
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(newFilters),
    });
  };

  return (
    <Box className={classes.root}>
      <Helmet>
        <title>Product List</title>
      </Helmet>
      <Container maxWidth="lg" fixed>
        <OfferBanner />
        <Box className={classes.filter}>
          <FilterAndSort
            filters={queryParams}
            onChange={handleFiltersChange}
            onNewChange={setNewFilters}
          />
        </Box>
        {loading ? <ProductSkeletonList /> : <ProductList data={products} />}
        <Box className={classes.pagination}>
          <Pagination
            count={pagination.total}
            page={pagination.page}
            className="pagination"
            onChange={handlePageChange}
          />
        </Box>
      </Container>
    </Box>
  );
}

export default ProductListPage;
