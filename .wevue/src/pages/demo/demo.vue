<template>
    <div class="wevue-page-container" data-wevue-type="__page_instance__">
        <template>
    
    <div ref="test" id="main" style="width: 600px;height:400px; margin: auto"></div>
    <div ref="tests" style="width: 600px;height:400px;margin: auto"></div>
    <div ref="testpic" style="width: 600px;height:400px;margin: auto"></div>
    <div class="title" style="text-align:center;">
        <p>
            柱状图
        </p>
    </div>
    <div ref="nyf" style="width: 600px;height:400px;margin: auto"></div>
    <div class="title" style="text-align:center;">
        <p>
            雷达图
        </p>
    </div>
    <div ref="testes" style="width: 600px;height:400px;margin: auto"></div>
    <div class="title" style="text-align:center;">
        <p>
            雷达图
        </p>
    </div>
</template>
    </div>
</template>

<script>
    import {defaultPageMixins} from 'wevue-tools/config/default-page.mixins.js'
    let pagePath = __dirname+"/demo"
    let pageIndex = pagePath.replace(/^src\//,'').replace(/^pages/, '').replace(/\..*/,'')
    pageIndex = pageIndex.trim()
    __WEVUE_GI.PAGE_TMP_INDEX = pageIndex
    require('./demo.js')
    let componentsList = {}
    let mixinsList = {}
    let directivesList = {}
    let pageConfig = require('./demo.json')
    export default {
        mixins:[defaultPageMixins({
            componentsList,
            mixinsList,
            directivesList,
            pageConfig,
            index:pageIndex
        })]
    }
</script>
<style scoped lang="less">
    .wevue-page-container{
        height:100%;
        position:relative;
    }
    
</style>