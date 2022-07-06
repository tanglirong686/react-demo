import '../../style/login.css';

import React from 'react';
import {useNavigate} from 'react-router-dom';
import { Form, Input, Button, Row, message } from 'antd';
import { UserOutlined, LockOutlined, BarcodeOutlined } from '@ant-design/icons';


import cookieUtil from '../common/browerCache.jsx';
import {login , regiester} from '../data/UserRequestData.jsx';


const Login = () => {
    // 登录表单对象
    const loginForm = React.createRef();

    const navigate = useNavigate();

    // 登录
    const loginFun = async () =>{
        const formValues = await loginForm.current.validateFields();
        const params = {
            userName: formValues.userName,
            password: formValues.password,
        };
        // // 设置登录成功
        // cookieUtil.add('logging',true);
        // // 临时写死的用户token
        // const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGx9.PG4QF2a2H0jv-tYkq5AZ4cvQu4QCaPXLlVt_45VIlsI';
        // cookieUtil.add('token' ,token);
        // // 重定向到首页
        // navigate('/home');
        login(params).then(res => {
            console.log(res)
            if (res.code === 1) {
                cookieUtil.add('token',res.data.token);
                // 设置登录成功
                cookieUtil.add('logging',true);
                navigate('/home')
                message.success(res.msg)
            } else {
                message.error(res.msg)
            }
        })
    };
    // 注册
    const regiesterFun = async () =>{
        // 取表单参数
        const formValues = await loginForm.current.validateFields();
        console.log(formValues)
        const params = {
            userName: formValues.userName,
            password: formValues.password,
        };
        // 注册
        regiester(params).then(res=>{
            if (res.code === 1) {
                // 调用登录
                regiesterFun(params);
            } else {
                message.error(res.msg)
            }
        });
    };

    return (
        <div className="login-box">
            <Row type="flex" justify="center" align="middle" style={{ minHeight: '100vh' }}>
                <Form name="normal_login" className="login-form" ref={loginForm}>
                    <Form.Item name="userName" rules={[{ required: true, message: '请输入账号' }]} >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="账号" size="large" />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]} >
                        <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="密码" size="large" />
                    </Form.Item>
                    <Form.Item layout="inline">
                        <Button type='primary' onClick={loginFun} style={{ marginLeft: 70, marginBottom: 8, }}>登录</Button>
                        <Button type='primary' onClick={regiesterFun} style={{ marginLeft: 10, marginBottom: 8, }}>注册</Button>
                    </Form.Item>
                </Form>
            </Row>
        </div>
    )
}
export default Login;