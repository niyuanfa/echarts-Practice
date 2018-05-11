
/**
 * 
 * 接上 PAGE_TMP_INDEX的值，因为js是单线程的
 * 这地方有可能需要优化
 */
export function Page(opt){
    __WEVUE_GI.PageXCXOpt[__WEVUE_GI.PAGE_TMP_INDEX] = new Object()
    __WEVUE_GI.PageXCXOpt[__WEVUE_GI.PAGE_TMP_INDEX] = opt
}