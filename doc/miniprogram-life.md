微信小程序的APP生命周期

```js
App({
    // 1 应用 第一次启用的时候触发
    onLaunch() {
        // 在应用第一次启动的时候 获取用户信息
    }
    
    // 2 应用 被用户看到的时候触发
    onShow() {
        // 常用于小程序界面之间的切换
        // 对应用的数据或者页面的效果进行重置
    }

    // 3 应用 被隐藏的时候触发
    onHide() {
        // 暂停或者清楚定时器
    }

    // 4 应用 代码发生报错的时候  执行
    onError() {
        // 在应用发生代码报错的时候，收集用户的错误信息，通过异步请求，将错误信息发送到后台去
    }

    // 5 页面找不到的时候就会触发
    // 应用第一次启动的时候，如果找不到第一个入口页面，才会触发
    onPageNotFound() {
        // 如果页面不存在了  通过js的方式来重新跳转页面  重新跳转到第二个首页
        // 不能跳转到tabbar页面  导航组件类似
        wx.navigateTo({
            url: "/pages/demo02/index"
        })
    }
})
```

微信小程序的page生命周期
```js
Page({
    data: {
        
    },
    onLoad: function(options) {
        // onload发送异步请求来初始化页面数据
    },
    onShow: function() {
        // 页面显示加载
    },
    onReady: function() {
        // 页面初次渲染完成
    },
    onHide: function() {
        // 页面隐藏时加载  一个页面跳转到另外一个页面也会触发onHide事件
    },
    onUnload: function() {
        // 页面卸载  也可以通过超链接   关闭当前页面就会触发onUnload事件
        // <navigator url="/pages/demo01/demo01" open-typr-redirect>demo01</navigator>
        
        // 关闭当前页面就代表着卸载页面
    },
    onPullDownRefresh: function() {
        // 监听用户下拉事件  "enablePullDownRefresh":true
        //  页面效果的重新加载
    },
    onReachBotton: function() {
        // 监听用户上拉触底事件   【需要让页面出现上下的滚动才行】
        // 常用于  上拉加载下一页操作
    },
    onShareAppMessage: function() {
        // 用户点击右上角转发
    },
    onPageScroll: function() {
        // 页面滚动就触发
    },
    onResize: function() {
        // 页面尺寸发生变化的时候触发   
        // 常指 手机横屏竖屏的时候  触发    
        //  app.json中添加   "pageOrientation":"auto"
    },
    onTabItemTap: function() {
        // 1. 当前页面必须为tabbar页面
        // 2. 点击的是自己的tab  item的时候才触发
    }
})
```
