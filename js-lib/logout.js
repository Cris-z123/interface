// 处理注销情况
function logout () {
    localStorage.removeItem('token');
    this.$router.push('/');
}
