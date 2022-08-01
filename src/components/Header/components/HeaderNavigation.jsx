import {
  Badge,
  Box,
  Divider,
  Drawer,
  Hidden,
  InputBase,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { FavoriteBorder, ShoppingCartOutlined } from '@material-ui/icons';
import CloseIcon from '@material-ui/icons/Close';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FavoriteIcon from '@material-ui/icons/Favorite';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import ReceiptIcon from '@material-ui/icons/Receipt';
import productApi from 'api/productApi';
import { HEADER_NAVIGATION } from 'constant';
import { cartItemsCountSelector } from 'features/Cart/selector';
import { wishlistCountSelector } from 'features/Wishlist/selector';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import SearchIcon from '@material-ui/icons/Search';
import SearchForm from './SearchForm';
import SearchProduct from './SearchProduct';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',

    padding: theme.spacing(0, 4),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0, 2),
    },

    [theme.breakpoints.up('xs')]: {
      padding: theme.spacing(0, 2),
    },
    height: `${HEADER_NAVIGATION}`,
  },

  drawer: {
    width: '320px',
    maxWidth: '100%',
  },

  right: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
  },

  logo: {
    width: '150px',
  },
  link: {
    listStyleType: 'none',
    color: '#000',
    padding: theme.spacing(2, 3),
    textDecoration: 'none',

    '&:hover': {
      borderBottom: '2px solid #000',
    },
  },

  mobileLink: {
    paddingLeft: '56px',
    '& > span': {
      fontWeight: 'bold',
    },
  },

  mobileList: {
    width: '320px',
    padding: '0 20px',
    maxWidth: '100%',
  },

  search: {
    position: 'absolute',
    top: '28px',
    right: '130px',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#f5f5f5',
    '&:hover': {
      backgroundColor: '#e5e5e5',
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  resultWrapper: {
    display: 'flex',
    flexFlow: 'row nowrap',
  },
  name: {
    fontSize: '14px',
    color: '#000',
    marginLeft: '20px',
    marginTop: '20px',
  },
}));

