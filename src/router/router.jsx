import React from 'react';
import Home from '../components/layout/Home.jsx';
import Error from '../components/layout/Error.jsx';
import TableComponent from '../components/common/TableComponent.jsx';
import FormComponent from '../components/common/FormComponent.jsx';
import ProgressComponent from '../components/common/ProgressComponent.jsx';
import CarouselComponent from '../components/common/CarouselComponent.jsx';
import NestingTableComponent from '../components/common/NestingTableComponent.jsx';

import SysMenuPage from '../pages/permission/menu/SysMenuPage.jsx';
import SysRolePage from '../pages/permission/role/SysRolePage.jsx';
import SysUserPage from '../pages/permission/user/SysUserPage.jsx';

import DictManagerPage from '../pages/system/dict/DictManagerPage.jsx';
import DataTablePage from '../pages/system/data_table/DataTablePage.jsx';

const routers = [
    {
        path:'/',
        exact:true,
        component: <Home />,
    },
    {
        path:'/home',
        exact:true,
        component: <Home />,
    },
    {
        path:'/component/table',
        exact:true,
        component: <TableComponent />
    },
    {
        path:'/component/form',
        exact:true,
        component: <FormComponent />
    },
    {
        path:'/component/progress',
        exact:true,
        component: <ProgressComponent />
    },
    {
        path:'/component/carousel',
        exact:true,
        component: <CarouselComponent />
    },
    {
        path:'/component/nesting_table',
        exact:true,
        component: <NestingTableComponent />
    },
    {
        path:'/permission/user',
        exact:true,
        component: <SysUserPage />
    },
    {
        path:'/permission/role',
        exact:true,
        component: <SysRolePage />
    },
    {
        path:'/permission/menu',
        exact:true,
        component: <SysMenuPage />
    },
    {
        path:'/system/dicttionary',
        exact:true,
        component: <DictManagerPage />
    },
    {
        path:'/system/data_table',
        exact:true,
        component: <DataTablePage />
    },
    {
        path:'/*',
        component: <Error />
    },
];

export default routers;