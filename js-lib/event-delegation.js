//事件委托1
ul.addEventListener('click', function(e){
    if(e.target.tagName.toLowerCase() === 'li') {
        fn()
    }
})

// 事件委托2
function delegation(element, eventType, fn) {
    element.addEventListener(eventType, e => {
        let el = e.target
        while(!el.matches(selector)) {
            if(element === el) {
                el = null 
                break
            }
            el = el.parentNode
        }
        el &&　fn.call(el, e, el)
    })
    return element
}