<template>
    <div class="wevue-page-container" data-wevue-type="__page_instance__">
    demo page
    </div>
</template>

<script>
    import {defaultPageMixins} from 'wevue-tools/config/default-page.mixins.js'
    require('./demo.js')
    let componentsList = {}
    let mixinsList = {}
    let directivesList = {}
    let pageConfig = {}
    export default {
        mixins:[defaultPageMixins({
            componentsList,
            mixinsList,
            directivesList,
            pageConfig
        })]
    }
</script>
<style scoped lang="less">
    .wevue-page-container{
        height:100%;
        position:relative;
    }
</style>