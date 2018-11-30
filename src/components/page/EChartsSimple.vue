<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <div id="pie" class="chart"></div>
      </el-col>
      <el-col :span="8">
        <div id="line" class="chart"></div>
      </el-col>
      <el-col :span="8">
        <div id="bar" class="chart"></div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <div id="gauge" class="chart"></div>
      </el-col>
      <el-col :span="8">
        <div id="radar" class="chart"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Util from '@/assets/js/util';
  export default {
    name: "EChartsSimple",
    computed: {
      chartPie() {

        return this.$echarts.init(Util.getDom('pie'));
      },
      chartLine() {

        return this.$echarts.init(Util.getDom('line'));
      },
      chartBar() {

        return this.$echarts.init(Util.getDom('bar'));
      },
      chartGauge() {

        return this.$echarts.init(Util.getDom('gauge'));
      },
      chartRadar() {

        return this.$echarts.init(Util.getDom('radar'));
      },
    },
    methods: {
      drawPie() {

        this.$axios.get('/chart-simple/pie').then(res => {

          this.chartPie.setOption({
            title: {
              text: '中文名使用TOP5',
              left: 'center',
              top: 20,
              textStyle: {
                color: '#666'
              }
            },
            tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            visualMap: {
              show: false,
              min: 80,
              max: 600,
              inRange: {
                colorLightness: [0, 1]
              }
            },
            series : [
              {
                name:'中文名使用TOP5',
                type:'pie',
                radius : '55%',
                center: ['50%', '50%'],
                data: res.data.data,
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
                    color: '#c23531',
                    shadowBlur: 200,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                },
                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                  return Math.random() * 200;
                }
              }
            ]
          });
        });
        return this;
      },
      drawLine() {

        this.$axios.get('/chart-simple/line').then(res => {

          this.chartLine.setOption({
            title: {
              text: '用户周活跃度',
              left: 'center',
              top: 20,
              textStyle: {
                color: '#666'
              }
            },
            tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c}"
            },
            xAxis: {
              type: 'category',
              data: res.data.xData
            },
            yAxis: {
              type: 'value'
            },
            series: [{
              name: '用户周活跃度',
              data: res.data.yData,
              type: 'line',
              symbol: 'triangle',
              symbolSize: 20,
              lineStyle: {
                normal: {
                  color: 'green',
                  width: 4,
                  type: 'dashed'
                }
              },
              itemStyle: {
                normal: {
                  borderWidth: 3,
                  borderColor: 'yellow',
                  color: 'blue'
                }
              }
            }]
          });
        });
        return this;
      },
      drawBar() {

        this.$axios.get('/chart-simple/bar').then(res => {

            this.chartBar.setOption({
            title: {
              text: '商品日销量',
              left: 'center',
              top: 20,
              textStyle: {
                color: '#666'
              }
            },
            tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c}"
            },
            xAxis: {
              type: 'category',
              data: res.data.xData
            },
            yAxis: {
              type: 'value'
            },
            series: [{
              name: '商品日销量',
              data: res.data.yData,
              type: 'bar',
              symbol: 'triangle',
              symbolSize: 20,
              lineStyle: {
                normal: {
                  color: 'green',
                  width: 4,
                  type: 'dashed'
                }
              },
              itemStyle: {
                normal: {
                  borderWidth: 3,
                  borderColor: 'yellow',
                  color: 'blue'
                }
              }
            }]
          });
        });
        return this;
      },
      drawGauge() {

        let option = {
          title: {
            text: '平均速度(km/h)',
            left: 'center',
            top: 20,
            textStyle: {
              color: '#666'
            }
          },
          series : [
            {
              name: '平均速度(km/h)',
              type: 'gauge',
              center : ['50%', '60%'],
              min: 0,
              max: 220,
              splitNumber: 11,
              radius: '80%',
              axisLine: {
                lineStyle: {
                  width: 7
                }
              },
              axisTick: {
                length: 12,
                lineStyle: {
                  color: 'auto'
                }
              },
              splitLine: {
                length: 15,
                lineStyle: {
                  color: 'auto'
                }
              },
              axisLabel: {
                backgroundColor: 'auto',
                borderRadius: 2,
                color: '#eee',
                padding: 3,
                textShadowBlur: 2,
                textShadowOffsetX: 1,
                textShadowOffsetY: 1,
                textShadowColor: '#222'
              },
              pointer: {
                width: 5
              },
              detail : {
                formatter: value => parseFloat(value).toFixed(2),
                fontWeight: 'bolder',
                borderRadius: 3,
                backgroundColor: '#444',
                borderColor: '#aaa',
                shadowBlur: 5,
                shadowColor: '#333',
                shadowOffsetY: 3,
                borderWidth: 2,
                textBorderColor: '#000',
                textBorderWidth: 2,
                textShadowBlur: 2,
                textShadowColor: '#fff',
                width: 70,
                fontSize: 20,
                color: '#eee',
              },
              data:[{value: 40, name: ''}]
            }]
        };
        this.$axios.get('/chart-simple/gauge').then(res => {

          option.series[0].data[0].value = res.data.value;
          this.chartGauge.setOption(option);

          setInterval(() => {

            option.series[0].data[0].value = (Math.random() * 100).toFixed(2);
            this.chartGauge.setOption(option, true);
          }, 2000);
        });

        return this;
      },
      drawRadar() {

        this.$axios.get('/chart-simple/radar').then(res => {

          this.chartRadar.setOption({
            title: {
              text: '部门预算支出比',
              left: 'center',
              top: 20,
              textStyle: {
                color: '#666'
              }
            },
            tooltip: {},
            radar: {
              name: {
                textStyle: {
                  color: '#fff',
                  backgroundColor: '#999',
                  borderRadius: 3,
                  padding: [3, 5]
                }
              },
              center: ['50%', '58%'],
              radius: '57%',
              indicator: [
                {name: '销售', max: 16000},
                {name: '管理', max: 16000},
                {name: '运营', max: 16000},
                {name: '客服', max: 16000},
                {name: '研发', max: 16000},
                {name: '市场', max: 16000}
              ]
            },
            series: [{
              name: '预算 vs 开销（Budget vs spending）',
              type: 'radar',
              data : [
                {
                  value : res.data.budget,
                  name : '预算分配（Allocated Budget）'
                },
                {
                  value : res.data.spending,
                  name : '实际开销（Actual Spending）'
                }
              ]
            }]
          });
        });
        return this;
      },
      resizeChart() {

        window.addEventListener("resize", () => {

          this.chartPie.resize();
          this.chartLine.resize();
          this.chartBar.resize();
          this.chartGauge.resize();
          this.chartRadar.resize();
        });
      }
    },
    mounted() {

      this.drawPie().drawLine().drawBar().drawGauge().drawRadar().resizeChart();
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
