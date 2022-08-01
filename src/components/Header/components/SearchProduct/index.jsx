import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, InputAdornment, InputBase, makeStyles, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Autocomplete } from '@material-ui/lab';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import productApi from 'api/productApi';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import './styles.scss';
import { truncateText } from 'utils';

SearchProduct.propTypes = {};

const useStyle = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    right: '110px',
  },
  boxSearch: {
    display: 'flex',
    alignItems: 'center',
  },
  searchTitle: {
    marginLeft: theme.spacing(1),
  },

  box: {
    position: 'relative',
  },

  boxIcon: {
    position: 'absolute',
    top: '53%',
    transform: 'translateY(-50%)',
    right: '13px',
  },
}));

function SearchProduct(props) {
  const classes = useStyle();
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState('');
  const history = useHistory();
  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (e) => {
    history.push({
      pathname: '/products',
      search: queryString.stringify({ title }),
    });
    e.preventDefault();
  };

  const handleClick = (option) => {
    history.push(`/products/${option.id}`);
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await productApi.getAll({ limit: 1000 });
        setProducts(data.products);
      } catch (error) {
        console.log('Failed to fetch products', error);
      }
    })();
  }, [title]);
  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit}>
        <Box className={classes.box}>
          <Autocomplete
            id="highlights-demo"
            style={{ width: 250 }}
            options={products}
            getOptionLabel={(option) => option.name}
            noOptionsText="No results"
            // popupIcon={<SearchIcon />}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder="Search..."
                onChange={handleChange}
              />
            )}
            renderOption={(option, { inputValue }) => {
              const matches = match(option.name, inputValue);
              const text = truncateText(option.name, 20);
              const parts = parse(text, matches);

              return (
                <div onClick={() => handleClick(option)} className={classes.boxSearch}>
                  <img
                    src={option.productDetailList[0].linkImg}
                    alt={option.name}
                    height="50px"
                    width="50px"
                  />
                  <div className={classes.searchTitle}>
                    {parts.map((part, index) => (
                      <span
                        key={index}
                        style={{
                          fontWeight: part.highlight ? 700 : 400,
                        }}
                      >
                        {part.text}
                      </span>
                    ))}
                  </div>
                </div>
              );
            }}
          />

          <Box className={classes.boxIcon}>
            <SearchIcon />
          </Box>
        </Box>
      </form>
    </div>
  );
}

export default SearchProduct;
