/**
 * 这是对于微信五种路由跳转的方式进行的封装
 * 
 * routerFiler是负责路由跳转前的公共操作
 * 
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
 * 
 */

const app1 = getApp()

const request1 = (method, url, data) => {
    const header = {

    }

    return new Promise((resolve, reject) => {
        wx.request({
            method: method,
            url: app.globalData.host + url,
            data: data,
            header: header,
            success(res) {


                resolve(res.data);
            },
            fail(err) {
                wx.showToast({
                    title: '网络异常，请稍后再试',
                    mask: true,
                    icon: 'none',
                    duration: 3000
                })
            }
        })
    })
}

/**
 * 微信的请求和响应拦截
 * 
 * 
 */

const app2 = getApp();

const request2 = (method, url, data) => {

    return new Promise((resolve, reject) => {
        wx.request({

            success(res) {
                if(res.statusCode === 200) {
                    if(res.data && res.data.code === "SUCCESS") {
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
                    title: '网络异常，请稍后再试',
                    mask: true,
                    icon: 'none',
                    duration: 3000
                })
            }
        })
    })
}
