import echarts from 'echarts'
Page({
    data: {},
    onLoad() {
        /**
         * 页面load的时候执行
         */
    },
    onShow() {
        /**
         * 页面每次的时候执行
         */
    },
    onReady() {
        /**
         * 页面Ready的时候执行，这时候DOM已经都ok了
         */
        console.log("ref===>", this.$refs.test)
        console.log('css===>', document.getElementById('main'))
        var myChart = echarts.init(this.$refs.test, 'light');
        var myCharts = echarts.init(this.$refs.tests, 'dark');
        var myChartes=echarts.init(this.$refs.nyf).setOption(
            option = {
                radar: {
                    indicator: [
                        { text: '质量' },
                        { text: '年龄' },
                        { text: '工龄' },
                        { text: '指标四' },
                        { text: '指标五' }
                    ],
                    center: ['50%', '50%'],
                    radius: '80%',
                    startAngle: 90,
                    splitNumber: 4,
                    shape: 'circle',
                    name: {
                        formatter:'【{value}】',
                        textStyle: {
                            color:'#72ACD1'
                        }
                    },
                    splitArea: {
                        areaStyle: {
                            color: ['#B8D3E4', '#96C5E3', '#7DB5DA', '#72ACD1']
                        }
                    },
                    axisTick: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.8)'
                        }
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: 'white'
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.4)'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.4)'
                        }
                    }
                }
            }
        )
        echarts.init(this.$refs.testpic).setOption({
            series: {
                type: 'pie',
                data: [{
                        name: 'A',
                        value: 1212
                    },
                    {
                        name: 'B',
                        value: 2323
                    },
                    {
                        name: 'C',
                        value: 1919
                    }
                ]
            }
        });
        console.log(echarts)
        // 指定图表的配置项和数据
        var option = {
            title: {
                text: '柱状图'
            },
            tooltip: {},
            legend: {
                data: ['销量']
            },
            xAxis: {
                data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        myChart.showLoading();
        myChart.on('click', function (params) {
            console.log(params);
        });
        myChart.on('mouseover',((params)=>{
            console.log(params)
        }))
        setTimeout(() => {
            myChart.hideLoading()
        }, 1000)
        myCharts.setOption(option);
        echarts.connect([myChart, myCharts]);
    },
    onHide() {
        /**
         * 页面Hide的时候执行
         */
    }
})