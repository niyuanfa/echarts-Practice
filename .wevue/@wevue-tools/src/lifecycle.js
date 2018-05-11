/**
 * @lzq
 * App lifecycle
 */


/**
 * @lzq
 * common functions
 */
function executeFunction(func, ctx = window, arg) {
    /**
     * 执行某个函数
     */
    if (func) {
        if ('function' == typeof func) {
            return func.apply(ctx, arg)
        } else {
            throw "need a function"
            return
        }
    }
    return
}


/**
 * @lzq
 * app.js onLaunch
 */
export function appOnLaunch() {
    executeFunction(__WEVUE_GI.AppXCXOpt.onLaunch, this, arguments)
}

/**
 * @lzq
 * app.js onShow
 */
export function appOnShow() {
    executeFunction(__WEVUE_GI.AppXCXOpt.onShow, this, arguments)

}

/**
 * @lzq
 * app.js onReady
 */
export function appOnReady() {
    executeFunction(__WEVUE_GI.AppXCXOpt.onReady, this, arguments)

}


/**
 * @lzq
 * app.js onHide
 */
export function appOnHide() {
    executeFunction(__WEVUE_GI.AppXCXOpt.onHide, this, arguments)
}

/**
 * @lzq
 * app.js onError
 */
export function appOnError() {
    executeFunction(__WEVUE_GI.AppXCXOpt.onError, this, arguments)
}




/**
 * @lzq
 * Page.js
 */


/**
 * @lzq
 * page onLoad
 * this -> page.vue ctx
 */
export function pageOnLoad(opt = {}) {
    executeFunction(__WEVUE_GI.PageXCXOpt[ this.$$pageIndex].onLoad, this, Array.prototype.splice.call(arguments, 1, arguments.length))
}

/**
 * @lzq
 * page onShow
 * this -> page.vue ctx
 */
export function pageOnShow(opt = {}) {
    executeFunction(__WEVUE_GI.PageXCXOpt[this.$$pageIndex].onShow, this, Array.prototype.splice.call(arguments, 1, arguments.length))

}

/**
 * @lzq
 * page onReady
 * this -> page.vue ctx
 */
export function pageOnReady(opt = {}) {
    executeFunction(__WEVUE_GI.PageXCXOpt[ this.$$pageIndex].onReady, this, Array.prototype.splice.call(arguments, 1, arguments.length))


}


/**
 * @lzq
 * page onHide
 * this -> page.vue ctx
 */
export function pageOnHide(opt = {}) {
    executeFunction(__WEVUE_GI.PageXCXOpt[ this.$$pageIndex].onHide, this, Array.prototype.splice.call(arguments, 1, arguments.length))

}

/**
 * @lzq
 * page onUnload
 * this -> page.vue ctx
 */
export function pageOnUnload(opt = {}) {
    executeFunction(__WEVUE_GI.PageXCXOpt[ this.$$pageIndex].onUnload, this, Array.prototype.splice.call(arguments, 1, arguments.length))

}


/**
 * @lzq
 * page onPullDownRefresh
 * this -> page.vue ctx
 */
export function pageOnPullDownRefresh(opt = {}) {
    executeFunction(__WEVUE_GI.PageXCXOpt[ this.$$pageIndex].onPullDownRefresh, this, Array.prototype.splice.call(arguments, 1, arguments.length))

}

/**
 * @lzq
 * page onReachBottom
 * this -> page.vue ctx
 */
export function pageOnReachBottom(opt = {}) {
    executeFunction(__WEVUE_GI.PageXCXOpt[ this.$$pageIndex].onReachBottom, this, Array.prototype.splice.call(arguments, 1, arguments.length))
}

/**
 * @lzq
 * page onShareAppMessage
 * this -> page.vue ctx
 */
export function pageOnShareAppMessage(opt = {}) {
    executeFunction(__WEVUE_GI.PageXCXOpt[this.$$pageIndex].onShareAppMessage, this, Array.prototype.splice.call(arguments, 1, arguments.length))
}





/**
 * @lzq 
 * 额外周期：路由变化之前执行 可以中断路由
 * @params:to 即将要访问的路由
 * @params：from 从哪个路由过来
 * return true|false | path
 */
export function beforeRouteEnter(to, from, next = new Function()) {
    let toPageIndex = __WEVUE_GI.PVMAP[to.name]||0
    let appHave = false
    let pageHave = false
    if (__WEVUE_GI.AppXCXOpt.beforeRouteEnter) {
        appHave = true
    } else {
        appHave = false
    }
    if (__WEVUE_GI.PageXCXOpt[toPageIndex] && __WEVUE_GI.PageXCXOpt[toPageIndex].beforeRouteEnter) {
        pageHave = true
    } else {
        pageHave = false
    }

    if (appHave && pageHave) {
        executeFunction(__WEVUE_GI.PageXCXOpt[toPageIndex].beforeRouteEnter, __WEVUE_GI.PageXCXOpt[toPageIndex], arguments)
    } else if (appHave && !pageHave) {
        executeFunction(__WEVUE_GI.AppXCXOpt.beforeRouteEnter, __WEVUE_GI.PVAPP || {}, arguments)
    } else if (!appHave && pageHave) {
        executeFunction(__WEVUE_GI.PageXCXOpt[toPageIndex].beforeRouteEnter, __WEVUE_GI.PageXCXOpt[toPageIndex], arguments)
    } else if (!appHave && !pageHave) {
        next(true)
    } else {
        next(true)
    }
}


