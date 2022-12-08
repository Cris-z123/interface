import axios from 'axios';
import QS from 'qs'; //编码数据
import { Toast } from 'UI';
import store from 'store';

const instance = axios.create({
    // url前缀-'https://some-domain.com/api/'
    baseURL: process.env.BASE_API, // 需自定义
    // 请求超时时间
    timeout: 3000 // 需自定义
});

instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

//请求拦截器
instance.interceptors.request.use(
    config => {
        const token = store.state.token;
        token && (config.headers.Authorization = token);
        return config;
    },
    error => Promise.error(error)
);

//响应拦截器
instance.interceptors.response.use(
    res => response.status === 200 ? Promise.resolve(res) : Promise.reject(res),
    error => {
        if(error.response.status) {
            switch (error.response.status) {
                case 401:
                    router.replace({
                        path: '/login',
                        query: {
                            redirect: router.current 
                        }
                    });
                    break;
                case 403:
                    Toast({
                        message: '登录过期，请重新登陆',
                        duration: 1000,
                        forbidClick: true
                    });
                    localStorage.removeItem('token');
                    store.commit('loginSuccess', null);
                    setTimeout(() => {
                        router.replace({
                            path: '/login',
                            query: {
                                redirect: router
                            }
                        })
                    }, 1000)
                    break;
                case 404:
                    Toast({
                        message: '资源不存在',
                        duration: 1500,
                        forbidClick: true
                    });
                    break;
                default:
                    Toast({
                        message: error.response.data.mes,
                        duration: 1500,
                        forbidClick: true
                    })
            }
            return Promise.reject(error.response)
        }
    }
);

export function get(url, params) {
    return new Promise((resolve, reject) => {
        instance.get(url, {
            params: params
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.data)
        })
    })
};

export function post(url, params) {
    return new Promise((resolve, reject) => {
        instance.post(url, QS.stringify(params))
        .then(res => {
            resolve(res.data)
        })
        .catch(err => {
            reject(err.data)
        })
    })
};