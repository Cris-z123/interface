// 前置的全局路由守卫，验证token
router.beforeEach((to, from, next) => {
    let token = localStorage.getItem('token');
    if(token) {
        if(to.path === '/' || to.path === '/login') {
            next('/xxx');
        }else {
            next();
        }
    }else {
        if(to.path === '/') {
            next();
        }else {
            next('/');
        }
    }
})

/* 
什么是导航守卫？
    通俗来说就是钩子函数，在对应的路由行为时触发，部分钩子可以阻止 /改变此次路由行为，所以称之为守卫
有哪些导航守卫（钩子函数）？
    前置守卫：
        1. 全局的前置守卫： beforeEach beforeResolve（同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用）
        2. 路由独享的守卫： beforeEnter
        3. 组件内的守卫： beforeRouterEnter、beforeRouterUpdate、beforeRouteLeave
    后置守卫：
        全局的后置守卫： afterEach
*/