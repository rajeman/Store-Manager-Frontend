import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import Login from '../components/Login';
import Dashboard from '../components/Dashboard';
import NotFoundPage from '../components/NotFoundPage'

//switch ensures only the first match is rendered

const AppRouter = () => (
    <BrowserRouter>
            <Switch>
                <Route path="/" component={Login} exact={true} />
                <Route path="/dashboard" component={Dashboard} exact={true} />

                <Route component={NotFoundPage} />
            </Switch>
    </BrowserRouter>
);


export default AppRouter;