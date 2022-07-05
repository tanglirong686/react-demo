import './style.css';
import qs from 'qs';
import React, {useEffect, useState } from "react";
import { Form, Table, Radio, Button, Input, Layout, Tree, Popconfirm, message, Pagination, Modal } from 'antd';
import { CarryOutOutlined, FormOutlined } from '@ant-design/icons';

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

// const columns = [
//     {
//         title: '字典名称',
//         dataIndex: 'dictName',
//         width: 100,
//     },
//     {
//         title: '字典标识',
//         dataIndex: 'dictCode',
//         width: 80,
//     },
//     {
//         title: '字典值',
//         dataIndex: 'dictValue',
//         width: 120,
//     },
//     {
//         title: '字典类型',
//         dataIndex: 'dictType',
//         width: 100,
//     },
//     {
//         title: '是否启用',
//         dataIndex: 'status',
//         width: 80,
//     },
//     {
//         title: '排序',
//         dataIndex: 'sortNum',
//         width: 120,
//     },
// ];
// const data = [];

// for (let i = 0; i < 20; i++) {
//     data.push({
//         key: i,
//         dictName: `dictName ${i}`,
//         dictCode: `dictCode ${i}`,
//         dictValue: `dictValue ${i}`,
//         dictType: `dictType ${i}`,
//         status: i % 2 == 0 ? '是' : '否',
//         sortNum: `${i}`,
//     });
// };

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        sorter: true,
        render: (name) => `${name.first} ${name.last}`,
        width: '20%',
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        filters: [
            {
                text: 'Male',
                value: 'male',
            },
            {
                text: 'Female',
                value: 'female',
            },
        ],
        width: '20%',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
];

const getRandomuserParams = (params) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
});

const siderStyle = { width: '100%', height: '100%', background: '#fff' };

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 14,
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

