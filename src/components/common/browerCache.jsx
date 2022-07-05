import cookie from 'react-cookies';

class build {

    /**
     * add 将数据加入到浏览器cookie缓存中
     * @param key 存值的标识key
     * @param data 存储数据
     * @param option 额外配置项
     */
    add(key, data = {}, option = {}) {
        if(option){
            cookie.save('userInfo', data, option)
        }
        // path:'/' 表示全局可以访问
        cookie.save(key, data, { path: '/'})
    }

    /**
     * get 通过key从浏览器cookie缓存中取相应的数据
     * @param key 存值的标识key
     * @param option 额外配置项
     */
    get(key, option = {}) {
        let data = cookie.load(key);
        return data;
    }

    /**
     * remove 通过key从浏览器cookie缓存中删除相应的数据
     * @param key 存值的标识key
     * @param option 额外配置项
     */
    remove(key, option = {}) {
        if(option){
            cookie.load(key ,option);
        }
        cookie.load(key ,{ path: '/'});
    }
}

const cookieUtil = new build(); //new生成实例
export const { add, get, remove } = cookieUtil;
export default cookieUtil; // 导出