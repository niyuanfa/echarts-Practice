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
        var myChartes = echarts.init(this.$refs.nyf).setOption(
            option = {
                radar: {
                    indicator: [{
                            text: '质量'
                        },
                        {
                            text: '年龄'
                        },
                        {
                            text: '工龄'
                        },
                        {
                            text: '指标四'
                        },
                        {
                            text: '指标五'
                        }
                    ],
                    center: ['50%', '50%'],
                    radius: '80%',
                    startAngle: 90,
                    splitNumber: 4,
                    shape: 'circle',
                    name: {
                        formatter: '【{value}】',
                        textStyle: {
                            color: '#72ACD1'
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
        echarts.init(this.$refs.testes).setOption({
            // title: { text: 'Line Chart' },
            tooltip: {},
            toolbox: {
                feature: {
                    dataView: {},
                    saveAsImage: {
                        pixelRatio: 2
                    },
                    restore: {}
                }
            },
            xAxis: {},
            yAxis: {},
            series: [{
                type: 'line',
                smooth: true,
                data: [
                    [12, 50],
                    [24, 20],
                    [36, 36],
                    [48, 10],
                    [60, 10],
                    [72, 20]
                ]
            }]
        });
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
        myChart.on('mouseover', ((params) => {
            console.log(params)
        }))
        setTimeout(() => {
            myChart.hideLoading()
        }, 1000)
        myCharts.setOption(option);
        echarts.connect([myChart, myCharts]);
        var data = [];

        for (var i = 0; i <= 100; i++) {
            var theta = i / 100 * 360;
            var r = 5 * (1 + Math.sin(theta / 180 * Math.PI));
            data.push([r, theta]);
        }
        echarts.init(this.$refs.tes).setOption(
            option = {
                // title: {
                //     text: '极坐标双数值轴'
                // },
                legend: {
                    data: ['line']
                },
                polar: {},
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },
                angleAxis: {
                    type: 'value',
                    startAngle: 0
                },
                radiusAxis: {},
                series: [{
                    coordinateSystem: 'polar',
                    name: 'line',
                    type: 'line',
                    data: data
                }]
            }
        )
        echarts.init(this.$refs.te).setOption(
            option = {
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c}%"
                },
                toolbox: {
                    feature: {
                        dataView: {
                            readOnly: false
                        },
                        restore: {},
                        saveAsImage: {}
                    }
                },
                legend: {
                    data: ['展现', '点击', '访问', '咨询', '订单']
                },
                calculable: true,
                series: [{
                    name: '漏斗图',
                    type: 'funnel',
                    left: '10%',
                    top: 60,
                    //x2: 80,
                    bottom: 60,
                    width: '80%',
                    // height: {totalHeight} - y - y2,
                    min: 0,
                    max: 100,
                    minSize: '0%',
                    maxSize: '100%',
                    sort: 'descending',
                    gap: 2,
                    label: {
                        normal: {
                            show: true,
                            position: 'inside'
                        },
                        emphasis: {
                            textStyle: {
                                fontSize: 20
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            length: 10,
                            lineStyle: {
                                width: 1,
                                type: 'solid'
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            borderColor: '#fff',
                            borderWidth: 1
                        }
                    },
                    data: [{
                            value: 60,
                            name: '访问'
                        },
                        {
                            value: 40,
                            name: '咨询'
                        },
                        {
                            value: 20,
                            name: '订单'
                        },
                        {
                            value: 80,
                            name: '点击'
                        },
                        {
                            value: 100,
                            name: '展现'
                        }
                    ]
                }]
            }
        )
        var xAxisData = [];
        var data1 = [];
        var data2 = [];
        for (var i = 0; i < 100; i++) {
            xAxisData.push('类目' + i);
            data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
            data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
        }
        echarts.init(this.$refs.echar).setOption(
            option = {
                legend: {
                    data: ['bar', 'bar2'],
                    align: 'left'
                },
                toolbox: {
                    // y: 'bottom',
                    feature: {
                        magicType: {
                            type: ['stack', 'tiled']
                        },
                        dataView: {},
                        saveAsImage: {
                            pixelRatio: 2
                        }
                    }
                },
                tooltip: {},
                xAxis: {
                    data: xAxisData,
                    silent: false,
                    splitLine: {
                        show: false
                    }
                },
                yAxis: {},
                series: [{
                    name: 'bar',
                    type: 'bar',
                    data: data1,
                    animationDelay: function (idx) {
                        return idx * 10;
                    }
                }, {
                    name: 'bar2',
                    type: 'bar',
                    data: data2,
                    animationDelay: function (idx) {
                        return idx * 10 + 100;
                    }
                }],
                animationEasing: 'elasticOut',
                animationDelayUpdate: function (idx) {
                    return idx * 5;
                }
            }
        )
        echarts.init(this.$refs.chart1).setOption(
            option = {
                title: {
                    text: '雷达图'
                },
                tooltip: {},
                legend: {
                    top: 20,
                    itemWidth: 12,
                    itemHeight: 12,
                    data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）'],
                    textStyle: {
                        color: '#fff'
                    }
                },
                radar: {
                    radius: '60%',
                    splitNumber: 8,
                    axisLine: {
                        lineStyle: {
                            color: '#fff',
                            opacity: .2
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#fff',
                            opacity: .2
                        }
                    },
                    splitArea: {
                        areaStyle: {
                            color: 'rgba(127,95,132,.3)',
                            opacity: 1,
                            shadowBlur: 45,
                            shadowColor: 'rgba(0,0,0,.5)',
                            shadowOffsetX: 0,
                            shadowOffsetY: 15,
                        }
                    },
                    indicator: [{
                        name: 'Sales',
                        max: 6000
                    }, {
                        name: 'Administration',
                        max: 16000
                    }, {
                        name: 'Information Techology',
                        max: 30000
                    }, {
                        name: 'Customer Support',
                        max: 35000
                    }, {
                        name: 'Development',
                        max: 50000
                    }, {
                        name: 'Marketing',
                        max: 25000
                    }]
                },
                series: [{
                    name: '预算 vs 开销（Budget vs spending）',
                    type: 'radar',
                    symbolSize: 0,
                    areaStyle: {
                        normal: {
                            shadowBlur: 13,
                            shadowColor: 'rgba(0,0,0,.2)',
                            shadowOffsetX: 0,
                            shadowOffsetY: 10,
                            opacity: 1
                        }
                    },
                    data: [{
                        value: [5000, 7000, 12000, 11000, 15000, 14000],
                        name: '预算分配（Allocated Budget）',
                    }, {
                        value: [2500, 12000, 8000, 8500, 12000, 12000],
                        name: '实际开销（Actual Spending）',
                    }]
                }],
                color: ['#ef4b4c', '#b1eadb'],
                backgroundColor: {
                    type: 'radial',
                    x: 0.4,
                    y: 0.4,
                    r: 0.35,
                    colorStops: [{
                        offset: 0,
                        color: '#895355' // 0% 处的颜色
                    }, {
                        offset: .4,
                        color: '#593640' // 100% 处的颜色
                    }, {
                        offset: 1,
                        color: '#39273d' // 100% 处的颜色
                    }],
                    globalCoord: false // 缺省为 false
                }
            }
        )
        echarts.init(this.$refs.chart2).setOption(
            option = {
                title: {
                    //text: '2000-2016年中国汽车销量及增长率'
                },
                tooltip: {
                    trigger: 'axis'
                },
                toolbox: {
                    feature: {
                        dataView: {
                            show: true,
                            readOnly: false
                        },
                        restore: {
                            show: true
                        },
                        saveAsImage: {
                            show: true
                        }
                    }
                },
                grid: {
                    containLabel: true
                },
                legend: {
                    data: ['增速', '销量']
                },
                xAxis: [{
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    data: ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016']
                }],
                yAxis: [{
                    type: 'value',
                    name: '增速',
                    min: 0,
                    max: 50,
                    position: 'right',
                    axisLabel: {
                        formatter: '{value} %'
                    }
                }, {
                    type: 'value',
                    name: '销量',
                    min: 0,
                    max: 3000,
                    position: 'left'
                }],
                series: [{
                    name: '增速',
                    type: 'line',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                        }
                    },
                    lineStyle: {
                        normal: {
                            width: 3,
                            shadowColor: 'rgba(0,0,0,0.4)',
                            shadowBlur: 10,
                            shadowOffsetY: 10
                        }
                    },
                    data: [1, 13, 37, 35, 15, 13, 25, 21, 6, 45, 32, 2, 4, 13, 6, 4, 11]
                }, {
                    name: '销量',
                    type: 'bar',
                    yAxisIndex: 1,
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    data: [209, 236, 325, 439, 507, 576, 722, 879, 938, 1364, 1806, 1851, 1931, 2198, 2349, 2460, 2735]
                }]
            }
        )
        option = {
            title: {
                top: 30,
                left: 'center',
                text: '2016年某人每天的步数'
            },
            tooltip: {},
            visualMap: {
                min: 0,
                max: 10000,
                type: 'piecewise',
                orient: 'horizontal',
                left: 'center',
                top: 65,
                textStyle: {
                    color: '#000'
                }
            },
            calendar: {
                top: 120,
                left: 30,
                right: 30,
                cellSize: ['auto', 13],
                range: '2016',
                itemStyle: {
                    normal: {
                        borderWidth: 0.5
                    }
                },
                yearLabel: {
                    show: false
                }
            },
            series: {
                type: 'heatmap',
                coordinateSystem: 'calendar',
                data: getVirtulData(2016)
            }
        };
        echarts.init(this.$refs.chart3).setOption(option)

        function getVirtulData(year) {
            year = year || '2017';
            var date = +echarts.number.parseDate(year + '-01-01');
            var end = +echarts.number.parseDate((+year + 1) + '-01-01');
            var dayTime = 3600 * 24 * 1000;
            var data = [];
            for (var time = date; time < end; time += dayTime) {
                data.push([
                    echarts.format.formatTime('yyyy-MM-dd', time),
                    Math.floor(Math.random() * 10000)
                ]);
            }
            console.log('data====>', data)
            return data;
        }
        echarts.init(this.$refs.chart4).setOption(
            option = {
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['广告发放', '会展', '走出去', '走进来']
                },
                grid: {
                    left: '3%',
                    right: '40%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['2014', '2015', '2016', '2017'],
                    name: '年份'
                },
                yAxis: {
                    type: 'value',
                    name: '次数'
                },
                series: [{
                        name: '广告发放',
                        type: 'line',
                        stack: '总量',
                        data: [20, 32, 10, 34]
                    },
                    {
                        name: '会展',
                        type: 'line',
                        stack: '总量',
                        data: [20, 12, 11, 34]
                    },
                    {
                        name: '走出去',
                        type: 'line',
                        stack: '总量',
                        data: [15, 32, 20, 15]
                    },
                    {
                        name: '走进来',
                        type: 'line',
                        stack: '总量',
                        data: [32, 33, 30, 34]
                    }
                ]
            }
        )
    },

    onHide() {
        /**
         * 页面Hide的时候执行
         */
    }
})