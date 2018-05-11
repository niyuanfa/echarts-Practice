<template>
    <div class="wevue-progressbar-container" id="__wevue_progressbar" v-if="showProgress && hasProgress"  :style="{zIndex:'9999999999',position:'fixed',top:'0',left:'0',width:'100vw','height':'2px','borderRadius':'100px'}">
        <div class="progress-bar" :style="{'width':progress+'%','maxHeight':'100%',backgroundColor:progressBarBGColor,overflow:'hidden'}">.</div>
    </div>
</template>
<script>
    import {tools} from 'wevue-tools'
    let advanceAppConfig = tools.advanceAppConfig()
    let hasProgress = advanceAppConfig.showProgressBar||false
    let progressBarBGColor = advanceAppConfig.progressBarColor||"#4CAF50"
    export default {
        data(){
            return {
                progress:0,
                hasProgress:hasProgress||false,
                showProgress:true,
                tmpInterval:{},
                progressBarBGColor:progressBarBGColor
            }
        },
        methods:{
            pageReady(number=100){
                this.progress = number
            },
            createProgressAction(to=100){
                clearInterval(this.tmpInterval)
                let till = to
                let stepCount = to - this.progress
                let tmpNumber = this.progress
                let total = 50
                let interv = total / stepCount
                this.tmpInterval = setInterval(()=>{
                    tmpNumber ++ 
                    this.pageReady(tmpNumber)
                    if(tmpNumber> ( till - 1)||tmpNumber > 100){
                        clearInterval(this.tmpInterval)
                    }
                },interv)
            }
        },
        created(){
            __WEVUE_GI.getProgressbar = ()=> {return this}
        },
        mounted(){
            __WEVUE_GI.getProgressbar = ()=> {return this}
            this.createProgressAction(100)
        },
        watch:{
            progress(val){
                if(typeof val === 'number'){
                    if(val>=100||val<=0){
                        this.showProgress = false
                        this.progress = 0
                    }else{
                        this.showProgress = true
                    }
                }
            }
        }
    }
</script>
<style lang="less" scoped>
</style>