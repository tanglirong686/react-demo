import qs from 'qs';
import requestFun from '../common/fetchUtil.jsx';   //引入封装请求工具

import { message } from 'antd';

const { stringify } = qs;
const { post, get } = requestFun;

// 通过id查询角色信息
export const getRoleById = async (params) => {
    let result = await get(`/api/role/queryById?${stringify(params)}`);
    if(result && result.code == 1){
        return result.data;
    }else{
        message.error(result.msg);
    }
};

// 角色列表
export const getRoleList = async (params) => {
    let result = await post('/api/role/queryList', params);
    if(result && result.code == 1){
        return result.data;
    }else{
        message.error(result.msg);
    }
}

// 保存角色信息
export const saveRoleInfo = async (params) => {
    let result = await post('/api/role/saveOrUpdate', params);
    if(result && result.code == 1){
        message.info(result.msg);
    }else{
        message.error(result.msg);
    }
}

// 保存角色信息
export const deleteRoleInfo = async (params) => {
    let result = await post('/api/role/deleteById', params);
    if(result && result.code == 1){
        message.info(result.msg);
    }else{
        message.error(result.msg);
    }
}