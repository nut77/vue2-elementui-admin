<template>
  <div>
    <el-pagination
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      :total="100"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      stripe
      :default-sort="{prop: 'date', order: 'descending'}">
      <el-table-column
        type="selection"
        width="35">
      </el-table-column>
      <el-table-column
        type="index"
        label="序号"
        width="50">
      </el-table-column>
      <el-table-column
        property="date"
        label="日期"
        width="180"
        sortable>
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 5px">{{scope.row.date}}</span>
        </template>
      </el-table-column>
      <el-table-column
        property="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        property="address"
        label="地址">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "Table",
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    }
  }
</script>

<style scoped lang="less"></style>
