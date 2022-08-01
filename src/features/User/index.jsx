import { Container, Grid, Hidden, makeStyles } from '@material-ui/core';
import AddressFeauture from 'features/Address';
import OrderFeauture from 'features/Order';
import WishlistFeauture from 'features/Wishlist';
import { Helmet } from 'react-helmet-async';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import UserAccount from './components/UserAccount';
import UserSidebar from './components/UserSidebar';

UserFeature.propTypes = {};

const useStyle = makeStyles((theme) => ({
  root: {
    backgroundColor: '#f7f7f7',
  },
  container: {
    padding: '80px 0',
    [theme.breakpoints.down('sm')]: {
      padding: '40px 0',
    },
  },
}));

function UserFeature(props) {
  const classes = useStyle();
  const match = useRouteMatch();
  return (
    <div className={classes.root}>
      <Helmet>
        <title>User</title>
      </Helmet>
      <Container className={classes.container}>
        <Grid container>
          <Hidden smDown>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <UserSidebar />
            </Grid>
          </Hidden>
          <Grid item xs={12} sm={12} md={9} lg={9}>
            <Switch>
              <Route path={`${match.url}`} exact component={UserAccount} />
              <Route path={`${match.url}/order`} exact component={OrderFeauture} />
              <Route path={`${match.url}/wishList`} exact component={WishlistFeauture} />

              <Route path={`${match.url}/address`} exact component={AddressFeauture} />
            </Switch>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default UserFeature;