const DictManagerPage = () => {
    const [showLine] = useState(true);
    const [showIcon] = useState(false);
    // 查询/重置加载
    const [loading, setLoading] = useState(false);
    const [resetLoging, setResetLoading] = useState(false);
    // 选择中的树节点
    const [selectedItem, setSelectedItem] = useState([]);
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
    // 新增/编辑模态框是否可见
    const [isModalVisible, setIsModalVisible] = useState(false);
    // 模态框展示标题
    const [displayTitle, setDisplayTitle] = useState([]);
    // 查询条件表单链接对象
    const queryForm = React.createRef();
    // 定义一个链接表单对象
    const formRef = React.createRef();
    // 删除确认框是否弹出，默认否
    const [visible, setVisible] = useState(false);

    // 重置加载
    const start = () => {
        setResetLoading(true); // ajax request after empty completing

        setTimeout(() => {
            setResetLoading(false);
        }, 1000);
    };
    // 查询加载
    const doQuery = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    // 树节点选中操作
    const onSelect = (selectedKeys, info) => {
        // 选中数据
        if (selectedKeys && selectedKeys.length > 0) {
            // 设置选中的数据
            setSelectedItem(info);
            console.log('selectedKeys', selectedKeys);
            doQuery();
        } else {
            // 取消选中数据
            doQuery();
        }
    };
    // 表格数据行选中
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRow(selectedRows)
        }
    };

    const fetchData = (params = {}) => {
        setTableLoading(true);
        fetch(`https://randomuser.me/api?${qs.stringify(getRandomuserParams(params))}`)
            .then((res) => res.json())
            .then(({ results }) => {
                setData(results);
                setTableLoading(false);
                setPagination({
                    ...params.pagination,
                    total: 200, // 200 is mock data, you should read it from server
                    // total: data.totalCount,
                });
            });
    };

    useEffect(() => {
        fetchData({
            pagination,
        });
    }, []);

    // 表格变化监听
    const handleTableChange = (newPagination, filters, sorter) => {
        fetchData({
            sortField: sorter.field,
            sortOrder: sorter.order,
            pagination: newPagination,
            ...filters,
        });
    };

    // 新增
    const addMenu = () => {
        // 设置表单可见
        setIsModalVisible(true);
        formRef.current.resetFields();
        // 设置新增标题
        setDisplayTitle("新增字典");
    };
    // 编辑
    const editMenu = () => {
        if (selectedRow && selectedRow.length == 1) {
            // 打开新增的模态框
            setIsModalVisible(true);
            setDisplayTitle("编辑字典");
            let editData = selectedRow[0];
            // 设置表单相关字段的值，以便重新渲染
            formRef.current.setFieldsValue({
                "dictName": editData.dictName,
                "dictCode": editData.dictCode,
                "dictValue": editData.dictValue,
                "dictType": editData.dictType,
                "status": editData.status,
                "sortNum": editData.sortNum,
            });
            return;
        }
        message.info('请选中一条数据进行操作');
    };
    // 新增保存回调
    const handleOk = async () => {
        setIsModalVisible(false);
        let fieldsValue = formRef.current.validateFields();
        let result = await fieldsValue;
        console.log(result)
    };
    // 新增取消回调
    const handleCancel = () => {
        setIsModalVisible(false);
        formRef.current.resetFields();
    };

    // 删除
    const deleteMenu = () => {
        if (selectedRow && selectedRow.length > 0) {
            console.log(selectedRow)
            // 设置提示框可见
            setVisible(true);
            // 进行删除
            return;
        }
        message.info('请至少选中一条数据进行操作');
    };
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
    return (
        <Layout style={siderStyle}>
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
                <>
                    <div style={he}>
                        <Form className="query-form" name="query-form" layout="inline" ref={queryForm}
                            {...layout}
                        >
                            <Form.Item name="dictName" label="字典名称">
                                <Input showCount maxLength={20} />
                            </Form.Item>
                            <Form.Item name="dictCode" label="字典标识">
                                <Input showCount maxLength={20} />
                            </Form.Item>
                            <Form.Item layout="inline">
                                <Button type="primary" onClick={doQuery} loading={loading} style={{ marginBottom: 8, }}>
                                    查询
                                </Button>
                            </Form.Item>
                            <Form.Item layout="inline">
                                <Button type="button" onClick={start} loading={resetLoging} style={{ marginBottom: 8, }}>
                                    重置
                                </Button>
                            </Form.Item>
                        </Form>
                        <Form.Item layout="inline">
                            <Button type='primary' onClick={addMenu} style={{ marginLeft: 10, marginBottom: 8, }}>新增</Button>
                            <Button type='primary' onClick={editMenu} style={{ marginLeft: 10, marginBottom: 8, }}>编辑</Button>
                            <Popconfirm
                                title="该操作会删除数据，是否确认操作?"
                                visible={visible}
                                onVisibleChange={handleVisibleChange}
                                onConfirm={confirm}
                                onCancel={cancel}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button type='danger' onClick={deleteMenu} style={{ marginLeft: 10, marginBottom: 8, }}>删除</Button>
                            </Popconfirm>
                        </Form.Item>
                    </div>
                    <div style={ct}>
                        <Table
                            rowSelection={{ type: 'checkbox', ...rowSelection }}
                            columns={columns}
                            rowKey={(record) => record.login.uuid}
                            dataSource={data}
                            pagination={pagination}
                            loading={tableLoading}
                            onChange={handleTableChange}
                            scroll={{
                                y: 360,
                            }}
                        />
                        <Modal title={displayTitle} okText="保存" cancelText="取消" forceRender={true} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                            <Form
                                className="add-form" name="add-form" {...addLayout}
                                ref={formRef}
                            >
                                <Form.Item name="dictName" label="字典名称" rules={[{ required: true, },]}>
                                    <Input showCount maxLength={20} />
                                </Form.Item>
                                <Form.Item name="dictCode" label="字典标识" rules={[{ required: true, },]}>
                                    <Input showCount maxLength={20} />
                                </Form.Item>
                                <Form.Item name="dictValue" label="字典值" rules={[{ required: true, },]}>
                                    <Input showCount maxLength={20} />
                                </Form.Item>
                                <Form.Item name="dictType" label="字典类型" rules={[{ required: true, },]}>
                                    <Input showCount maxLength={20} />
                                </Form.Item>
                                <Form.Item name="sortNum" label="排序号" rules={[{ required: true, },]}>
                                    <Input showCount maxLength={11} />
                                </Form.Item>
                                <Form.Item name="status" label="是否启用">
                                    <Radio.Group>
                                        <Radio value="1">是</Radio>
                                        <Radio value="0">否</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Form>
                        </Modal>
                    </div>
                </>
            </Content>
        </Layout>

    );
};

export default DictManagerPage;