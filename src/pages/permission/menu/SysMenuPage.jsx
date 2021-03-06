import './style.css';
import React, { useEffect, useState } from "react";
import { Form, Radio, Button, Input, Layout, Tree, message } from 'antd';
import { CarryOutOutlined, FormOutlined } from '@ant-design/icons';

import {getMenuById , getMenuTree ,saveMenuInfo ,deleteMenuInfo } from '../../../components/data/MenuRequestData.jsx';

const { Sider, Content } = Layout;

const treeData = [
    {
        title: 'parent 1',
        key: '0-0',
        icon: <CarryOutOutlined />,
        children: [
            {
                title: 'parent 1-0',
                key: '0-0-0',
                icon: <CarryOutOutlined />,
                children: [
                    {
                        title: 'leaf',
                        key: '0-0-0-0',
                        icon: <CarryOutOutlined />,
                    },
                    {
                        title: (
                            <>
                                <div>multiple line title</div>
                                <div>multiple line title</div>
                            </>
                        ),
                        key: '0-0-0-1',
                        icon: <CarryOutOutlined />,
                    },
                    {
                        title: 'leaf',
                        key: '0-0-0-2',
                        icon: <CarryOutOutlined />,
                    },
                ],
            },
            {
                title: 'parent 1-1',
                key: '0-0-1',
                icon: <CarryOutOutlined />,
                children: [
                    {
                        title: 'leaf',
                        key: '0-0-1-0',
                        icon: <CarryOutOutlined />,
                    },
                ],
            },
            {
                title: 'parent 1-2',
                key: '0-0-2',
                icon: <CarryOutOutlined />,
                children: [
                    {
                        title: 'leaf',
                        key: '0-0-2-0',
                        icon: <CarryOutOutlined />,
                    },
                    {
                        title: 'leaf',
                        key: '0-0-2-1',
                        icon: <CarryOutOutlined />,
                        switcherIcon: <FormOutlined />,
                    },
                ],
            },
        ],
    },
    {
        title: 'parent 2',
        key: '0-1',
        icon: <CarryOutOutlined />,
        children: [
            {
                title: 'parent 2-0',
                key: '0-1-0',
                icon: <CarryOutOutlined />,
                children: [
                    {
                        title: 'leaf',
                        key: '0-1-0-0',
                        icon: <CarryOutOutlined />,
                    },
                    {
                        title: 'leaf',
                        key: '0-1-0-1',
                        icon: <CarryOutOutlined />,
                    },
                ],
            },
        ],
    },
];

const menuStyle = { width: '100%', height: '100%', background: '#fff' };

const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 14,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 4,
        span: 14,
    },
};

const SysMenuPage = () => {
    // ????????????
    const [menuData , setMenuData] = useState([]);
    // ??????????????????????????????
    const formRef = React.createRef();

    const [showLine] = useState(true);
    const [showIcon] = useState(false);
    // ?????????????????????
    const [selectedItem, setSelectedItem] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);
    // ?????????????????????????????????????????????????????????
    const [isFormVisible, setIsFormVisible] = useState(true);

    // ?????????????????????
    useEffect(() => {
        menuTreeData();
    }, []);

    // ???????????????????????????
    const menuTreeData = ()=> {
        getMenuTree()
            .then((result)=>{
                console.log(result);
                setMenuData(result);
            })
            .catch(res=>{
                message.error('????????????????????????');
            });
    };

    // ?????????????????????
    const onSelect = (selectedKeys, info) => {
        // ????????????
        if(selectedKeys && selectedKeys.length > 0){
            // ?????????????????????
            setSelectedItem(info);
            setSelectedKeys(selectedKeys);
            getMenu(selectedKeys);
        }else{
            // ??????????????????
            formRef.current.resetFields();
            // ????????????
            setSelectedItem([]);
            setSelectedKeys([]);
        }
    };
    // ??????????????????
    const getMenu = async (param) =>{
        // ??????id????????????
        let data = await getMenuById({ 'menuId': param[0]});
        const menu = {
            "menuName": data.menuName,
            "menuCode": data.menuCode,
            "menuUri": data.menuUri,
            "menuIcon": data.menuIcon,
            "used": ''+ data.used,
            "hidden": ''+ data.hidden,
        }
        console.log(formRef)
        formRef.current.setFieldsValue(menu);
        // ??????????????????
        setIsFormVisible(false);
    };
    // ??????
    const addMenu = () => {
        // ??????????????????
        setIsFormVisible(false);
        formRef.current.resetFields();
    };
    // ??????
    const onFinish = (values) => {
        // ??????
        saveMenuInfo(values);
        // ???????????????
        menuTreeData();
    };
    // ????????????
    const onReset = () => {
        formRef.current.resetFields();
    };
    // ??????
    const deleteMenu = () => {
        if (selectedItem) {
            // ????????????
            if(selectedItem.selectedNodes && selectedItem.selectedNodes.length > 0){
                console.log(selectedItem.node);
                // ???????????????
                confirm({
                    title: '????????????',
                    icon: <ExclamationCircleOutlined />,
                    content: '??????????????????????????????????????????????',
                    okText: '??????',
                    okType: 'danger',
                    cancelText: '??????',
                    onOk() {
                        // ????????????
                        deleteMenuInfo(selectedKeys);
                        // ??????????????????
                        //handleTableChange(pagination);
                        setSelectedItem([]);
                    },
                });
                return;
            }
        }
        message.info('???????????????????????????');
    };
    
    return (
        <Layout style={menuStyle}>
            <Sider className="menu-left" theme="light" >
                <Tree
                    showLine={showLine}
                    showIcon={showIcon}
                    defaultExpandedKeys={['0-0-0']}
                    onSelect={onSelect}
                    treeData={menuData}
                />
            </Sider>
            <Content className="menu-content" >
                <div>
                    <Form.Item layout="inline">
                        <Button type="primary" onClick={addMenu} style={{ marginLeft: 8, marginBottom: 8, }}>
                            ??????
                        </Button>
                        <Button type="danger" onClick={deleteMenu} style={{ marginLeft: 8, marginBottom: 8, }}>
                            ??????
                        </Button>
                    </Form.Item>
                </div>
                <div>
                    <Form className="menu-form" name="control-ref"
                        ref={formRef}
                        {...layout}
                        onFinish={onFinish}
                        hidden={isFormVisible}
                    >
                        <Form.Item name="menuName" label="????????????" rules={[{ required: true, },]}>
                            <Input showCount maxLength={20} />
                        </Form.Item>
                        <Form.Item name="menuCode" label="????????????" rules={[{ required: true, },]}>
                            <Input showCount maxLength={20} />
                        </Form.Item>
                        <Form.Item name="menuUri" label="????????????" rules={[{ required: true, },]}>
                            <Input showCount maxLength={20} />
                        </Form.Item>
                        <Form.Item name="menuIcon" label="????????????" rules={[{ required: true, },]}>
                            <Input showCount maxLength={20} />
                        </Form.Item>
                        <Form.Item name="used" label="????????????">
                            <Radio.Group>
                                <Radio value="true">???</Radio>
                                <Radio value="false">???</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item name="hidden" label="????????????">
                            <Radio.Group>
                                <Radio value="true">???</Radio>
                                <Radio value="false">???</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item {...tailLayout} >
                            <Button type="button" htmlType="submit" onClick={onReset}>??????</Button>
                            <Button type="primary" htmlType="submit">??????</Button>
                        </Form.Item>
                    </Form>
                </div>
            </Content>
        </Layout>
    );
};


export default SysMenuPage;