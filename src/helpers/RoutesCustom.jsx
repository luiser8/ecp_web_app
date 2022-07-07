import React, { useContext } from 'react';
import { Context } from '../auth/Context';
import Error from '../components/layouts/Error';
import Products from '../pages/products/Products';
import Login from '../pages/user/Login';
import Category from '../pages/category/Category';
import { Navigate, useRoutes } from 'react-router-dom';

export default function RoutesCustom() {
    const { checkUser } = useContext(Context);
    return useRoutes([
        {
            path: '/', element: checkUser().userId !== null ? <Products /> : <Login />,
        },
        {
            path: '/category', element: checkUser().userId !== null ? <Category /> : <Login />,
        },
        {
            path: '/404', element: <Error />,
        },
        {
            path: '*', element: <Navigate to="/404" replace />
        },
    ]);
}