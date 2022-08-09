import React, { useContext } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { Context } from '../auth/Context';
import Products from '../pages/products/Products';
import Login from '../pages/user/Login';
import Category from '../pages/category/Category';
import DetailsProductScreen from '../pages/products/screens/DetailsProductScreen';
import NewProductScreen from '../pages/products/screens/NewProductScreen';
import Error from '../pages/error/Error';
import Materials from '../pages/materials/Materials';
import MaterialScreen from '../pages/materials/screens/MaterialScreen';
import DetailsMaterialScreen from '../pages/materials/screens/DetailsMaterialScreen';

export default function RoutesCustom() {
    const { checkUser } = useContext(Context);
    return useRoutes([
        //Home / productos
        {
            path: '/', element: checkUser().userId !== null ? <Products /> : <Login />,
        },
        {
            path: '/product/new', element: checkUser().userId !== null ? <NewProductScreen /> : <Login />,
        },
        {
            path: '/product/:id', element: checkUser().userId !== null ? <DetailsProductScreen /> : <Login />,
        },
        //Materials
        {
            path: '/materials', element: checkUser().userId !== null ? <Materials /> : <Login />,
        },
        {
            path: '/materials/new', element: checkUser().userId !== null ? <MaterialScreen mode="new" /> : <Login />,
        },
        {
            path: '/materials/edit/:id', element: checkUser().userId !== null ? <MaterialScreen mode="edit" /> : <Login />,
        },
        {
            path: '/materials/:id', element: checkUser().userId !== null ? <DetailsMaterialScreen /> : <Login />,
        },
        //Category
        {
            path: '/category', element: checkUser().userId !== null ? <Category /> : <Login />,
        },
        //Error
        {
            path: '/404', element: <Error />,
        },
        {
            path: '*', element: <Navigate to="/404" replace />
        },
    ]);
}