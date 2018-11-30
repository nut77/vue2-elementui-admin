<template>
<div class="home">
  <div class="stat">
    <!--用户卡片-->
    <div class="stat-user">
      <div class="stat-user__title">
        海量邮件数据综合分析系统
      </div>
      <div class="stat-user__detail">
        <p>欢迎您，{{username}}</p>
        <p>当前时间：{{nowTime}}</p>
      </div>
      <img class="stat-user__portrait" src="static/portrait.jpg" alt="">
    </div>
    <!--系统统计数据概览-->
    <div class="stat-info">
      <el-row :gutter="20" v-for="(info, index) in stat" :key="index">
        <el-col :span="8" v-for="(item, index) in info" :key="index">
          <div class="stat-info__item">
            <div class="stat-info__icon" :style="{'background-color': item.bgColor}">
              <i :class="item.icon"></i>
            </div>
            <div class="stat-info__detail">
              <p class="stat-info__total">{{item.total}}</p>
              <p class="stat-info__title">{{item.title}}</p>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
  <el-row :gutter="20" class="margin-t-20 list">
    <!--最新消息-->
    <el-col :span="24">
      <el-card>
        <div slot="header">
          <span><i class="el-icon-news margin-r-5"></i>最新报警</span>
        </div>
        <el-table
          :data="tableData"
          style="width: 100%"
          border
          stripe>
          <el-table-column
            type="index"
            label="序号"
            width="50">
          </el-table-column>
          <el-table-column
            prop="date"
            label="发件时间"
            width="200">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{scope.row.date}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="from"
            label="发件人">
          </el-table-column>
          <el-table-column
            prop="to"
            label="收件人">
          </el-table-column>
          <el-table-column
            prop="project"
            label="邮件主题">
          </el-table-column>
          <el-table-column
            prop="attachment"
            label="附件">
          </el-table-column>
          <el-table-column
            prop="description"
            label="报警描述">
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
  </el-row>
</div>
</template>

<script>
  import Util from '@/assets/js/util';
  export default {
    name: "Home",
    data() {
      return {
        stat: [
          [
            {
              icon: 'el-icon-star-off',
              title: '总报警数（次）',
              total: 5,
              bgColor: '#67c4ed'
            },
            {
              icon: 'el-icon-service',
              title: '总收件人数（个）',
              total: 2,
              bgColor: '#ebcc6f'
            },
            {
              icon: 'el-icon-location-outline',
              title: '总发件人数（个）',
              total: 2,
              bgColor: '#3acaa9'
            }
          ],
          [
            {
              icon: 'el-icon-goods',
              title: '最新报警数（次）',
              total: 5,
              bgColor: '#ebcc6f'
            },
            {
              icon: 'el-icon-edit-outline',
              title: '收件人分布区域（个）',
              total: 2,
              bgColor: '#af84cb'
            },
            {
              icon: 'el-icon-share',
              title: '发件人分布区域（个）',
              total: 2,
              bgColor: '#67c4ed'
            }
          ]
        ],
        username: sessionStorage.getItem('username'),
        nowTime: new Date().Format('yyyy-MM-dd hh:mm:ss'),
        tableData: []
      }
    },
    methods: {
      setNowTime() {

        setInterval(() => {

          this.nowTime = new Date().Format('yyyy-MM-dd hh:mm:ss')
        }, 1000);
      },
      getTableData() {

        this.$axios.get('/table').then(res => {

          this.tableData = res.data;
        });
      }
    },
    mounted() {
      this.setNowTime();
      this.getTableData();
    }
  }
</script>

<style scoped lang="less">
  .home {
    height: calc(~'100% - 40px');
  }
  .stat {
    display: flex;
    height: 230px;
  }
  .stat-user {
    position: relative;
    width: 300px;
    background-color: @boxBgColor;
    box-shadow: 2px 2px 5px #ccc;
  }
  .stat-user__title {
    height: 100px;
    background-color: @mainColor;
    color: white;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    line-height: 70px;
  }
  .stat-user__detail {
    padding-top: 50px;
    color: #666;
    font-size: 13px;
    text-align: center;
  }
  .stat-user__portrait {
    position: absolute;
    top: 50%;
    left: 50%;
    .circle(80px);
    border: 3px solid white;
    box-shadow: 0 0 5px #ccc;
    margin-top: -55px;
    margin-left: -40px;
  }
  .stat-info {
    flex: 1;
    margin-left: 20px;
  }
  .el-row + .el-row {
    margin-top: 10px;
  }
  .stat-info__item {
    display: flex;
    height: 110px;
    box-shadow: 2px 2px 5px #ccc;
    background-color: @boxBgColor;
  }
  .stat-info__icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    color: white;
    [class*='el-icon'] {
      font-size: 50px;
    }
  }
  .stat-info__detail {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .stat-info__total {
    color: #0085d0;
    font-size: 27px;
    font-weight: bold;
  }
  .stat-info__title {
    color: #666;
    font-size: 12px;
  }
  .list {
    display: flex;
    height: calc(~'100% - 250px');
    .el-col {
      height: 100%;
    }
  }
  .el-card {
    height: 100%;
    background-color: @boxBgColor;
    .el-icon-plus {
      float: right;
      color: @dangerColor;
      font-weight: bold;
      cursor: pointer;
    }
  }
  .el-card__header span {
    color: @subColor;
  }
  .el-card__body {
    p {
      border-bottom: 1px solid #e5e5e5;
      color: #555;
      font-size: 15px;
      line-height: 30px;
    }
    .active {
      color: #666;
      text-decoration: line-through;
    }
  }
  .latest-new-list__time {
    color: #666;
    font-size: 14px;
  }
  .el-table {
    font-size: 14px;
  }
</style>
