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
//         title: '????????????',
//         dataIndex: 'dictName',
//         width: 100,
//     },
//     {
//         title: '????????????',
//         dataIndex: 'dictCode',
//         width: 80,
//     },
//     {
//         title: '?????????',
//         dataIndex: 'dictValue',
//         width: 120,
//     },
//     {
//         title: '????????????',
//         dataIndex: 'dictType',
//         width: 100,
//     },
//     {
//         title: '????????????',
//         dataIndex: 'status',
//         width: 80,
//     },
//     {
//         title: '??????',
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
//         status: i % 2 == 0 ? '???' : '???',
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
    // ??????/????????????
    const [loading, setLoading] = useState(false);
    const [resetLoging, setResetLoading] = useState(false);
    // ?????????????????????
    const [selectedItem, setSelectedItem] = useState([]);
    // ????????????
    const [data, setData] = useState();
    // ??????????????????
    const [tableLoading, setTableLoading] = useState(false);
    // ????????????????????????
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });
    // ?????????????????????
    const [selectedRow, setSelectedRow] = useState([]);
    // ??????/???????????????????????????
    const [isModalVisible, setIsModalVisible] = useState(false);
    // ?????????????????????
    const [displayTitle, setDisplayTitle] = useState([]);
    // ??????????????????????????????
    const queryForm = React.createRef();
    // ??????????????????????????????
    const formRef = React.createRef();
    // ???????????????????????????????????????
    const [visible, setVisible] = useState(false);

    // ????????????
    const start = () => {
        setResetLoading(true); // ajax request after empty completing

        setTimeout(() => {
            setResetLoading(false);
        }, 1000);
    };
    // ????????????
    const doQuery = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    // ?????????????????????
    const onSelect = (selectedKeys, info) => {
        // ????????????
        if (selectedKeys && selectedKeys.length > 0) {
            // ?????????????????????
            setSelectedItem(info);
            console.log('selectedKeys', selectedKeys);
            doQuery();
        } else {
            // ??????????????????
            doQuery();
        }
    };
    // ?????????????????????
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

    // ??????????????????
    const handleTableChange = (newPagination, filters, sorter) => {
        fetchData({
            sortField: sorter.field,
            sortOrder: sorter.order,
            pagination: newPagination,
            ...filters,
        });
    };

    // ??????
    const addMenu = () => {
        // ??????????????????
        setIsModalVisible(true);
        formRef.current.resetFields();
        // ??????????????????
        setDisplayTitle("????????????");
    };
    // ??????
    const editMenu = () => {
        if (selectedRow && selectedRow.length == 1) {
            // ????????????????????????
            setIsModalVisible(true);
            setDisplayTitle("????????????");
            let editData = selectedRow[0];
            // ???????????????????????????????????????????????????
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
        message.info('?????????????????????????????????');
    };
    // ??????????????????
    const handleOk = async () => {
        setIsModalVisible(false);
        let fieldsValue = formRef.current.validateFields();
        let result = await fieldsValue;
        console.log(result)
    };
    // ??????????????????
    const handleCancel = () => {
        setIsModalVisible(false);
        formRef.current.resetFields();
    };

    // ??????
    const deleteMenu = () => {
        if (selectedRow && selectedRow.length > 0) {
            console.log(selectedRow)
            // ?????????????????????
            setVisible(true);
            // ????????????
            return;
        }
        message.info('???????????????????????????????????????');
    };
    // ????????????
    const confirm = () => {
        setVisible(false);
        message.success('Next step.');
    };
    // ????????????
    const cancel = () => {
        setVisible(false);
        message.error('Click on cancel.');
    };
    // ????????????????????????????????????
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
                            <Form.Item name="dictName" label="????????????">
                                <Input showCount maxLength={20} />
                            </Form.Item>
                            <Form.Item name="dictCode" label="????????????">
                                <Input showCount maxLength={20} />
                            </Form.Item>
                            <Form.Item layout="inline">
                                <Button type="primary" onClick={doQuery} loading={loading} style={{ marginBottom: 8, }}>
                                    ??????
                                </Button>
                            </Form.Item>
                            <Form.Item layout="inline">
                                <Button type="button" onClick={start} loading={resetLoging} style={{ marginBottom: 8, }}>
                                    ??????
                                </Button>
                            </Form.Item>
                        </Form>
                        <Form.Item layout="inline">
                            <Button type='primary' onClick={addMenu} style={{ marginLeft: 10, marginBottom: 8, }}>??????</Button>
                            <Button type='primary' onClick={editMenu} style={{ marginLeft: 10, marginBottom: 8, }}>??????</Button>
                            <Popconfirm
                                title="??????????????????????????????????????????????"
                                visible={visible}
                                onVisibleChange={handleVisibleChange}
                                onConfirm={confirm}
                                onCancel={cancel}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button type='danger' onClick={deleteMenu} style={{ marginLeft: 10, marginBottom: 8, }}>??????</Button>
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
                        <Modal title={displayTitle} okText="??????" cancelText="??????" forceRender={true} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                            <Form
                                className="add-form" name="add-form" {...addLayout}
                                ref={formRef}
                            >
                                <Form.Item name="dictName" label="????????????" rules={[{ required: true, },]}>
                                    <Input showCount maxLength={20} />
                                </Form.Item>
                                <Form.Item name="dictCode" label="????????????" rules={[{ required: true, },]}>
                                    <Input showCount maxLength={20} />
                                </Form.Item>
                                <Form.Item name="dictValue" label="?????????" rules={[{ required: true, },]}>
                                    <Input showCount maxLength={20} />
                                </Form.Item>
                                <Form.Item name="dictType" label="????????????" rules={[{ required: true, },]}>
                                    <Input showCount maxLength={20} />
                                </Form.Item>
                                <Form.Item name="sortNum" label="?????????" rules={[{ required: true, },]}>
                                    <Input showCount maxLength={11} />
                                </Form.Item>
                                <Form.Item name="status" label="????????????">
                                    <Radio.Group>
                                        <Radio value="1">???</Radio>
                                        <Radio value="0">???</Radio>
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