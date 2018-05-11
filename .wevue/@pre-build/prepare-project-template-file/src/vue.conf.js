function before(Vue,options){
    /**
     * new Vue()之前的要做一些事情
     * @param Vue :Vue类
     * @param options :Vue实例创建参数
     */
}
function after(Vue,options){
    /**
     * new Vue()之后的要做一些事情
     * @param Vue :Vue类
     * @param options :Vue实例创建参数
     */
}

export{
    before,
    after
}