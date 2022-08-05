import React, { useContext } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { Context } from '../auth/Context';
import Products from '../pages/products/Products';
import Login from '../pages/user/Login';
import Category from '../pages/category/Category';
import Details from '../pages/products/screens/DetailScreen';
import NewProductScreen from '../pages/products/screens/NewProductScreen';
import Error from '../pages/error/Error';

export default function RoutesCustom() {
    const { checkUser } = useContext(Context);
    return useRoutes([
        {
            path: '/', element: checkUser().userId !== null ? <Products /> : <Login />,
        },
        {
            path: '/product/new', element: checkUser().userId !== null ? <NewProductScreen /> : <Login />,
        },
        {
            path: '/product/:id', element: checkUser().userId !== null ? <Details /> : <Login />,
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