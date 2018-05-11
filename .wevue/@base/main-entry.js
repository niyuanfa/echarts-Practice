import Vue from 'vue'
import VueRouter from 'vue-router'
import VueHead from 'vue-head'
let path = require('path')
import {tools,wx,Page,App,lifecycle} from 'wevue-tools'
import {globalVueInit} from 'wevue-tools/global-vue-init'

import * as vueConfig from 'vueroot/vue.conf.js'
let beforeVueInit = vueConfig.before||(new Function())
let afterVueInit = vueConfig.after || (new Function())

let projectRouterMode = tools.advanceAppConfig().mode

/**
 * @lzq 
 * 配置一些必须的全局变量
 */
window.shoots = wx;
if (!window.wx) {
    window.wx = wx;
}
window.Page = Page;
window.App = App;
window.getApp = new Function();
window.getPage = new Function();
window.__WEVUE_GI = new Object()
__WEVUE_GI.PVAPP = new Object()//App实例
__WEVUE_GI.PVCI = new Object()//页面组件实例
__WEVUE_GI.PVMAP = new Object()//页面ID <--> NAME 匹配
__WEVUE_GI.PageXCXOpt = new Object()
__WEVUE_GI.AppXCXOpt = new Object()
__WEVUE_GI.PagePath = '/'
__WEVUE_GI.getProgressbar = new Function()

/**
 * 产品环境关闭dev工具
 */
Vue.config.devtools = process.env.NODE_ENV==='production' ? false :true

Vue.use(VueHead,{
    separator: '',
    complement: ''
})
Vue.use(VueRouter)
/**
 * @lzq  添加页面 router
 */
var routes = tools.getAppRouters()
let router = new VueRouter({
    mode: projectRouterMode || 'hash',
    
    routes:routes
})
router.afterEach((to, from) => {
    // to and from are both route objects
    lifecycle.afterRouteChange(to,from)
})

let AppView = require('../@layout/App.vue')


globalVueInit(Vue)
/**
 * @lzq
 * 给Vue new之前做最后的补充
 */
let initOptions = {
    router,
    render: h => h(AppView.default?AppView.default:AppView)
}
beforeVueInit(Vue,initOptions)
new Vue(initOptions).$mount("#__wevue_app")

/**
 * @lzq
 * 给Vue new之后做最后的补充
 */
afterVueInit(Vue,initOptions)