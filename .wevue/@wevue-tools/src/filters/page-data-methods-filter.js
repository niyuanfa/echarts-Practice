import config from '../../json'

let vueExtendRegex = /^\$\$/

function getComputedList(config) {
    let ret = {}
    if (__WEVUE_GI.PageXCXOpt[__WEVUE_GI.PAGE_TMP_INDEX]) {
        if (__WEVUE_GI.PageXCXOpt[__WEVUE_GI.PAGE_TMP_INDEX].data) {
            ret = __WEVUE_GI.PageXCXOpt[__WEVUE_GI.PAGE_TMP_INDEX].data
        }
        for(let i in __WEVUE_GI.PageXCXOpt[__WEVUE_GI.PAGE_TMP_INDEX]){
            if((!i.match(vueExtendRegex))&&typeof __WEVUE_GI.PageXCXOpt[__WEVUE_GI.PAGE_TMP_INDEX][i] !=='function'&&i!=='data'){
                ret[i] = new Object()
                ret[i] = __WEVUE_GI.PageXCXOpt[__WEVUE_GI.PAGE_TMP_INDEX][i]
            }
        }
    }
    return ret
}


function getMethodsList(config) {
    let reservedPageFunctionNameList = config.reservedPageFunctionName||[]
    let ret = {}
    if (__WEVUE_GI.PageXCXOpt) {
        for(let i in __WEVUE_GI.PageXCXOpt[__WEVUE_GI.PAGE_TMP_INDEX]){
            if((!i.match(vueExtendRegex))&&typeof __WEVUE_GI.PageXCXOpt[__WEVUE_GI.PAGE_TMP_INDEX][i] ==='function'&&reservedPageFunctionNameList.indexOf(i)===-1){
                ret[i] = new Function()
                ret[i] = __WEVUE_GI.PageXCXOpt[__WEVUE_GI.PAGE_TMP_INDEX][i]
            }
        }
    }
    return ret
}

function setWxPageConfig(uConfig,config={}){
    let ret = uConfig
    if(config.navigationBarTitleText){
        if(uConfig['head']){
            if(uConfig['head'].title&&uConfig['head'].title.inner){

            }else{
                uConfig['head'].title = {
                    inner:config.navigationBarTitleText
                }
            }
        }else{
            uConfig['head'] = new Object()
            uConfig['head'].title = {
                inner:config.navigationBarTitleText
            }
        }
    }
    return ret
}

/**
 * @lzq
 * 获取vue配置拓展
 */
function getVueExtendList(config={}){
    let reservedPageVueExtendNameList = config.reservedPageVueExtendName||[]
    let ret = {}
    if (__WEVUE_GI.PageXCXOpt) {
        for(let i in __WEVUE_GI.PageXCXOpt[__WEVUE_GI.PAGE_TMP_INDEX]){
            if((!!i.match(vueExtendRegex))&&reservedPageVueExtendNameList.indexOf(i)===-1){
                ret[i.replace(vueExtendRegex,'')] = new Object()
                ret[i.replace(vueExtendRegex,'')] = __WEVUE_GI.PageXCXOpt[__WEVUE_GI.PAGE_TMP_INDEX][i]
            }
        }
    }
    /**
     * 设置页面配置信息title icon等
     */
    ret =  setWxPageConfig(ret,config)
    return ret
}
/**
 * @lzq
 * computed and methods list
 */
export function pageFilter(config) {
    let computedList = getComputedList(config)
    let methodsList = getMethodsList(config)
    let vueExtendList = getVueExtendList(config)
    let ret = {
        data: computedList,
        methods: methodsList,
        vueAttr:vueExtendList
    }

    return ret
}
