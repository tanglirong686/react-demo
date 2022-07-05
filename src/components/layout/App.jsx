import '../../style/app.css';

import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout } from 'antd';
import React, { useState } from 'react';
import { Route, Routes } from 'react-router';

import SiderMenu from './SiderMenu.jsx';

import routers from '../../router/router.jsx';

const { createHashHistory } = require('history');

const { Header, Sider, Content } = Layout;

const App = () => {
    const [collapsed, setCollapsed] = useState(false);
    const renderRoute = (list) =>{
        return list.map(item=>{
            return <Route path={item.path} exact={item.exact} element={item.component} />
        })
    };
    return (
        <Layout className='side-menu'>
            <Sider className='side-left' theme="light" trigger={null} collapsible collapsed={collapsed}>
                <div className="logo" />
                <SiderMenu className="menu-list" />
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="site-layout-header"
                    style={{
                        padding: 0,
                    }}
                >
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    })}
                </Header>
                <Content
                    className="site-layout-content"
                    style={{
                        margin: '16px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    <Routes history={createHashHistory()}>
                        {renderRoute(routers)}
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    );
};
export default App;