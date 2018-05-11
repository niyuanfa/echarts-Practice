
/**
 * @lzq
 * 原目录中的依赖 Inside
 */
let globalPluginsI = require('plugins/entry')
let globalComponentsI = require('components/entry')
let globalMixinsI = require('mixins/entry')
let globalDirectivesI = require('directives/entry')

/**
 * @lzq
 * 添加外层依赖支持 OutSide
 * app.cdep.js
 * app.pdep.js
 * app.mdep.js
 * app.ddep.js
 * 
 */

let globalPluginsO = require('vueroot/app.pdep.js')
let globalComponentsO = require('vueroot/app.cdep.js')
let globalMixinsO = require('vueroot/app.mdep.js')
let globalDirectivesO = require('vueroot/app.ddep.js')
let globalPlugins = {
    ...globalPluginsI,
    ...globalPluginsO
}


/**
 * @lzq
 * 总依赖
 */
let globalComponents = {
    ...globalComponentsI,
    ...globalComponentsO,
}
let globalMixins = {
    ...globalMixinsI,
    ...globalMixinsO
}
let globalDirectives = {
    ...globalDirectivesI,
    ...globalDirectivesO
}

export function globalVueInit ($vue){
    /**
     * @lzq
     * 初始化全局vue 插件 plugins
     */
    for(let i in globalPlugins){
        if(globalPlugins[i].__with_config&&globalPlugins[i].plugin&&globalPlugins[i].config){
            $vue.use(globalPlugins[i].plugin,globalPlugins[i].config)
        }else{
            $vue.use(globalPlugins[i])
        }
    }

    /**
     * @lzq
     * 初始化全局vue 组件 components
     */
    for(let i in globalComponents){
        $vue.component(i,globalComponents[i])
    }

    /**
     * @lzq
     * 初始化全局vue mixins
     */
    for(let i in globalMixins){
        $vue.mixin(globalMixins[i])
    }

    /**
     * @lzq
     * 初始化全局vue directives
     */
    for(let i in globalDirectives){
        $vue.directive(i,globalDirectives[i])
    }
}