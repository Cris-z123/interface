//普通搜索
methods1 = {
    submitQuery:function(){
        this.query = this.$refs.search.value.trim();
    },
    queryDate:function(list){
        if (this.query === '') {
            return list
        } 
        return list.filter(item => {
            if(item.name.indexOf(this.query) != -1){
                return item;
            }
        })
    }
}

//模糊搜索
methods2 = {
    onSubmit() {
        this.query = this.$refs.search.value.trim();
        this.query1 = this.$refs.search1.value.trim();
    },
    queryDate:function(list){
        if (this.query === '' && this.query1 === '') {
            return list
        } else if (this.query !== '' && this.query1 === '') {
            return list.filter(item => {
                if (item.name.indexOf(this.query) !== -1) {
                    return item
                }
            })
        } else if (this.query === '' && this.query1 !== '') {
            return list.filter(item => {
                if (item.mobile.indexOf(this.query1) !== -1) {
                    return item
                }
            })
        } else if (this.query !== '' && this.query1 !== '') {
            return list.filter(item => {
                if (item.name.indexOf(this.query) !== -1 && item.mobile.indexOf(this.query1) !== -1) {
                    return item
                }
            })
        }
    }
}