export default function HeaderNavigation() {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (isOpen) => {
    setOpenDrawer(isOpen);
  };
  const history = useHistory();

  const cartItemsCount = useSelector(cartItemsCountSelector);
  const wishlistCount = useSelector(wishlistCountSelector);

  const handleWishlist = () => {
    history.push('/user/wishList');
  };

  const handleSearchFormSubmit = (values) => {
    console.log(values);
    const { search } = values;

    history.push({
      pathname: '/products',
      search: queryString.stringify(search ? { title: search } : {}),
    });
  };
  const [products, setProducts] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await productApi.getAll();
        setProducts(data.products);
      } catch (error) {
        console.log('Failed to fetch products', error);
      }
    })();
  }, []);

  const handleOnSearch = (string, results) => {
    history.push({
      pathname: '/products',
      search: queryString.stringify(string ? { title: string } : {}),
    });
  };

  const handleOnHover = (result) => {
    // console.log('dang hover' + result.name);
  };

  const handleOnSelect = (item) => {
    // console.log('da selectrs' + item.name);
    history.push({
      pathname: '/products',
      search: queryString.stringify(item.name ? { title: item.name } : {}),
    });
  };

  const handleOnFocus = () => {};

  const handleOnClear = () => {};

  const formatResult = (item) => {
    return (
      <div className={classes.resultWrapper}>
        <img
          src={
            item.productDetailList[0].linkImg
              ? item.productDetailList[0].linkImg
              : 'https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg'
          }
          alt=""
          width="50px"
        />
        <span className={classes.name}>{item.name}</span>
      </div>
    );
  };

  return (
    <Box className={classes.root}>
      <Hidden mdUp>
        <>
          <IconButton onClick={() => toggleDrawer(true)}>
            <MenuIcon fontSize="large" />
          </IconButton>

          <Drawer open={openDrawer} onClose={() => toggleDrawer(false)}>
            <Box display="flex" justifyContent="right">
              <IconButton
                color="default"
                aria-label="add to shopping cart"
                onClick={() => toggleDrawer(false)}
              >
                <CloseIcon size="large" />
              </IconButton>
            </Box>

            <Box className={classes.mobileList} onClick={() => toggleDrawer(false)}>
              <List component="nav" aria-label="main mailbox folders">
                <ListItem button component={Link} to="/">
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItem>

                <ListItem button component={Link} to="/products?category=Men">
                  <ListItemText primary="Men" className={classes.mobileLink} />
                </ListItem>

                <ListItem button component={Link} to="/products?category=Woman">
                  <ListItemText primary="Woman" className={classes.mobileLink} />
                </ListItem>

                <ListItem button component={Link} to="/products?category=Kids">
                  <ListItemText primary="Kids" className={classes.mobileLink} />
                </ListItem>
              </List>
              <Divider />

              <List component="nav" aria-label="main mailbox folders">
                <ListItem button component={Link} to="/user">
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary="Account" />
                </ListItem>

                <ListItem button component={Link} to="/user/order">
                  <ListItemIcon>
                    <ReceiptIcon />
                  </ListItemIcon>
                  <ListItemText primary="My orders" />
                </ListItem>

                <ListItem button component={Link} to="/user/wishList">
                  <ListItemIcon>
                    <FavoriteIcon />
                  </ListItemIcon>
                  <ListItemText primary="My wish list" />
                </ListItem>

                <ListItem button component={Link} to="/login">
                  <ListItemIcon>
                    <ExitToAppIcon />
                  </ListItemIcon>
                  <ListItemText primary="Log In" />
                </ListItem>

                {/* <ListItem button component={Link} to='/logout' >
                  <ListItemIcon>
                    <ExitToAppIcon />
                  </ListItemIcon>
                  <ListItemText primary="Log out" className={classes.mobileLink} />
                </ListItem> */}
              </List>
            </Box>
          </Drawer>
        </>
      </Hidden>
      <Box className={classes.left}>
        <Link to="/">
          <img
            src="http://nouthemes.net/html/trueshoes/images/logo.png"
            alt=""
            className={classes.logo}
          />
        </Link>
      </Box>
      <Hidden smDown>
        <Box className={classes.nav}>
          <Link to="/" className={classes.link}>
            Home
          </Link>
          <Link to="/products?category=Men" className={classes.link}>
            Men
          </Link>
          <Link to="/products?category=Woman" className={classes.link}>
            Woman
          </Link>
          <Link to="/products?category=Kids" className={classes.link}>
            Kids
          </Link>
          <Link to="/about" className={classes.link}>
            About Us
          </Link>
        </Box>
      </Hidden>

      <Box className={classes.right}>
        <Hidden smDown>
          {/* <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div> */}
          <SearchProduct />

          {/* <SearchForm onSubmit={handleSearchFormSubmit} /> */}
          {/* <div style={{ width: 350, margin: 20 }}>
            <ReactSearchAutocomplete
              items={products}
              onSearch={handleOnSearch}
              onHover={handleOnHover}
              onSelect={handleOnSelect}
              onFocus={handleOnFocus}
              onClear={handleOnClear}
              styling={{ zIndex: 4 }} // To display it on top of the search box below
              autoFocus
              formatResult={formatResult}
              fuseOptions={{ keys: ["name"] }}
              resultStringKeyName="name"
              placeholder="Search for products"
              maxResults={5}
            />
          </div> */}
          {/* </div> */}
        </Hidden>

        <IconButton aria-label="show 17 new notifications" color="inherit" onClick={handleWishlist}>
          <Badge badgeContent={wishlistCount} color="primary">
            <FavoriteBorder />
          </Badge>
        </IconButton>

        <IconButton
          aria-label="show 17 new notifications"
          color="inherit"
          component={Link}
          to="/cart"
        >
          <Badge badgeContent={cartItemsCount} color="primary">
            <ShoppingCartOutlined />
          </Badge>
        </IconButton>
      </Box>
    </Box>
  );
}