/**
 * @lzq 
 * 额外周期：路由变化之前执行 可以中断路由
 * @params:to 即将要访问的路由
 * @params：from 从哪个路由过来
 * return true|false | path
 */
export function beforeRouteUpdate(to, from, next = new Function()) {
    let toPageIndex = __WEVUE_GI.PVMAP[to.name] || 0
    let appHave = false
    let pageHave = false
    if (__WEVUE_GI.AppXCXOpt.beforeRouteUpdate) {
        appHave = true
    } else {
        appHave = false
    }
    if (__WEVUE_GI.PageXCXOpt[toPageIndex] && __WEVUE_GI.PageXCXOpt[toPageIndex].beforeRouteUpdate) {
        pageHave = true
    } else {
        pageHave = false
    }
    if ((appHave && pageHave) || (!appHave && pageHave)) {
        executeFunction(__WEVUE_GI.PageXCXOpt[toPageIndex].beforeRouteUpdate, __WEVUE_GI.PageXCXOpt[toPageIndex], arguments)
    } else if (appHave && !pageHave) {
        executeFunction(__WEVUE_GI.AppXCXOpt.beforeRouteUpdate, __WEVUE_GI.PVAPP || {}, arguments)
    } else if (!appHave && !pageHave) {
        next(true)
    } else {
        next(true)
    }
}


/**
 * @author lzq 
 * 额外周期：路由离开之前执行 可以更改路由
 * @params:to 即将要访问的路由
 * @params：from 从哪个路由过来
 * return true|false | path
 */
export function beforeRouteLeave(to, from,next = new Function()) {
    let toPageIndex = __WEVUE_GI.PVMAP[to.name] || 0
    let appHave = false
    let pageHave = false
    if(__WEVUE_GI.AppXCXOpt.beforeRouteLeave){
        appHave = true
    }else{
        appHave = false
    }
    if(__WEVUE_GI.PageXCXOpt[toPageIndex]&&__WEVUE_GI.PageXCXOpt[toPageIndex].beforeRouteLeave){
        pageHave = true
    }else{
        pageHave = false
    }
    if ((appHave && pageHave) || (!appHave && pageHave)) {
        executeFunction(__WEVUE_GI.PageXCXOpt[toPageIndex].beforeRouteLeave, __WEVUE_GI.PageXCXOpt[toPageIndex], arguments)
    } else if (appHave && !pageHave) {
        executeFunction(__WEVUE_GI.AppXCXOpt.beforeRouteLeave, __WEVUE_GI.PVAPP || {}, arguments)
    }else if (!appHave && !pageHave) {
        next(true)
    } else {
        next(true)
    }
}



/**
 * @lzq 
 * 额外周期：路由变化之后执行 next无效
 * @params:to 即将要访问的路由
 * @params：from 从哪个路由过来
 */
export function afterRouteChange(to, from,next = new Function()) {
    let toPageIndex = __WEVUE_GI.PVMAP[to.name] || 0
    let appHave = false
    let pageHave = false
    if(__WEVUE_GI.AppXCXOpt.afterRouteChange){
        appHave = true
    }else{
        appHave = false
    }
    if(__WEVUE_GI.PageXCXOpt[toPageIndex]&&__WEVUE_GI.PageXCXOpt[toPageIndex].afterRouteChange){
        pageHave = true
    }else{
        pageHave = false
    }
    if (appHave && pageHave) {
        executeFunction(__WEVUE_GI.PageXCXOpt[toPageIndex].afterRouteChange, __WEVUE_GI.PageXCXOpt[toPageIndex], arguments)
    } else if ((appHave && !pageHave) || (!appHave && pageHave)) {
        executeFunction(__WEVUE_GI.AppXCXOpt.afterRouteChange, __WEVUE_GI.PVAPP || {}, arguments)
    } else if (!appHave && !pageHave) {
        next(true)
    } else {
        next(true)
    }


    /**
     * @author lzq
     * 临时解决方案：页面参数改变的话重新onShow？值得商议
     */
    if(__WEVUE_GI.PageXCXOpt[toPageIndex]){
        if(to.path===from.path){
            let matchedPages = to.matched || []
            /**
             * 匹配的路径都要执行onShow
             */
            matchedPages.forEach(item => {
                let toPageIndex = __WEVUE_GI.PVMAP[item.name]||0
                executeFunction(__WEVUE_GI.PageXCXOpt[toPageIndex].onShow, __WEVUE_GI.PVCI[toPageIndex] || {}, arguments)
            });
        }
    }
}

export const lifecycle = {
    appOnLaunch,
    appOnShow,
    appOnHide,
    appOnError,
    pageOnLoad,
    pageOnShow,
    pageOnReady,
    pageOnHide,
    pageOnUnload,
    pageOnPullDownRefresh,
    pageOnShareAppMessage,
    pageOnReachBottom,
    beforeRouteEnter,
    beforeRouteUpdate,
    beforeRouteLeave,
    afterRouteChange
}