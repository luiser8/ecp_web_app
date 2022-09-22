import React, { useContext } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { Context } from '../auth/Context';
import Products from '../pages/products/Products';
import Login from '../pages/user/Login';
import DetailsProductScreen from '../pages/products/screens/DetailsProductScreen';
import NewProductScreen from '../pages/products/screens/NewProductScreen';
import Error from '../pages/error/Error';
import Materials from '../pages/materials/Materials';
import MaterialScreen from '../pages/materials/screens/MaterialScreen';
import DetailsMaterialScreen from '../pages/materials/screens/DetailsMaterialScreen';
import Suppliers from '../pages/suppliers/Suppliers';
import SupplierScreen from '../pages/suppliers/screens/SupplierScreen';
import DetailsSuppliersScreen from '../pages/suppliers/screens/DetailsSuppliersScreen';
import Packings from '../pages/packing_kits/Packings';
import PackingScreen from '../pages/packing_kits/screens/PackingScreen';
import DetailsPackingsScreen from '../pages/packing_kits/screens/DetailsPackingsScreen';
import OtherExpenses from '../pages/other_expenses/OtherExpenses';
import OtherExpensesScreen from '../pages/other_expenses/screens/OtherExpensesScreen';
import Requirements from '../pages/requirements/Requirements';

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
        //Packings kits
        {
            path: '/packings', element: checkUser().userId !== null ? <Packings /> : <Login />,
        },
        {
            path: '/packings/new', element: checkUser().userId !== null ? <PackingScreen mode="new" /> : <Login />,
        },
        {
            path: '/packings/edit/:id', element: checkUser().userId !== null ? <PackingScreen mode="edit" /> : <Login />,
        },
        {
            path: '/packings/:id', element: checkUser().userId !== null ? <DetailsPackingsScreen /> : <Login />,
        },
        //OtherExpenses
        {
            path: '/otherexpenses', element: checkUser().userId !== null ? <OtherExpenses /> : <Login />,
        },
        {
            path: '/otherexpenses/new', element: checkUser().userId !== null ? <OtherExpensesScreen mode="new" /> : <Login />,
        },
        {
            path: '/otherexpenses/edit/:id', element: checkUser().userId !== null ? <OtherExpensesScreen mode="edit" /> : <Login />,
        },
        //Suppliers
        {
            path: '/suppliers', element: checkUser().userId !== null ? <Suppliers /> : <Login />,
        },
        {
            path: '/suppliers/new', element: checkUser().userId !== null ? <SupplierScreen mode="new" /> : <Login />,
        },
        {
            path: '/suppliers/edit/:id', element: checkUser().userId !== null ? <SupplierScreen mode="edit" /> : <Login />,
        },
        {
            path: '/suppliers/:id', element: checkUser().userId !== null ? <DetailsSuppliersScreen /> : <Login />,
        },
        //Requirements
        {
            path: '/requirements', element: checkUser().userId !== null ? <Requirements /> : <Login />,
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