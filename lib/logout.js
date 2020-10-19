function logout () {
    localStorage.removeItem('token');
    this.$router.push('/');
}
