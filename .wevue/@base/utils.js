module.exports = {
    /**
     * @lzq
     * 用于需要同步加载在之前的全局js或者全局css
     * 比如：wx jssdk
     * @adv
     * *建议使用本地资源，然后import使用，此方法只是一种不建议的方案
     */
    getAssetsList: function (opt) {

        var jsList = opt.jsList || []
        var cssList = opt.cssList || []
        var ret = []
        var i = 0;
        for (i = 0; i < cssList.length; i++) {
            ret.push(cssList[i])
        }
        for (i = 0; i < jsList.length; i++) {
            ret.push(jsList[i])
        }
        ret.push({
            path: (process.env.DIST_PATH||'/') + './wevue-runtime.main.js',
            type: 'js'
        })
        return ret
    },
    __getWevueEnv__: function (env) {
        env = env || {}
        var target = env.WEVUE_ENV || ''
        target = target.replace('[', '').replace(']', '')

        target = target.split(',')
        var tmpKey = ''
        var tmpValue = ''
        var ret = {}
        var i = 0
        while (i < target.length) {
            if (target[i].match('=')) {
                tmpKey = target[i].split('=')[0]
                tmpValue = target[i].split('=')[1]
                ret[tmpKey] = tmpValue
            }
            i++
        }
        return ret
    }
}