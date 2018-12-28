import React from 'react';
import { Route, Switch, Router, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Login from '../components/Login';
import Dashboard from '../components/Dashboard';
import NotFoundPage from '../components/NotFoundPage';
import CreateProduct from '../components/CreateProduct';
import ModifyProduct from '../components/ModifyProduct';
import CreateAttendant from '../components/CreateAttendant';

//switch ensures only the first match is rendered
export const history = createHistory();
const AppRouter = () => (
    <Router history={history}>
            <Switch>
                <Route path="/" component={Login} exact={true} />
                <Route path="/dashboard" component={Dashboard} exact={true} />
                <Route path="/create-product" component={CreateProduct} exact={true} />
                <Route path="/create-attendant" component={CreateAttendant} exact={true} />
                <Route path="/modify-product" component={ModifyProduct} exact={true} />
                <Route component={NotFoundPage} />
            </Switch>
    </Router>
);


export default AppRouter;