// 使用axios，处理登陆情况
import axios from  'axios'

let instance  = axios.create({
    baseURL: 'api/xxx/'
})

// 请求拦截器
instance.interceptors.request.use(
    request => {
        const auth = 'Token' + localStorage.getItem('token');
        request.headers.Authorization = auth
        return request
    },
    error => {
        console.log('There are some problem with this request')
        console.log(error);
        return Promise.reject(error);
    }
)


// 响应拦截器
instance.interceptors.response.use(
    response => { response },
    error => {
        if(error.response.status === 401) {
            MessageBox.confirm = ('登录过期,请重新登陆', '确定登出', {
                confirmButtonText: '重新登录',
                type: 'warning'
            }).then(() => {
                get('/xxx/logout').then(response => {
                    localStorage.removeItem('token');
                    location.reload();
                })
            })
        }
        return Promise.reject(error);
    }
)


// 封装GET请求
export function get(url, params) {
    return new Promise((resolve, reject) => {
        instance.get(url, {
            params
        })
          .then(response => {
              resolve(response);
          })
          .catch(error => {
              reject(error);
          })
    })
}

// 封装POST请求
export function post(url, params) {
    return new Promise((resolve, reject) => {
        instance.post(url, params)
          .then(response => {
              resolve(response);
          })
          .catch(error => {
              reject(error);
          })
    })
}