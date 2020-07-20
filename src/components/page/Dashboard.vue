<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="10">
                <el-card shadow="hover" class="mgb20" style="height:252px;">
                    <div class="user-info">
                        <img src="../../assets/img/upload.jpg" class="user-avator" alt />
                        <div class="user-info-cont">
                            <div class="user-info-name">{{name}}</div>
                            <div>{{role}}</div>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="14">
                <el-row :gutter="20" class="mgb20">
                    <el-col>
                        <el-card shadow="hover">
                            <div ref="chart" style="width:100%;height:376px"></div>
<!--                            <div id="echart1" ref="echart1" class="echart"></div>-->
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row :gutter="20">

        </el-row>
    </div>
</template>

<script>
    import Schart from 'vue-schart';
    import bus from '../common/bus';

    export default {
        name: 'dashboard',
        data() {
            return {
                name: localStorage.getItem('show_name'),
                option_mvo : {
                    title: {
                        text: 'Order Status',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['Pending Payment', 'Pending Delivery', 'Pending Receipt', 'Completed','Returning']
                    },
                    series: [
                        {
                            name: 'Order Status',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            data: [
                                {value: 335, name: 'Pending Payment'},
                                {value: 310, name: 'Pending Delivery'},
                                {value: 234, name: 'Pending Receipt'},
                                {value: 1353, name: 'Completed'},
                                {value: 15, name: 'Returning'}

                            ],
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]},
                option_gvo : {
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b}: {c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 10,
                        data: ['Under Application', 'Approved', 'Rejected']
                    },
                    series: [
                        {
                            name: 'Transaction Status',
                            type: 'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                label: {
                                    show: true,
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            },
                            labelLine: {
                                show: false
                            },
                            data: [
                                {value: 121, name: 'Under Application'},
                                {value: 200, name: 'Approved'},
                                {value: 20, name: 'Rejected'}
                            ]
                        }
                    ]
                }
            };
        },
        components: {
        },
        computed: {
            role() {
                const role_id = localStorage.getItem("role_id");
                if(role_id==1){
                    return 'Admin';
                }else if(role_id==2){
                    return 'Manufacturer';
                }else{
                    return 'Dropshipper'
                }
                //return this.name === 'admin' ? '超级管理员' : '普通用户';
            }
        },
        mounted() {
                this.getEchartData()
        },
        // created() {
        //     this.handleListener();
        //     this.changeDate();
        // },
        // activated() {
        //     this.handleListener();
        // },
        // deactivated() {
        //     window.removeEventListener('resize', this.renderChart);
        //     bus.$off('collapse', this.handleBus);
        // },
        methods: {
            changeDate() {
                const now = new Date().getTime();
                this.data.forEach((item, index) => {
                    const date = new Date(now - (6 - index) * 86400000);
                    item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
                });
            },
            getEchartData() {
                const chart = this.$refs.chart
                if (chart) {
                    const myChart = this.$echarts.init(chart)
                    const option = localStorage.getItem("role_id")!=='1'?this.option_mvo:this.option_gvo
                    myChart.setOption(option)
                    window.addEventListener("resize", function() {
                        myChart.resize()
                    })
                }
                this.$on('hook:destroyed',()=>{
                    window.removeEventListener("resize", function() {
                        myChart.resize();
                    });
                })
            }
            // handleListener() {
            //     bus.$on('collapse', this.handleBus);
            //     // 调用renderChart方法对图表进行重新渲染
            //     window.addEventListener('resize', this.renderChart);
            // },
            // handleBus(msg) {
            //     setTimeout(() => {
            //         this.renderChart();
            //     }, 200);
            // },
            // renderChart() {
            //     this.$refs.bar.renderChart();
            //     this.$refs.line.renderChart();
            // }
        }
    };
</script>


<style scoped>
    .el-row {
        margin-bottom: 20px;
    }

    .grid-content {
        display: flex;
        align-items: center;
        height: 100px;
    }

    .grid-cont-right {
        flex: 1;
        text-align: center;
        font-size: 14px;
        color: #999;
    }

    .grid-num {
        font-size: 30px;
        font-weight: bold;
    }

    .grid-con-icon {
        font-size: 50px;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #fff;
    }

    .grid-con-1 .grid-con-icon {
        background: rgb(45, 140, 240);
    }

    .grid-con-1 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-2 .grid-con-icon {
        background: rgb(100, 213, 114);
    }

    .grid-con-2 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-3 .grid-con-icon {
        background: rgb(242, 94, 67);
    }

    .grid-con-3 .grid-num {
        color: rgb(242, 94, 67);
    }

    .user-info {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 2px solid #ccc;
        margin-bottom: 20px;
    }

    .user-avator {
        width: 120px;
        height: 120px;
        border-radius: 50%;
    }

    .user-info-cont {
        padding-left: 50px;
        flex: 1;
        font-size: 14px;
        color: #999;
    }

    .user-info-cont div:first-child {
        font-size: 30px;
        color: #222;
    }

    .user-info-list {
        font-size: 14px;
        color: #999;
        line-height: 25px;
    }

    .user-info-list span {
        margin-left: 70px;
    }

    .mgb20 {
        margin-bottom: 20px;
    }

    .todo-item {
        font-size: 14px;
    }

    .todo-item-del {
        text-decoration: line-through;
        color: #999;
    }

    .schart {
        width: 100%;
        height: 300px;
    }
</style>
