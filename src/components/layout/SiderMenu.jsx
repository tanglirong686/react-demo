import { Menu } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import menuItems from '../data/menu.jsx'

function getMenu(list) {
    return list.map(item => {
        if (item.children && item.children.length > 0) {
            
            return <Menu.SubMenu key={'/' + item.key} title={item.label} icon={item.icon}>
                {
                    item.children.map(node => {
                        if(node.children && node.children.length > 0){
                            return <Menu.SubMenu key={'/' + node.key} title={node.label} icon={node.icon}>{
                                getMenu(node.children)
                            }
                            </Menu.SubMenu>
                        }
                        return <Menu.Item key={'/' + node.key} icon={node.icon}><Link to={'/' + node.key}>{node.label}</Link></Menu.Item>
                    })
                }
            </Menu.SubMenu>
        }
        return <Menu.Item key={'/' + item.key} icon={item.icon}><Link to={'/' + item.key}>{item.label}</Link></Menu.Item>
    })
}

const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

const SiderMenu = () => {
    const [openKeys, setOpenKeys] = useState(['sub1']);
    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);

        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };
    const onMenuSelect = (item) => {
        //console.log(item)
    };
    return (
        <Menu
            theme="light"
            mode="inline"
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            onSelect={onMenuSelect}
            // items={menuItems}
        >
            {getMenu(menuItems)}
        </Menu>
    );
}

export default SiderMenu;