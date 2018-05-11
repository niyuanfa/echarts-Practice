<template lang="html">
    <div class="wevue-appview-container">
        <slot>
        </slot>
    </div>
</template>

<script>
    require('./global.css')
    import {defaultAppMixins} from 'wevue-tools/config/default-app.mixins.js'
    export default {
        mixins:[defaultAppMixins()]
    }
</script>

<style lang="less" scoped>
    .wevue-appview-container{
        height:100%;
        position:relative;
    }
</style>