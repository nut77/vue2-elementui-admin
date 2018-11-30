<template>
  <div>
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
  </div>
</template>

<script>
  export default {
    name: "Table",
    data() {
      return {
        tableData: []
      }
    },
    methods: {
      getTableData() {

        this.$axios.get('/table').then(res => {

          this.tableData = res.data;
        });
      }
    },
    mounted() {

      this.getTableData();
    }
  }
</script>

<style scoped>
  .el-table {
    font-size: 14px;
  }
</style>
