<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div id="alarmTrend" class="chart"></div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <div id="pieFrom" class="chart"></div>
      </el-col>
      <el-col :span="12">
        <div id="pieTo" class="chart"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Util from '@/assets/js/util';
  let baseTooltip = {
    axisPointer: {
      lineStyle: {
        color: '#ddd'
      }
    },
    backgroundColor: '#fafafa',
    padding: [5, 10],
    textStyle: {
      color: '#999',
    },
    extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)'
  };
  export default {
    name: "EChartsSimple",
    computed: {
      chartAlarmTrend() {

        return this.$echarts.init(Util.getDom('alarmTrend'));
      },
      chartPieFrom() {

        return this.$echarts.init(Util.getDom('pieFrom'));
      },
      chartPieTo() {

        return this.$echarts.init(Util.getDom('pieTo'));
      }
    },
    methods: {
      drawAlarmTrend() {

        let option = {
          title: {
            text: '报警趋势',
            left: '50%',
            textAlign: 'center',
            top: 20,
            textStyle: {
              color: '#666'
            }
          },
          grid: {
            top: 60,
            bottom: 50,
            left: 70,
            right: 70
          },
          tooltip: Object.assign({
            trigger: 'axis'
          }, baseTooltip),
          xAxis: {
            type: 'category',
            data: ['2018-11-13', '2018-11-14'],
            boundaryGap: false,
            splitLine: {
              show: true,
              interval: 'auto',
              lineStyle: {
                color: ['#D4DFF5']
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#999'
              }
            },
            axisLabel: {
              margin: 10,
              textStyle: {
                fontSize: 12
              }
            }
          },
          yAxis: {
            type: 'value',
            splitLine: {
              lineStyle: {
                color: ['#D4DFF5']
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#999'
              }
            },
            axisLabel: {
              margin: 10,
              textStyle: {
                fontSize: 12
              }
            }
          },
          series: [{
            name: '报警趋势',
            type: 'line',
            smooth: true,
            showSymbol: false,
            symbol: 'circle',
            symbolSize: 6,
            data: [1, 4],
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(199, 237, 250,0.5)'
                }, {
                  offset: 1,
                  color: 'rgba(199, 237, 250,0.2)'
                }], false)
              }
            },
            itemStyle: {
              normal: {
                color: '#f7b851'
              }
            },
            lineStyle: {
              normal: {
                width: 2
              }
            }
          }]
        };
        this.chartAlarmTrend.setOption(option);
        return this;
      },
      drawPieFrom() {

        this.chartPieFrom.setOption({
          title: {
            text: '发件人TOP5',
            left: 'center',
            top: 20,
            textStyle: {
              color: '#666'
            }
          },
          legend: {
            show: true,
            orient: 'vertical',
            left: 20,
            top: 20
          },
          tooltip: Object.assign({
            trigger: 'item',
            formatter: "{a}<br/>{b} : {c} ({d}%)"
          }, baseTooltip),
          color: ["#3acaa9", "#af84cb", "#ebcc6f", "#67c4ed"],
          series : [
            {
              name:'发件人top5',
              type:'pie',
              radius : '55%',
              center: ['50%', '50%'],
              data: [
                {
                  name: 'www1988@163.com',
                  value: 4
                },
                {
                  name: 'alexwe@boegn.org',
                  value: 1
                }
              ],
              roseType: 'radius',
              label: {
                normal: {
                  textStyle: {
                    color: '#777'
                  }
                }
              },
              labelLine: {
                normal: {
                  lineStyle: {
                    color: '#888'
                  },
                  smooth: 0.2,
                  length: 10,
                  length2: 20
                }
              },
              itemStyle: {
                normal: {
                  shadowBlur: 200,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              },
              animationType: 'scale',
              animationEasing: 'elasticOut',
              animationDelay: function () {
                return Math.random() * 200;
              }
            }
          ]
        });
        return this;
      },
      drawPieTo() {

        this.chartPieTo.setOption({
          title: {
            text: '收件人TOP5',
            left: 'center',
            top: 20,
            textStyle: {
              color: '#666'
            }
          },
          legend: {
            show: true,
            orient: 'vertical',
            left: 20,
            top: 20
          },
          tooltip: Object.assign({
            trigger: 'item',
            formatter: "{a}<br/>{b} : {c} ({d}%)"
          }, baseTooltip),
          color: ["#3acaa9", "#af84cb", "#ebcc6f", "#67c4ed"],
          series : [
            {
              name:'收件人top5',
              type:'pie',
              radius : '55%',
              center: ['50%', '50%'],
              data: [
                {
                  name: 'wuli995@163.com',
                  value: 4
                },
                {
                  name: 'houl@wpu.edu.cn',
                  value: 1
                }
              ],
              roseType: 'radius',
              label: {
                normal: {
                  textStyle: {
                    color: '#777'
                  }
                }
              },
              labelLine: {
                normal: {
                  lineStyle: {
                    color: '#888'
                  },
                  smooth: 0.2,
                  length: 10,
                  length2: 20
                }
              },
              itemStyle: {
                normal: {
                  shadowBlur: 200,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              },
              animationType: 'scale',
              animationEasing: 'elasticOut',
              animationDelay: function () {
                return Math.random() * 200;
              }
            }
          ]
        });
        return this;
      },
      resizeChart() {

        window.addEventListener("resize", () => {

          this.chartAlarmTrend.resize();
          this.chartPieFrom.resize();
          this.chartPieTo.resize();
        });
      }
    },
    mounted() {

      this.drawAlarmTrend().drawPieFrom().drawPieTo().resizeChart();
    }
  }
</script>

<style scoped lang="less">
  .el-row {
    margin-top: 20px;
  }
  .chart {
    width: 100%;
    height: 330px;
    .border-radius(8px);
    background-color: @boxBgColor;
    box-shadow: 0 0 5px transparent;
    &:hover {
      box-shadow: 0 0 5px @mainColor;
    }
  }
</style>
