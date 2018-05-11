/**
 * @lzq
 * 页面head的配置
 * 可以包含图标 样式 meta link script title
 */
export let headConfig = {
    title: function () {
        return {
            inner: this.__WEVUE_PATH
        }
    },
    meta: function () {
        return []
    },
    link: function () {
        return []
    },
    script: function () {
        return []
    }
}