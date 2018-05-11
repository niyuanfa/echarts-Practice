/**
 * @lzq
 * privatefunctions
 * 
 */


/**
 * @lzq
 * app.json  {}
 */
function globalConfig() {
    try {
        let globalAppJson = require('vueroot/app.json') || {}
        return globalAppJson.default ? globalAppJson.default : globalAppJson
    } catch (e) {
        return {}
    }
}

/**
 * @lzq
 * app.json  ->  pages:[]
 */
function getPageList() {
    let ret = []
    ret = globalConfig().pages || []
    return ret
}




/**
 * 
 * @lzq exports
 */

/**
 * @lzq
 * app.json  ->  advance:{}
 */
export function advanceAppConfig() {
    let ret = {}
    ret = globalConfig().advance || {}
    return ret
}

function convertConfig(config={}) {
    let pagePath = config.path.replace(/^pages/, '')
    pagePath = pagePath.trim()
    let route = config.rule
    let tmpI = ((pagePath) => {
        return () => import("vueroot/pages" + pagePath + ".vue")
    })(pagePath)
    let tmpIndex = pagePath

    __WEVUE_GI.PVMAP[tmpIndex] = tmpIndex
    let pageAliasName = config.name
    if (pageAliasName) {
        __WEVUE_GI.PVMAP[pageAliasName] = tmpIndex
    } 

    return {
        path: route,
        component: tmpI,
        index: tmpIndex,
        name: pageAliasName || tmpIndex
    }
}
function handleAdvanceRouteConfigList(routerItem={}) {
    let vueRouterConfig = convertConfig(routerItem)
    let pageRouterItem = {
        path: vueRouterConfig.path,
        name: vueRouterConfig.name,
        component: vueRouterConfig.component
    }
    routerItem.path = pageRouterItem.path
    routerItem.component = pageRouterItem.component
    routerItem.name = pageRouterItem.name
    if (routerItem.children && routerItem.children.length){
        routerItem.children.forEach(item => {
            item = handleAdvanceRouteConfigList(item)
        })
    }
    return routerItem
}





/**
 * @lzq
 * routers
 */

export function getAppRouters() {
    let ret = []

    const appPages = getPageList() || []
    let pageRouterItem;
    let pagePath = ''
    let defaultPage = ''

    for (let i = 0; i < appPages.length; i++) {
        if (typeof appPages[i] === "object"){
            let advanceRouteItem = handleAdvanceRouteConfigList(appPages[i])
            /**
             * @lzq
             * 默认打开第一个页面
             */
            if (i === 0) {
                defaultPage = advanceRouteItem.path
                ret.push({
                    path: '/',
                    redirect: defaultPage
                })
            }
            ret.push(advanceRouteItem)
        }else{
            pagePath = appPages[i].replace(/^pages/, '')
            pagePath = pagePath.trim()

            let tmpI = ((pagePath) => {
                return () => import("vueroot/pages" + pagePath + ".vue")
            })(pagePath)
            
            let tmpIndex = pagePath
            let pageAliasName = tmpIndex
            if (pageAliasName) {
                __WEVUE_GI.PVMAP[pageAliasName] = tmpIndex
            } 
            pageRouterItem = {
                path: pagePath,
                name: tmpIndex,
                component: tmpI
            }
            /**
             * @lzq
             * 默认打开第一个页面
             */
            if (i === 0) {
                defaultPage = pagePath
                ret.push({
                    path: '/',
                    redirect: defaultPage
                })
            }
            ret.push(pageRouterItem)
            
        }
        
    }
    ret.push({
        path: '*', redirect: advanceAppConfig()["404Page"] || defaultPage
    })
    return ret
}

export function _clone(target) {
    return JSON.parse(JSON.stringify(target))
}