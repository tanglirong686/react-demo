import React, {useEffect, useState } from 'react';

import { Button, Table, Form, Input, Modal,Radio , message } from 'antd';

import {getRoleById , getRoleList ,saveRoleInfo ,deleteRoleInfo } from '../../../components/data/RoleRequestData.jsx';

const columns = [
    {
        title: '角色名称',
        dataIndex: 'roleName',
        width: 100,
    },
    {
        title: '角色标识',
        dataIndex: 'roleCode',
        width: 100,
    },
    {
        title: '是否启用',
        dataIndex: 'used',
        width: 80,
        render:(used)=>{
            if (used) {
                return '启用';
            } else {
                return '禁用';
            }
        }
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
        width: 120,
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
const tb = { height: '90%', width: '100%' };
const ft = { height: '10%', width: '100%' };

const SysRolePage = () => {
    // 表格数据
    const [data, setData] = useState();
    // 表格加载状态
    const [tableLoading, setTableLoading] = useState(false);
    // 表格初始分页参数
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });
    // 选中的表格行数据
    const [selectedRow, setSelectedRow] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    // 模态框展示标题
    const [displayTitle, setDisplayTitle] = useState([]);
    // 新增/编辑模态框是否展示
    const [isModalVisible, setIsModalVisible] = useState(false);
    // 创建查询条件表单链接对象
    const queryForm = React.createRef();
    // 创建新增/编辑表单链接对象
    const formRef = React.createRef();

    const roleList = (params = {}) => {
        setTableLoading(true);
        let queryParam = {
            ...params.pagination,
            ...params.param,
        };
        getRoleList(queryParam)
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
                message.error('角色数据查询异常');
            });
    };
    // 初始化表格加载
    useEffect(() => {
        roleList({
            pagination,
        });
    }, []);

    // 表格变化监听
    const handleTableChange = (newPagination,params) => {
        roleList({
            pagination: newPagination,
            param: params,
        });
    };
    // 重置加载
    const resetQuery = () => {
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

    // 新增/编辑保存回调
    const handleOk = async () => {
        setIsModalVisible(false);
        let fieldsValue = formRef.current.validateFields();
        let result = await fieldsValue;
        saveRoleInfo(result);
        // 重新加载数据
        handleTableChange(pagination);
        setSelectedRowKeys([]);
    };
    // 新增/编辑取消
    const handleCancel = () => {
        setIsModalVisible(false);
        formRef.current.resetFields();
    };

    // 新增
    const addRole = () => {
        setIsModalVisible(true);
        formRef.current.resetFields();
        setDisplayTitle("新增角色");
    }

    // 编辑
    const editRole = async () => {
        if(selectedRow && selectedRow.length == 1){
            const data = await getRoleById({ 'roleId': selectedRow[0].roleId });
            // 打开新增的模态框
            setIsModalVisible(true);
            setDisplayTitle("编辑角色");
            const info = {
                "roleId": data.roleId,
                "roleName": data.roleName,
                "roleCode": data.roleCode,
                'used': '' + data.used
            }
            // 设置表单相关字段的值，以便重新渲染
            formRef.current.setFieldsValue(info);
            return;
        }
        message.info('请选中一条数据进行操作');
    };

    // 删除
    const deleteRole = () => {
        if (selectedRow && selectedRow.length > 0) {
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
                    deleteRoleInfo(selectedRowKeys);
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
                <Form className="query-form" name="query-form" layout="inline"
                    {...layout} ref={queryForm}
                >
                    <Form.Item name="roleName" label="角色名称">
                        <Input showCount maxLength={20} />
                    </Form.Item>
                    <Form.Item name="roleCode" label="角色编码">
                        <Input showCount maxLength={20} />
                    </Form.Item>
                    <Form.Item layout="inline">
                        <Button type="primary" onClick={doQuery} style={{ marginBottom: 8, }}>
                            查询
                        </Button>
                    </Form.Item>
                    <Form.Item layout="inline">
                        <Button type="button" onClick={resetQuery} style={{ marginBottom: 8, }}>
                            重置
                        </Button>
                    </Form.Item>
                </Form>
                <Form.Item layout="inline">
                    <Button type='primary' onClick={addRole} style={{ marginLeft: 10, marginBottom: 8, }}>新增</Button>
                    <Button type='primary' onClick={editRole} style={{ marginLeft: 10, marginBottom: 8, }}>编辑</Button>
                    <Button type='danger' onClick={deleteRole} style={{ marginLeft: 10, marginBottom: 8, }}>删除</Button>
                </Form.Item>
            </div>
            <div style={ct}>
                <div style={tb}>
                    <Table
                        rowSelection={{ type: 'checkbox', ...rowSelection }}
                        columns={columns}
                        dataSource={data}
                        rowKey={(data) => data.roleId}
                        pagination={pagination}
                        loading={tableLoading}
                        onChange={handleTableChange}
                        scroll={{
                            y: 400,
                        }}
                    />
                </div>
                <>
                    <Modal title={displayTitle} okText="保存" cancelText="取消" forceRender={true} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                        <Form className="add-form" name="add-form" {...addLayout}
                            ref={formRef} 
                        >
                            <Form.Item name="roleId" hidden="true">
                                <Input />
                            </Form.Item>
                            <Form.Item name="roleName" label="角色名称" rules={[{ required: true, },]}>
                                <Input  showCount maxLength={20} />
                            </Form.Item>
                            <Form.Item name="roleCode" label="角色编码" rules={[{ required: true, },]}>
                                <Input showCount maxLength={20} />
                            </Form.Item>
                            <Form.Item name="used" label="是否启用">
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

export default SysRolePage;