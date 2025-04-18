const app = getApp();

// 请求方式（定义完了又好像觉得没啥用，放着吧）
const GET = "GET";
const POST = "POST";
const PUT = "PUT";
const FORM = "FORM";
const DELETE = "DELETE";

// 系统域名
const baseURL = "";

/**
 * 用户请求方法，使用promise实现
 * @param {*} method 请求方式
 * @param {*} url 请求连接
 * @param {*} data 请求数据
 */
const request = (method, url, data) => {
    return new Promise(function (resolve, reject) {
        let header = {
            "content-type": "application/json",
            // 增加其他请求头
        };
        var requestData = data;
        if (method == "POST") {
            requestData = JSON.stringify(data);
        }
        // 展示loading效果
        wx.showLoading("加载中……");
        wx.request({
            url: baseURL + url,
            method: method,
            data: requestData,
            header: header,
            success(result) {
                //请求成功
                //判断状态码---errCode状态与后端统一约定
                if (result.data.code > 0) {
                    // 返回值正常
                    resolve(result);
                    // 关闭loading效果
                    wx.hideLoading();
                }
                else if (result.data.code === 200) {
                    // 系统错误
                    wx.showToast(result.data.msg); return;
                }
                else if (result.data.code === 201) {
                    // 登录失效, 自定义处理
                    app.userLogin();
                }
                else {
                    // 其他异常
                    resolve(result);
                }
            },
            fail(result) {//请求失败
                wx.hideLoading();
                reject(result);
            },
            complete: () => {
                setTimeout(() => {
                    // 关闭loading效果
                    wx.hideLoading();
                }, 100);
            },
        });
    });
};
