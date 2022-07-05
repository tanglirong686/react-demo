import React from 'react';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

const menuItems = [
    {
        label: '权限管理',
        key: 'permission',
        icon: <SettingOutlined />,
        children: [
            {
                label: '用户管理',
                key: 'permission/user',
            },
            {
                label: '角色管理',
                key: 'permission/role',
            },
            {
                label: '菜单管理',
                key: 'permission/menu',
            }
        ]
    },
    {
        label: '系统管理',
        key: 'system',
        icon: <AppstoreOutlined />,
        children: [
            {
                label: '字典管理',
                key: 'system/dicttionary',
            },
            {
                label: '数据表管理',
                key: 'system/data_table',
            }
        ]
    },
    {
        label: 'One',
        key: 'sub1',
        icon: <MailOutlined />,
        children: [
            {
                label: '表格',
                key: 'component/table',
            },
            {
                label: '嵌套表格',
                key: 'component/nesting_table',
            },
            {
                label: '表单',
                key: 'component/form',
            },
            {
                label: '进度条',
                key: 'component/progress',
            },
            {
                label: '轮播图',
                key: 'component/carousel',
            }
        ]
    },
];

export default menuItems;