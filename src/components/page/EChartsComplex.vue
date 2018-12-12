<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div id="line1" class="chart"></div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <div id="liquid" class="chart"></div>
      </el-col>
      <el-col :span="8">
        <div id="line2" class="chart"></div>
      </el-col>
      <el-col :span="8">
        <div id="pie" class="chart"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Util from '@/assets/js/util';
  import 'echarts-liquidfill';
  export default {
    name: "EChartsComplex",
    computed: {
      chartLine1() {

        return this.$echarts.init(Util.getDom('line1'));
      },
      chartLine2() {

        return this.$echarts.init(Util.getDom('line2'))
      },
      chartPie() {

         return this.$echarts.init(Util.getDom('pie'))
      },
      chartLiquid() {

        return this.$echarts.init(Util.getDom('liquid'))
      },
    },
    methods: {
      drawLine1() {

        let option = {
          title: {
            text: '今日&昨日',
            left: '50%',
            textAlign: 'center',
            top: 20,
            textStyle: {
              color: '#666'
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              lineStyle: {
                color: '#ddd'
              }
            },
            backgroundColor: 'rgba(255,255,255,1)',
            padding: [5, 10],
            textStyle: {
              color: '#7588E4',
            },
            extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)'
          },
          legend: {
            right: 20,
            orient: 'vertical',
            data: ['今日', '昨日']
          },
          xAxis: {
            type: 'category',
            data: ['00:00','2:00','4:00','6:00','8:00','10:00','12:00','14:00','16:00','18:00','20:00',"22:00"],
            boundaryGap: false,
            splitLine: {
              show: false,
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
                fontSize: 14
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
                fontSize: 14
              }
            }
          },
          series: [{
            name: '今日',
            type: 'line',
            smooth: true,
            showSymbol: false,
            symbol: 'circle',
            symbolSize: 4,
            data: ['1200', '1400', '1008', '1411', '1026', '1288', '1300', '800', '1100', '1000', '1118', '1322'],
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
                color: 'rgba(154, 116, 179, 0.7)'
              }
            },
            lineStyle: {
              normal: {
                width: 2
              }
            }
          }, {
            name: '昨日',
            type: 'line',
            smooth: true,
            showSymbol: false,
            symbol: 'circle',
            symbolSize: 4,
            data: ['1200', '1400', '808', '811', '626', '488', '1600', '1100', '500', '300', '1998', '822'],
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(216, 244, 247,1)'
                }, {
                  offset: 1,
                  color: 'rgba(216, 244, 247,1)'
                }], false)
              }
            },
            itemStyle: {
              normal: {
                color: 'rgba(126, 237, 238, 0.7)'
              }
            },
            lineStyle: {
              normal: {
                width: 2
              }
            }
          }]
        };
        this.chartLine1.setOption(option);
        return this;
      },
      drawLine2() {

        this.$axios.get('/chart-complex/line2').then(res => {

          let data = res.data;
          let xAxisMonth = [], barData = [], lineData = [];
          for (let i = 0; i < data.chart.length; i++) {

            xAxisMonth.push(data.chart[i].month + '月');
            barData.push({
              "name": xAxisMonth[i],
              "value": data.chart[i].value
            });
            lineData.push({
              "name": xAxisMonth[i],
              "value": data.chart[i].ratio
            });
          }

          let option = {
            backgroundColor: "transparent",
            title: '',
            grid: {
              top: 35,
              left: 20,
              right: 20,
              bottom: 20,
              containLabel: true
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'none'
              },
              formatter: function (params) {
                return params[0]["data"].name + "<br/>" + '训练人次: ' + params[1]["data"].value + "<br/>" + '合格率: ' + params[0]["data"].value;
              }
            },
            xAxis: [
              {
                type: 'category',
                show: false,
                data: xAxisMonth,
                axisLabel: {
                  textStyle: {
                    color: '#b6b5ab'
                  }
                }
              },
              {
                type: 'category',
                position: "bottom",
                data: xAxisMonth,
                boundaryGap: true,
                axisTick: {
                  show: false
                },
                axisLine: {
                  show: false
                },
                axisLabel: {
                  textStyle: {
                    color: '#b6b5ab'
                  }
                }
              }
            ],
            yAxis: [
              {
                show: true,
                offset: 52,
                splitLine: {
                  show: false,
                  lineStyle: {
                    color: "rgba(255,255,255,0.2)"
                  }
                },
                axisTick: {
                  show: false
                },
                axisLine: {
                  show: true
                },
                axisLabel: {
                  show: true,
                  color: '#b6b5ab'
                }
              },
              {
                show: false,
                type: "value",
                name: "合格率(%)",
                nameTextStyle: {
                  color: '#ccc'
                },
                axisLabel: {
                  color: '#ccc'
                },
                splitLine: {
                  show: false
                },
                axisLine: {
                  show: false
                },
                axisTick: {
                  show: false
                }
              }
            ],
            color: ['#e54035'],
            series: [
              {
                name: '训练人次',
                type: 'pictorialBar',
                xAxisIndex: 1,
                barCategoryGap: '-80%',
                symbol: 'path://d="M150 50 L130 130 L170 130  Z"',
                itemStyle: {
                  normal: {
                    color: function (params) {

                      let colorList = [
                        'rgba(13,177,205,0.8)', 'rgba(29,103,182,0.6)',
                        'rgba(13,177,205,0.8)', 'rgba(29,103,182,0.6)',
                        'rgba(13,177,205,0.8)', 'rgba(29,103,182,0.6)'
                      ];
                      return colorList[params.dataIndex];
                    }
                  },
                  emphasis: {
                    opacity: 1
                  }
                },
                data: barData,
              },
              {
                symbol: 'image://static/chart-icon.png',
                symbolSize: 42,
                name: "完成率",
                type: "line",
                yAxisIndex: 1,
                data: lineData,
                itemStyle: {
                  normal: {
                    borderWidth: 5,
                    color: {
                      colorStops: [{
                        offset: 0,
                        color: '#821eff'
                      },

                        {
                          offset: 1,
                          color: '#204fff'
                        }
                      ],
                    }
                  }
                }
              }
            ]
          };
          this.chartLine2.setOption(option);
        });
        return this;
      },
      drawPie() {

        var dataStyle = {
          normal: {
            label: {show:false},
            labelLine: {show:false},
            shadowBlur: 40,
            shadowColor: 'rgba(40, 40, 40, 0.5)',
          }
        };
        var placeHolderStyle = {
          normal : {
            color: 'rgba(0,0,0,0)',
            label: {show:false},
            labelLine: {show:false}
          },
          emphasis : {
            color: 'rgba(0,0,0,0)'
          }
        };
        let option = {
          //backgroundColor: '#f4f2e3',
          color: ['#85b6b2', '#6d4f8d','#cd5e7e', '#e38980','#f7db88'],
          tooltip : {
            show: true,
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            itemGap: 12,
            left: 20,
            top: 30,
            orient: 'vertical',
            data:['01','02','03','04','05','06']
          },
          series : [
            {
              name:'Line 1',
              type:'pie',
              clockWise:false,
              radius : [120, 140],
              itemStyle : dataStyle,
              hoverAnimation: false,
              data:[
                {
                  value:300,
                  name:'01'
                },
                {
                  value:50,
                  name:'invisible',
                  itemStyle : placeHolderStyle
                }

              ]
            },
            {
              name:'Line 2',
              type:'pie',
              clockWise:false,
              radius : [100, 120],
              itemStyle : dataStyle,
              hoverAnimation: false,
              data:[
                {
                  value:150,
                  name:'02'
                },
                {
                  value:60,
                  name:'invisible',
                  itemStyle : placeHolderStyle
                }
              ]
            },
            {
              name:'Line 3',
              type:'pie',
              clockWise:false,
              hoverAnimation: false,
              radius : [80, 100],
              itemStyle : dataStyle,
              data:[
                {
                  value:80,
                  name:'03'
                },
                {
                  value:50,
                  name:'invisible',
                  itemStyle : placeHolderStyle
                }
              ]
            },
            {
              name:'Line 4',
              type:'pie',
              clockWise:false,
              hoverAnimation: false,
              radius : [60, 80],
              itemStyle : dataStyle,
              data:[
                {
                  value:45,
                  name:'04'
                },
                {
                  value:30,
                  name:'invisible',
                  itemStyle : placeHolderStyle
                }
              ]
            },
            {
              name:'Line 5',
              type:'pie',
              clockWise: false,
              hoverAnimation: false,
              radius : [50, 60],
              itemStyle : dataStyle,
              data:[
                {
                  value:30,
                  name:'05'
                },
                {
                  value:30,
                  name:'invisible',
                  itemStyle : placeHolderStyle
                }
              ]
            },
          ]
        };

        this.chartPie.setOption(option);
        return this;
      },
      drawLiquid() {

        this.chartLiquid.setOption({
          series: [{
            type: 'liquidFill',
            data: [0.6, 0.5, 0.4, 0.3],
            radius: '75%'
          }]
        });
        return this;
      },
      resizeChart() {

        window.addEventListener("resize", () => {

          this.chartLine1.resize();
          this.chartLine2.resize();
          this.chartPie.resize();
          this.chartLiquid.resize();
        });
      }
    },
    mounted() {

      this.drawLine1().drawLine2().drawPie().drawLiquid().resizeChart();
    }
  }
</script>

<style scoped lang="less">
  .el-row {
    margin-top: 20px;
  }
  .chart {
    width: 100%;
    height: 350px;
    .border-radius(8px);
    background-color: @boxBgColor;
    box-shadow: 0 0 5px transparent;
    &:hover {
      box-shadow: 0 0 5px @mainColor;
    }
  }
</style>
