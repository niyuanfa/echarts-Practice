
import { appOnLaunch, appOnShow, appOnReady, appOnHide, appOnError } from '../lifecycle'
import { appFilter } from '../filters/app-data-methods-filter.js'

export function defaultAppMixins() {
    require('vueroot/app.js')

    let filterRet = {}
    filterRet = appFilter()
    return {
        methods: {
            getApp() {
                return this
            },
            setData(newVal = {}) {
                Object.assign(this, newVal)
            },
            $getProgressbarInstence() {
                return __WEVUE_GI.getProgressbar()
            },
            $getComponentInstence() {
                return getPage()
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
        beforeCreate() {

        },
        created() {
            getApp = this.getApp
            __WEVUE_GI.PVAPP = this
            appOnLaunch.apply(this)
        },
        beforeMount() {

        },
        mounted() {
            getApp = this.getApp
            __WEVUE_GI.PVAPP = this
            appOnShow.apply(this)
            appOnReady.apply(this)
        },
        beforeUpdate() {

        },
        updated() {

        },
        beforeDestroy() {
            appOnHide.apply(this)
        },
        destroyed() {
        },
        ...filterRet.vueAttr
    }
} 