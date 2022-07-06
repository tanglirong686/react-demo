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
    // 菜单数据
    const [menuData , setMenuData] = useState([]);

    const [showLine] = useState(true);
    const [showIcon] = useState(false);
    // 选择中的树节点
    const [selectedItem, setSelectedItem] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);
    // 新增表单是否显示的控制，默认不显示表单
    const [isFormVisible, setIsFormVisible] = useState(true);
    // 定义一个链接表单对象
    const formRef = React.createRef();

    // 初始化表格加载
    useEffect(() => {
        menuTreeData();
    }, []);

    // 字典树结构数据获取
    const menuTreeData = ()=> {
        getMenuTree()
            .then((result)=>{
                console.log(result);
                setMenuData(result);
            })
            .catch(res=>{
                message.error('菜单数据获取异常');
            });
    };

    // 树节点选中操作
    const onSelect = async (selectedKeys, info) => {
        // 选中数据
        if(selectedKeys && selectedKeys.length > 0){
            // 设置选中的数据
            setSelectedItem(info);
            setSelectedKeys(selectedKeys);
            console.log('selectedKeys', selectedKeys);
            // 通过id查询菜单
            let data = await getMenuById({ 'menuId': selectedKeys[0] });
            const menu = {
                "menuName": data.menuName,
                "menuCode": data.menuCode,
                "menuUri": data.menuUri,
                "menuIcon": data.menuIcon,
                "used": ''+ data.used,
                "hidden": ''+ data.hidden,
            }
            // 设置表单可见
            setIsFormVisible(false);
            formRef.current.setFieldsValue(menu);
        }else{
            // 取消选中数据
            formRef.current.resetFields();
            // 置空选中
            setSelectedItem([]);
            setSelectedKeys([]);
        }
    };
    // 新增
    const addMenu = () => {
        // 设置表单可见
        setIsFormVisible(false);
        formRef.current.resetFields();
    };
    // 保存
    const onFinish = (values) => {
        // 保存
        saveMenuInfo(values);
        // 重新加载树
        menuTreeData();
    };
    // 表单重置
    const onReset = () => {
        formRef.current.resetFields();
    };
    // 删除
    const deleteMenu = () => {
        if (selectedItem) {
            // 选中节点
            if(selectedItem.selectedNodes && selectedItem.selectedNodes.length > 0){
                console.log(selectedItem.node);
                // 删除确认框
                confirm({
                    title: '角色删除',
                    icon: <ExclamationCircleOutlined />,
                    content: '该操作会删除数据，是否确认操作?',
                    okText: '确认',
                    okType: 'danger',
                    cancelText: '取消',
                    onOk() {
                        // 进行删除
                        deleteMenuInfo(selectedKeys);
                        // 重新加载数据
                        //handleTableChange(pagination);
                        setSelectedItem([]);
                    },
                });
                return;
            }
        }
        message.info('请选中左侧菜单数据');
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
                            新增
                        </Button>
                        <Button type="danger" onClick={deleteMenu} style={{ marginLeft: 8, marginBottom: 8, }}>
                            删除
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
                        <Form.Item name="menuName" label="菜单名称" rules={[{ required: true, },]}>
                            <Input showCount maxLength={20} />
                        </Form.Item>
                        <Form.Item name="menuCode" label="菜单编码" rules={[{ required: true, },]}>
                            <Input showCount maxLength={20} />
                        </Form.Item>
                        <Form.Item name="menuUri" label="菜单地址" rules={[{ required: true, },]}>
                            <Input showCount maxLength={20} />
                        </Form.Item>
                        <Form.Item name="menuIcon" label="菜单图标" rules={[{ required: true, },]}>
                            <Input showCount maxLength={20} />
                        </Form.Item>
                        <Form.Item name="used" label="是否启用">
                            <Radio.Group>
                                <Radio value="true">是</Radio>
                                <Radio value="false">否</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item name="hidden" label="是否隐藏">
                            <Radio.Group>
                                <Radio value="true">是</Radio>
                                <Radio value="false">否</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item {...tailLayout} >
                            <Button type="button" htmlType="submit" onClick={onReset}>重置</Button>
                            <Button type="primary" htmlType="submit">保存</Button>
                        </Form.Item>
                    </Form>
                </div>
            </Content>
        </Layout>
    );
};


export default SysMenuPage;