import './style.css';
import React, { useState } from "react";
import { Form, Radio, Button, Input, Layout, Tree, Popconfirm, message } from 'antd';
import { CarryOutOutlined, FormOutlined } from '@ant-design/icons';


const { Sider, Content } = Layout;

const { Search } = Input;

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
    const [showLine] = useState(true);
    const [showIcon] = useState(false);
    // 选择中的树节点
    const [selectedItem, setSelectedItem] = useState([]);
    // 新增表单是否显示的控制，默认不显示表单
    const [isFormVisible, setIsFormVisible] = useState(true);
    // 定义一个链接表单对象
    const formRef = React.createRef();
    // 删除确认框是否弹出，默认否
    const [visible, setVisible] = useState(false);

    // 删除确认
    const confirm = () => {
        setVisible(false);
        message.success('Next step.');
    };
    // 删除取消
    const cancel = () => {
        setVisible(false);
        message.error('Click on cancel.');
    };
    // 处理删除提示信息展示状态
    const handleVisibleChange = (newVisible) => {
        if (!newVisible) {
            setVisible(newVisible);
            return;
        }
    };
    // 树节点选中操作
    const onSelect = (selectedKeys, info) => {
        // 选中数据
        if(selectedKeys && selectedKeys.length > 0){
            // 设置选中的数据
            setSelectedItem(info);
            console.log('selectedKeys', selectedKeys);
            // 设置表单可见
            setIsFormVisible(false);
            formRef.current.setFieldsValue({
                "menuName": "name",
                "menuCode": "code",
                "menuUri": "uri",
                "menuIcon": "icon",
                "used": "1",
                "hidden": "0",
            });
        }else{
            // 取消选中数据
            formRef.current.resetFields();
            // 置空选中
            setSelectedItem([]);
        }
    };
    // 保存
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    const onReset = () => {
        formRef.current.resetFields();
    };
    // 删除
    const deleteMenu = () => {
        if (selectedItem) {
            // 选中节点
            if(selectedItem.selectedNodes && selectedItem.selectedNodes.length > 0){
                console.log(selectedItem.node);
                // 设置提示框可见
                setVisible(true);
                return;
            }
        }
        message.info('请选中左侧菜单数据');
    };
    // 新增
    const addMenu = () => {
        // 设置表单可见
        setIsFormVisible(false);
        formRef.current.resetFields();
    };
    return (
        <Layout style={menuStyle}>
            <Sider className="menu-left" theme="light" >
                <Tree
                    showLine={showLine}
                    showIcon={showIcon}
                    defaultExpandedKeys={['0-0-0']}
                    onSelect={onSelect}
                    treeData={treeData}
                />
            </Sider>
            <Content className="menu-content" >
                <div>
                    <Form.Item layout="inline">
                        <Button type="primary" onClick={addMenu} style={{ marginLeft: 8, marginBottom: 8, }}>
                            新增
                        </Button>
                        <Popconfirm
                            title="该操作会删除数据，是否确认操作?"
                            visible={visible}
                            onVisibleChange={handleVisibleChange}
                            onConfirm={confirm}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button type="danger" onClick={deleteMenu} style={{ marginLeft: 8, marginBottom: 8, }}>
                                删除
                            </Button>
                        </Popconfirm>
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
                                <Radio value="1">是</Radio>
                                <Radio value="0">否</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item name="hidden" label="是否隐藏">
                            <Radio.Group>
                                <Radio value="1">是</Radio>
                                <Radio value="0">否</Radio>
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