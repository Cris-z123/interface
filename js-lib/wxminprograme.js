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
 * 对于接口请求进行封装
 * 
 * 
 */