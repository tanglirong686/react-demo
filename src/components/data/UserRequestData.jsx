import qs from 'qs';
import requestFun from '../common/fetchUtil.jsx';   //引入封装请求工具

import { message } from 'antd';

const { stringify } = qs;
const { post, get } = requestFun;

// 登录
export const login = async (params) =>{
    let result = await post('/api/user/login', params);
    return result;
};

// 注册
export const regiester = async (params) =>{
    let result = await post('/api/user/login', params);
    return result;
};

// 通过id查询用户信息
export const getUserById = async (params) => {
    let result = await get(`/api/user/queryById?${stringify(params)}`);
    if(result && result.code == 1){
        return result.data;
    }else{
        message.error(result.msg);
    }
};

// 用户列表
export const getUserList = async (params) => {
    let result = await post('/api/user/queryList', params);
    if(result && result.code == 1){
        return result.data;
    }else{
        message.error(result.msg);
    }
}

// 保存用户信息
export const saveUserInfo = async (params) => {
    let result = await post('/api/user/saveOrUpdate', params);
    if(result && result.code == 1){
        message.info(result.msg);
    }else{
        message.error(result.msg);
    }
}

// 保存用户信息
export const deleteUserInfo = async (params) => {
    let result = await post('/api/user/deleteById', params);
    if(result && result.code == 1){
        message.info(result.msg);
    }else{
        message.error(result.msg);
    }
}