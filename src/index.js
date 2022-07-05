import React from 'react';
import { Provider } from "mobx-react";
import {createRoot} from 'react-dom/client';
import { HashRouter,Routes, Route,Navigate } from 'react-router-dom';

import Store from "./store";
import cookieUtil from './components/common/browerCache';

import App from '../src/components/layout/App.jsx';
import Login from '../src/components/layout/Login.jsx';

const container = document.getElementById('root');
const root = createRoot(container);
// 取登录状态，如果登录成功，则渲染首页的路由，否则跳转到登录页面
const logging = cookieUtil.get('logging');
const content = <HashRouter><Provider store={Store}>
    {
        logging ? (
            <App />
        ) : (
            <Routes>
                <Route path="/*" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        )
    }
    </Provider></HashRouter>;
root.render(content);