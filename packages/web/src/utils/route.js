import Cookies from 'js-cookie';
import React from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, path, slug, ...rest }) => {
    let routeToRedirect = path;
    return (
        slug ?
            (Cookies.get('token') == null || Cookies.get('token') == '')
                ?
                <Redirect to="/Login" />
                :
                <Route path={path} component={Component} />
            :
            Cookies.get('token') == null || Cookies.get('token') == '' ?
                <Redirect to="/Login" /> :
                <Route {...rest} render={props => (
                    (routeToRedirect != '' && window.location.pathname != routeToRedirect) ?
                        <Redirect to={routeToRedirect} /> :
                        <Component {...props} />
                )}
                />
    );
};
export const PublicRoute = ({ component: Component, path, restricted, ...rest }, props) => {
    return (
        <Route {...rest} render={props => (
            Cookies.get('token') !== null && Cookies.get('token') !== '' && Cookies.get('token') !== undefined ?
                <Redirect to={'/'} />
                :
                // Cookies.get('token') !== null && Cookies.get('token') == '' && routeToRedirect != '' ?
                //     <Redirect to={routeToRedirect} /> :
                Cookies.get('token') !== null && Cookies.get('token') !== '' && restricted ?
                    <Redirect to={'/'} />
                    : <Component {...props} />
        )} />
    );
};