<template>
    <div class="wevue-root-container">
        <app-view ref="pv_backend">
            <page-progress-bar ref="__wevue_progressbar"></page-progress-bar>
            <router-view>
            </router-view>
        </app-view>
    </div>
</template>
<script>
    import AppView from 'vueroot/app.vue'
    import pageProgressBar from 'layouts/page-progress-bar.vue'
    export default {
        components:{
            AppView,pageProgressBar
        }
    }
</script>
<style lang="less" scoped>
    .wevue-root-container{
        height:100%;
        position:relative;
    }
</style>
