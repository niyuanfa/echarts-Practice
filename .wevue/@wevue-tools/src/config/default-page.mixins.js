import {
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
    beforeRouteLeave
} from '../lifecycle'
import {
    pageFilter
} from '../filters/page-data-methods-filter.js'

/**
 * 
 * @param {String} name 
 * @param {Object} ctx 
 * @author kevin
 * 获取页面实例 可传参
 */
function getPageInstence(name, ctx) {
    if (name) {
        let mapName = __WEVUE_GI.PVMAP[name] || ''
        if (mapName) {
            return __WEVUE_GI.PVCI[mapName] || null
        }
        return null
    }
    return ctx
}


export function defaultPageMixins(arg = {
    componentsList: {},
    mixinsList: {},
    directivesList: {},
    pageConfig: {},
    index:null
}) {
    /**
     * @lzq
     * 局部组件、混合、指令的添加
     * 插件只能是全局的
     */
    let localComponents = {}
    let localMixins = {}
    let localDirectives = {}
    let pageConfig = arg.pageConfig || {} //页面json配置文件

    localComponents = arg.componentsList || {}
    localMixins = arg.mixinsList || {}
    let localMixinsList = []
    for (let i in localMixins) {
        localMixinsList.push(localMixins[i])
    }

    localDirectives = arg.directivesList || {}




    let filterRet = {}
    filterRet = pageFilter(pageConfig)
    return {
        methods: {
            setData(newVal = {}) {
                Object.assign(this, newVal)
            },
            $getAppInstence() {
                return getApp()
            },
            ...filterRet.methods
        },
        computed: {
            $requestUrl() {
                return __GLOBALCONFIG.server
            },
            $env(){
                return __GLOBALCONFIG.env||{}
            },
            data() {
                return this
            }
        },
        data() {
            return {
                ...filterRet.data
            }
        },
        mixins: localMixinsList,
        components: localComponents,
        directives: localDirectives,
        beforeCreate() {
            this.$$pageIndex = arg.index
        },
        beforeRouteEnter(to, from, next) {
            // 在渲染该组件的对应路由被 confirm 前调用
            // 不！能！获取组件实例 `this`
            // 因为当钩子执行前，组件实例还没被创建
            beforeRouteEnter(to, from, next)
        },
        beforeRouteUpdate(to, from, next) {
            // 在当前路由改变，但是该组件被复用时调用
            // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
            // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
            // 可以访问组件实例 `this`
            beforeRouteUpdate(to, from, next)
        },
        beforeRouteLeave(to, from, next) {
            // 导航离开该组件的对应路由时调用
            // 可以访问组件实例 `this`
            next(beforeRouteLeave(to, from, next))
        },
        created() {
            __WEVUE_GI.PVCI[this.$$pageIndex] = __WEVUE_GI.PVCI[this.$$pageIndex] || {}
            __WEVUE_GI.PVCI[this.$$pageIndex] = this
            getPage = (pageName) => {
                return getPageInstence(pageName, this)
            }
            this.__WEVUE_PATH = this.$route.path
            pageOnLoad.apply(this, [{
                pageName: this.__WEVUE_PATH
            }, this.$route.query])
            pageOnShow.apply(this, [{
                pageName: this.__WEVUE_PATH
            }])
        },
        beforeMount() {

        },
        mounted() {
            __WEVUE_GI.PVCI[this.$$pageIndex] = __WEVUE_GI.PVCI[this.$$pageIndex] || {}
            __WEVUE_GI.PVCI[this.$$pageIndex] = this
            getPage = (pageName) => {
                return getPageInstence(pageName, this)
            }
            pageOnReady.apply(this, [])

        },
        beforeUpdate() {

        },
        updated() {

        },
        beforeDestroy() {
            pageOnHide.apply(this, [])
        },
        destroyed() {
            pageOnUnload.apply(this, [])
        },
        ...filterRet.vueAttr
    }
}