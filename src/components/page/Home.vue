<template>
<div class="home">
  <div class="stat">
    <!--用户卡片-->
    <div class="stat-user">
      <div class="stat-user__title">
        后台管理系统模板
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
    <!--待办事项-->
    <el-col :span="12">
      <el-card>
        <div slot="header">
          <span><i class="el-icon-tickets margin-r-5"></i>待办事项</span>
          <i class="el-icon-plus" @click="addNewTodoItem" title="新增"></i>
        </div>
        <p v-for="(item ,i) in todoList" :key="i">
          <el-checkbox v-model="item.isChecked"></el-checkbox>
          <span :class="{active: item.isChecked}">{{i + 1 > 9 ? i + 1 : '0' + (i + 1)}}-{{item.title}}</span>
        </p>
      </el-card>
    </el-col>
    <!--最新消息-->
    <el-col :span="12">
      <el-card>
        <div slot="header">
          <span><i class="el-icon-news margin-r-5"></i>最新消息</span>
        </div>
        <p v-for="(item ,i) in latestNewList" :key="i">
          <span class="latest-new-list__time"><i class="el-icon-time margin-r-5"></i>{{item.time}}：</span>
          <span>{{item.title}}</span>
        </p>
      </el-card>
    </el-col>
  </el-row>
</div>
</template>

<script>
  import Util from '@/assets/js/util';
  let todoList = [], latestNewList = [];
  for (let i = 0; i < 10; i++) {

    todoList.push({
      title: `今天需要做的待办事项咯~~~`,
      isChecked: false
    });
    latestNewList.push({
      time: new Date(new Date().getTime()  + i * 24 * 3600 * 1000).Format('yyyy-MM-dd'),
      title: `今日的最新新闻来咯~~~`
    });
  }
  export default {
    name: "Home",
    data() {
      return {
        stat: [
          [
            {
              icon: 'el-icon-service',
              title: '公司总员工数',
              total: 198397,
              bgColor: '#ebcc6f'
            },
            {
              icon: 'el-icon-location-outline',
              title: '客户分布区域',
              total: 19,
              bgColor: '#3acaa9'
            },
            {
              icon: 'el-icon-star-off',
              title: '收货好评',
              total: 190857,
              bgColor: '#67c4ed'
            }
          ],
          [
            {
              icon: 'el-icon-edit-outline',
              title: '历史订单数',
              total: 9397,
              bgColor: '#af84cb'
            },
            {
              icon: 'el-icon-share',
              title: '产品总转发数量',
              total: 9097,
              bgColor: '#67c4ed'
            },
            {
              icon: 'el-icon-goods',
              title: '产品总数',
              total: 397,
              bgColor: '#ebcc6f'
            }
          ]
        ],
        username: localStorage.getItem('username'),
        nowTime: new Date().Format('yyyy-MM-dd hh:mm:ss'),
        todoList,
        latestNewList
      }
    },
    methods: {
      setNowTime() {

        setInterval(() => {

          this.nowTime = new Date().Format('yyyy-MM-dd hh:mm:ss')
        }, 1000);
      },
      addNewTodoItem() {

        this.$prompt('请输入待办事项主题', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({value}) => {

          this.$message({
            type: 'success',
            message: '新增待办事项成功'
          });
          this.todoList.unshift({
            title: value,
            isChecked: false
          });
        }).catch(() => {

          this.$message({
            type: 'info',
            message: '取消新增待办事项'
          });
        });
      }
    },
    mounted() {
      this.setNowTime();
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
</style>
