import React, { useEffect, useState } from 'react';

import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Table, Form, Input, Modal, Radio, message } from 'antd';

const { confirm } = Modal;

import { saveUserInfo, deleteUserInfo, getUserById, getUserList } from '../../../components/data/UserRequestData.jsx';

const columns = [
    {
        title: '用户名',
        dataIndex: 'userName',
        width: 100,
    },
    {
        title: '手机号',
        dataIndex: 'phoneNum',
        width: 80,
    },
    {
        title: '是否启用',
        dataIndex: 'status',
        render: (status) => {
            if (status) {
                return '启用';
            } else {
                return '禁用';
            }
        },
        width: 80,
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
        width: 80,
    },
];

const layout = {
    labelCol: {
        span: 10,
    },
    wrapperCol: {
        span: 16,
    },
};

const addLayout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 14,
    },
};

const he = { height: '15%', width: '100%' };
const ct = { height: '85%', width: '100%' };
const tb = { height: '100%', width: '100%' };

const SysUserPage = () => {
    // 表格数据
    const [data, setData] = useState();
    // 表格加载状态
    const [tableLoading, setTableLoading] = useState(false);
    // 表格初始分页参数
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });
    // 表格数据选择行
    const [selectedRow, setSelectedRow] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    // 新增/编辑模态框是否可见
    const [isModalVisible, setIsModalVisible] = useState(false);
    // 模态框展示标题
    const [displayTitle, setDisplayTitle] = useState([]);
    // 查询条件表单链接对象
    const queryForm = React.createRef();
    // 新增/编辑表单链接对象
    const formRef = React.createRef();

    const userList = (params = {}) => {
        setTableLoading(true);
        let queryParam = {
            ...params.pagination,
            ...params.param,
        };
        getUserList(queryParam)
            .then((result) => {
                setData(result.records);
                setTableLoading(false);
                setPagination({
                    ...params.pagination,
                    total: result.total,
                });
            })
            .catch(res=>{
                setTableLoading(false);
                message.error('用户数据查询异常');
            });
    };
    // 初始化表格加载
    useEffect(() => {
        userList({
            pagination,
        });
    }, []);

    // 表格变化监听
    const handleTableChange = (newPagination,params) => {
        userList({
            pagination: newPagination,
            param: params,
        });
    };
    // 重置加载
    const reloadQuery = () => {
        // 清空查询条件框
        queryForm.current.resetFields();
        setTableLoading(true);
        let params = {
            current: 1,
            pageSize: 10,
        }
        // 重新加载数据
        handleTableChange(params);
        setSelectedRowKeys([]);
        setTableLoading(false);
    };
    // 查询加载
    const doQuery = async () => {
        setTableLoading(true);
        let fieldsValue = queryForm.current.validateFields();
        let result = await fieldsValue;
        // 重新加载数据
        let params = {
            current: 1,
            pageSize: 10,
            ...result
        }
        handleTableChange(params);
        setSelectedRowKeys([]);
        setTableLoading(false);
    };

    // 数据行选中变化监听
    const onSelectChange = (newSelectedRowKeys, newSelectedRow) => {
        setSelectedRowKeys(newSelectedRowKeys);
        setSelectedRow(newSelectedRow);
    };

    // 数据行选中
    const rowSelection = {
        selectedRowKeys,
        selectedRow,
        onChange: onSelectChange,
    };

    // 新增保存回调
    const handleOk = async () => {
        setIsModalVisible(false);
        let fieldsValue = formRef.current.validateFields();
        let result = await fieldsValue;
        saveUserInfo(result);
        // 重新加载数据
        handleTableChange(pagination);
        setSelectedRowKeys([]);
    };
    // 新增取消回调
    const handleCancel = () => {
        setIsModalVisible(false);
        formRef.current.resetFields();
    };

    // 新增用户弹窗
    const addUser = () => {
        setIsModalVisible(true);
        formRef.current.resetFields();
        setDisplayTitle("新增用户");
    }

    // 编辑回显
    const editUser = async () => {
        if (selectedRow && selectedRow.length == 1) {
            const data = await getUserById({ 'userId': selectedRow[0].userId });
            // 打开新增的模态框
            setIsModalVisible(true);
            setDisplayTitle("编辑用户");
            // 设置表单相关字段的值，以便重新渲染
            const dd = {
                "userId": data.userId,
                "userName": data.userName,
                "password": data.password,
                "phoneNum": data.phoneNum,
                'status': '' + data.status
            }
            formRef.current.setFieldsValue(dd);
            return;
        }
        message.info('请选中一条数据进行操作');
    }

    // 删除
    const deleteUser = () => {
        if (selectedRow && selectedRow.length > 0) {
            // 删除确认框
            confirm({
                title: '用户删除',
                icon: <ExclamationCircleOutlined />,
                content: '该操作会删除数据，是否确认操作?',
                okText: '确认',
                okType: 'danger',
                cancelText: '取消',
                onOk() {
                    // 进行删除
                    deleteUserInfo(selectedRowKeys);
                    // 重新加载数据
                    handleTableChange(pagination);
                    setSelectedRowKeys([]);
                },
            });
            return;
        }
        message.info('请至少选中一条数据进行操作');
    };
    return (
        <>
            <div style={he}>
                <Form className="query-form" name="query-form" layout="inline" ref={queryForm}
                    {...layout}
                >
                    <Form.Item name="userName" label="用户名称">
                        <Input showCount maxLength={20} />
                    </Form.Item>
                    <Form.Item layout="inline">
                        <Button type="primary" onClick={doQuery} style={{ marginBottom: 8, }}>
                            查询
                        </Button>
                    </Form.Item>
                    <Form.Item layout="inline">
                        <Button type="button" onClick={reloadQuery} style={{ marginBottom: 8, }}>
                            重置
                        </Button>
                    </Form.Item>
                </Form>
                <Form.Item layout="inline">
                    <Button type='primary' onClick={addUser} style={{ marginLeft: 10, marginBottom: 8, }}>新增</Button>
                    <Button type='primary' onClick={editUser} style={{ marginLeft: 10, marginBottom: 8, }}>编辑</Button>
                    <Button type='danger' onClick={deleteUser} style={{ marginLeft: 10, marginBottom: 8, }}>删除</Button>
                </Form.Item>
            </div>
            <div style={ct}>
                <div style={tb}>
                    <Table
                        rowSelection={{ type: 'checkbox', ...rowSelection }}
                        columns={columns}
                        dataSource={data}
                        rowKey={(data) => data.userId}
                        pagination={pagination}
                        loading={tableLoading}
                        onChange={handleTableChange}
                        scroll={{
                            y: 330,
                        }}
                    />
                </div>
                <>
                    <Modal title={displayTitle} okText="保存" cancelText="取消" forceRender={true} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                        <Form className="add-form" name="add-form" {...addLayout}
                            ref={formRef}
                        >
                            <Form.Item name="userId" hidden="true">
                                <Input />
                            </Form.Item>
                            <Form.Item name="userName" label="用户名" rules={[{ required: true, },]}>
                                <Input showCount maxLength={20} />
                            </Form.Item>
                            <Form.Item name="password" label="密码" rules={[{ required: true, },]}>
                                <Input showCount maxLength={20} />
                            </Form.Item>
                            <Form.Item name="phoneNum" label="手机号" rules={[{ required: true, },]}>
                                <Input showCount maxLength={11} />
                            </Form.Item>
                            <Form.Item name="status" label="是否启用">
                                <Radio.Group>
                                    <Radio value="true">是</Radio>
                                    <Radio value="false">否</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Form>
                    </Modal>
                </>
            </div>
        </>
    )
};

export default SysUserPage;