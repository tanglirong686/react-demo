import qs from 'qs';
import requestFun from '../common/fetchUtil.jsx';   //引入封装请求工具

import { message } from 'antd';

const { stringify } = qs;
const { post, get } = requestFun;

// 通过id查询菜单信息
export const getMenuById = async (params) => {
    let result = await get(`/api/menu/queryById?${stringify(params)}`);
    if(result && result.code == 1){
        return result.data;
    }else{
        message.error(result.msg);
    }
};

// 菜单列表
export const getMenuTree = async (params) => {
    let result = await post('/api/menu/getMenuTree', params);
    if(result && result.code == 1){
        return result.data;
    }else{
        message.error(result.msg);
    }
}

// 保存菜单信息
export const saveMenuInfo = async (params) => {
    let result = await post('/api/menu/saveOrUpdate', params);
    if(result && result.code == 1){
        message.info(result.msg);
    }else{
        message.error(result.msg);
    }
}

// 删除菜单信息
export const deleteMenuInfo = async (params) => {
    let result = await post('/api/menu/deleteById', params);
    if(result && result.code == 1){
        message.info(result.msg);
    }else{
        message.error(result.msg);
    }
}