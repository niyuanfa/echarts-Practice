import config from '../../json'

let vueExtendRegex = /^\$\$/

function getComputedList() {
    let ret = {}
    if (__WEVUE_GI.AppXCXOpt) {
        if (__WEVUE_GI.AppXCXOpt.data) {
            ret = __WEVUE_GI.AppXCXOpt.data
        }
        for(let i in __WEVUE_GI.AppXCXOpt){
            if((!i.match(vueExtendRegex))&&typeof __WEVUE_GI.AppXCXOpt[i] !=='function'&&i!=='data'){
                ret[i] = new Object()
                ret[i] = __WEVUE_GI.AppXCXOpt[i]
            }
        }
    }
    return ret
}


function getMethodsList() {
    let reservedAppFunctionNameList = config.reservedAppFunctionName||[]
    let ret = {}
    if (__WEVUE_GI.AppXCXOpt) {
        for(let i in __WEVUE_GI.AppXCXOpt){
            if( (!i.match(vueExtendRegex))&& typeof __WEVUE_GI.AppXCXOpt[i] ==='function'&&reservedAppFunctionNameList.indexOf(i)===-1){
                ret[i] = new Function()
                ret[i] = __WEVUE_GI.AppXCXOpt[i]
            }
        }
    }
    return ret
}

/**
 * @lzq
 * 获取vue配置拓展
 */
function getVueExtendList(){
    let reservedPageVueExtendNameList = config.reservedPageVueExtendName||[]
    let ret = {}
    if (__WEVUE_GI.AppXCXOpt) {
        for(let i in __WEVUE_GI.AppXCXOpt){
            if((!!i.match(vueExtendRegex))&&reservedPageVueExtendNameList.indexOf(i)===-1){
                ret[i.replace(vueExtendRegex,'')] = new Object()
                ret[i.replace(vueExtendRegex,'')] = __WEVUE_GI.AppXCXOpt[i]
            }
        }
    }
    return ret
}

/**
 * @lzq
 * computed and methods list
 */
export function appFilter() {
    let computedList = getComputedList()
    let methodsList = getMethodsList()
    let vueExtendList = getVueExtendList()
    let ret = {
        data: computedList,
        methods: methodsList,
        vueAttr:vueExtendList
    }
    return ret
}
