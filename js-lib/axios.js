// 引入axios
import axios from 'axios';

// 创建axios实例
const httpService = axios.create({
    // url前缀-'https://some-domain.com/api/'
    baseURL: process.env.BASE_API, // 需自定义
    // 请求超时时间
    timeout: 3000 // 需自定义
});

// request拦截器
httpService.interceptors.request.use(
    config => {
        // 根据条件加入token-安全携带
        if (true) { // 需自定义
            // 让每个请求携带token
            config.headers['User-Token'] = '';
        }
        return config;
    },
    error => {
        // 请求错误处理
        Promise.reject(error);
    }
)

// response拦截器
httpService.interceptors.response.use(
    response => {
        // 统一处理状态
        const res = response.data;
        if (res.statusCode != 1) { // 需自定义
            // 返回异常
            return Promise.reject({
                status: res.statusCode,
                message: res.message
            });
        } else {
            return response.data;
        }
    },
    // 处理处理
    error => {
        if (error && error.response) {
            switch (error.response.status) {
                case 400:
                    error.message = '错误请求';
                    break;
                case 401:
                    error.message = '未授权，请重新登录';
                    break;
                case 403:
                    error.message = '拒绝访问';
                    break;
                case 404:
                    error.message = '请求错误,未找到该资源';
                    break;
                case 405:
                    error.message = '请求方法未允许';
                    break;
                case 408:
                    error.message = '请求超时';
                    break;
                case 500:
                    error.message = '服务器错误';
                    break;
                case 501:
                    error.message = '网络未实现';
                    break;
                case 502:
                    error.message = '网络错误';
                    break;
                case 503:
                    error.message = '服务不可用';
                    break;
                case 504:
                    error.message = '网络超时';
                    break;
                case 505:
                    error.message = 'http版本不支持该请求';
                    break;
                default:
                    error.message = `错误信息: ${error.response.status}`;
            }
        } else {
            error.message = "连接到服务器失败";
        }
        return Promise.reject(error);
    }
)

/*网络请求部分*/

/**
 * GET请求
 * @param {string} url 请求地址
 * @param {object} params 请求参数
 * @returns 
 */
export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        httpService({
            url: url,
            method: 'get',
            params: params
        }).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}

/**
 * POST请求
 * @param {string} url 请求地址
 * @param {object} params 请求参数
 * @returns 
 */
export function post(url, params = {}) {
    return new Promise((resolve, reject) => {
        httpService({
            url: url,
            method: 'post',
            data: params
        }).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}

/**
 * 文件上传
 * @param {string} url 请求地址
 * @param {object} params 请求参数
 * @returns 
 */
export function fileUpload(url, params = {}) {
    return new Promise((resolve, reject) => {
        httpService({
            url: url,
            method: 'post',
            data: params,
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}

export default {
    get,
    post,
    fileUpload
}


// 引入工具类-目录自定义
import fetch from '@/util/fetch'

// 使用
const TMPURL = ''; // url地址
const params = {}; // 参数
fetch.post(TMPURL + '/login/login', params);
