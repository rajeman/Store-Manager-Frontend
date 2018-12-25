import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import Login from '../components/Login';
import Dashboard from '../components/Dashboard';
import NotFoundPage from '../components/NotFoundPage';
import CreateProduct from '../components/CreateProduct';
import ModifyProduct from '../components/ModifyProduct';
import CreateAttendant from '../components/CreateAttendant';

//switch ensures only the first match is rendered

const AppRouter = () => (
    <BrowserRouter>
            <Switch>
                <Route path="/" component={Login} exact={true} />
                <Route path="/dashboard" component={Dashboard} exact={true} />
                <Route path="/create-product" component={CreateProduct} exact={true} />
                <Route path="/create-attendant" component={CreateAttendant} exact={true} />
                <Route path="/modify-product" component={ModifyProduct} exact={true} />
                <Route component={NotFoundPage} />
            </Switch>
    </BrowserRouter>
);


export default AppRouter;