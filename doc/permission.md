`Cookie` 鉴权: 
* withCredentials
* Set-Cookie: 表示要设置Cookie
* HttpOnly: 设置浏览器禁止通过JavaScript访问Cookie
* Secure: 表示当前Cookie只能用https协议发送给服务端
* SameSite: 跨域是否可以带上cookie
* request报文: 带上cookie去请求，服务器用来验证身份
* Cookie不好处理跨域
* 只能在浏览器里
* 服务端的响应带上set-cookie字段，之后发送请求时，会自动带上cookie

`Token` 鉴权:
* `Token` 可以存在客户端本地
* 不限制客户端类型
* 服务端的响应会返回 `token`
* 发送请求时，将 `token` 放到请求头上
* 配置 `Authorization` 请求头
