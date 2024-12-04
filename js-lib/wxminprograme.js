/**
 * 这是对于微信五种路由跳转的方式进行的封装
 * 
 * routerFiler是负责路由跳转前的公共操作
 * 
 * @param {*路径} path 
 * @param {*参数} params 
 * @param {*事件} events 
 */


const push = (path, params, events) => {
    routerFiler()
    wx.navigateTo({
        url: router[path] + `?query=${JSON.stringify(params)}`,
        events: events,
        success(res) {
            console.log(res);
        },
        fail(err) {
            console.log(err)
        }
    })
}

const replace = (path, params) => {
    routerFiler()
    wx.redirectTo({
        url: router[path] + `?query=${JSON.stringify(params)}`,
        events: events,
        success(res) {
            console.log(res);
        },
        fail(err) {
            console.log(err)
        }
    })
}

const pop = (number) => {
    routerFiler()
    wx.navigateBack({
        delta: number,
        success(res) {
            console.log(res)
        },
        fail(err) {
            console.log(err)
        }
    })
}

const switchTab = (path) => {
    routerFiler()
    wx.switchTab({
        url: router[path] + `?query=${JSON.stringify(params)}`,
        events: events,
        success(res) {
            console.log(res);
        },
        fail(err) {
            console.log(err)
        }
    })
}


/**
 * 对于微信接口请求进行的Promise封装
 * 
 */

const app1 = getApp()

const request1 = (method, url, data, param) => {
    const header = {

    }

    return new Promise((resolve, reject) => {
        wx.request({
            method: method,
            url: app.globalData.host + url, // 可通过环境变量设置域名
            data: data,
            header: Object.assign(header, param),
            success(res) {
                resolve(res.data);
            },
            fail(err) {
                wx.showToast({
                    title: err || '网络异常，请稍后再试',
                    mask: true,
                    icon: 'error',
                    duration: 3000,
                    complete: () => {
                        return reject(err)
                    }
                })
            }
        })
    })
}

/**
 * 微信的请求和响应拦截
 * 
 */

const app2 = getApp();

const request2 = (method, url, data) => {
    return new Promise((resolve, reject) => {
        wx.request({
            success(res) {
                if (res.statusCode === 200) {
                    if (res?.data?.code === "SUCCESS") {
                        resolve(res.data)
                    } else {
                        formatError(res)
                        reject(res.data)
                    }
                } else {
                    reject(res.data)
                }
            },
            fail(err) {
                wx.showToast({
                    title: err || '网络异常，请稍后再试',
                    mask: true,
                    icon: 'error',
                    duration: 3000
                })
            }
        })
    })
}
