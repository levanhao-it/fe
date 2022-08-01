import { Collapse, makeStyles } from '@material-ui/core';
import Contact from 'components/Contact';
import NoLogin from 'components/NoLogin';
import PrivateRoute from 'components/PrivateRoute';
import { WIDTH_HEADER } from 'constant';
import Verify from 'features/Auth/components/Verify';
import CheckoutFeature from 'features/Checkout';
import DeliveryFeauture from 'features/Delivery';
import PasswordFeature from 'features/PasswordFeature';
import UserFeature from 'features/User';
import { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import NotFound from './components/NotFound';
import CartFeature from './features/Cart';
import ProductFeature from './features/Product';

const useStyle = makeStyles((theme) => ({
  root: {
    marginTop: '180px',
    [theme.breakpoints.down('sm')]: {
      marginTop: '90px',
    },
  },
}));

function App() {
  const classes = useStyle();
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = (e) => {
    if (window.pageYOffset > WIDTH_HEADER && window.pageYOffset > lastScrollY) {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div className="App">
      <Collapse in={showHeader}>
        <Header />
      </Collapse>

      <div className={classes.root}>
        <Switch>
          <Redirect from="/home" to="/" exact />
          <Route path="/" component={Home} exact />
          <Route path="/products" component={ProductFeature} />
          <Route path="/cart" component={CartFeature} />
          <Route path="/verify" component={Verify} />
          <Route path="/login" component={NoLogin} />
          <Route path="/about" component={Contact} />
          <Route path="/forgot-password" component={PasswordFeature} />
          <PrivateRoute path="/checkout/" component={CheckoutFeature} />
          <PrivateRoute path="/user" component={UserFeature} />
          <PrivateRoute path="/delivery" component={DeliveryFeauture} />
          <Route component={NotFound} />
        </Switch>
      </div>

      <Footer />
    </div>
  );
}

export default App;
