const base_url = {
    PROD: '', // 生产环境地址
    DEV: ''   // 开发环境地址
}
const showToast = (title) => {
    uni.showToast({
        title: title,
        icon: 'none'
    })
}
const request = (obj) => {
    obj.url = obj.url || '';
    obj.method = obj.method || 'GET';
    obj.data = obj.data || {};
    obj.header = obj.header || 'application/json';
    obj.loading = obj.loading === false ? false : true;
    let token = store.getters.token || ''; // 登录获得的 token
    let loadingStatus = true;
    setTimeout(() => {
        if (loadingStatus && obj.loading) {
            uni.showLoading({
                title: '加载中',
                mask: true
            })
        }
    }, 800) // 800毫秒后如果loadingStatus === false 则表示请求返回了，不显示loading
    return new Promise((resolve, reject) => {
        uni.request({
            url: (process.env.NODE_ENV === 'development' ? base_url.DEV : base_url.PROD) + obj.url,
            method: obj.method,
            data: obj.data,
            header: {
                'TOKEN': token,
                'Content-Type': obj.header,
                ...obj.other
            },
            success: res => { // 服务器成功返回的回调函数
                if (res.statusCode === 200) {
                    let result = res.data;
                    if (result.code === '') { // 跟后端约定的code
                        resolve(result);
                        return;
                    } else if (result.code === '') { // 跟后端约定的code
                        store.dispatch('user/logout'); // 清空token
                        reject(result);
                        uni.redirectTo({
                            url: '/pages/index/index'
                        })
                        uni.showModal({
                            showCancel: false,
                            content: '登录过期',
                            success: function (res) { }
                        });
                        return;
                    } else if (result.code === '') { // 跟后端约定的code
                        loadingStatus = false
                        showToast(result.msg);
                        reject(result);
                        return;
                    }
                    reject(result);
                } else { // 返回值非 200，强制显示提示信息
                    loadingStatus = false
                    showToast('[' + res.statusCode + '] 系统处理失败');
                    reject('[' + res.statusCode + '] 系统处理失败');
                }
            },
            fail: (err) => { // 接口调用失败的回调函数
                if (err.errMsg != 'request:fail abort') {
                    loadingStatus = false
                    showToast('连接超时，请检查您的网络');
                    reject('连接超时，请检查您的网络');
                }
            },
            complete: () => {
                if (loadingStatus && obj.loading) {
                    uni.hideLoading()
                    loadingStatus = false
                }
            }
        })
    })
}

export default request
