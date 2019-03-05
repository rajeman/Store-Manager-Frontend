import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import paths from '../helpers/paths';
import Login from '../components/Login';
import Dashboard from '../components/Dashboard';
import NotFoundPage from '../components/NotFoundPage';
import CreateProduct from '../components/CreateProduct';
import ModifyProduct from '../components/ModifyProduct';
import CreateAttendant from '../components/CreateAttendant';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <Switch>
      <Route path='/' component={Login} exact={true} />
      <Route path={paths.login} component={Login} exact={true} />
      <Route path={paths.products} component={Dashboard} exact={true} key="products" />
      <Route path={paths.records} component={Dashboard} exact={true} key="records" />
      <Route path={paths.recordDetails} component={Dashboard} exact={true} key="recordDetails" />
      <Route path={paths.productDetails} component={Dashboard} exact={true} key="recordDetails" />
      <Route path={paths.cart} component={Dashboard} exact={true} key="cart" />
      <Route path={paths.createProduct} component={CreateProduct} exact={true} />
      <Route path={paths.createAttendant} component={CreateAttendant} exact={true} />
      <Route path={paths.modifyProduct} component={ModifyProduct} exact={true} />
      <Route component={NotFoundPage} />
    </Switch>
  </Router>
);

export default AppRouter;
