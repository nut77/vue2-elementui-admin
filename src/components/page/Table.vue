<template>
  <div>
    <!--分页-->
    <el-pagination
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      :total="100"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!--表格内容-->
    <el-table
      ref="list"
      :data="tableData"
      style="width: 100%"
      border
      stripe
      highlight-current-row
      :default-sort="{prop: 'date', order: 'descending'}"
      @row-click="handleRowClick"
      @select-all="handelCheckedAllAndCheckedNone"
      @select="handelCheckedAllAndCheckedNone">
      <el-table-column
        type="selection"
        width="45"
        align="center">
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
      <el-table-column
        label="操作"
        width="130"
        align="center">
        <template slot-scope="scope">
          <el-button circle icon="el-icon-edit-outline" type="primary" title="编辑" size="small"
            @click="rowEdit(scope.$index, scope.row)"></el-button>
          <el-button circle icon="el-icon-delete" type="danger" title="删除" size="small"
            @click="rowDel(scope.$index, scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--编辑-弹出层-->
    <el-dialog
      title="编辑"
      :visible.sync="isShowEditDialog"
      width="500px">


    </el-dialog>
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
        }],
        isShowEditDialog: false
      }
    },
    methods: {
      handleRowClick(row, event, column) {

        // 仅选中当前行
        this.setCurRowChecked(row);
      },
      handelCheckedAllAndCheckedNone(selection) {

        // 当前选中仅一行时操作-（当前表格行高亮）
        console.log(selection);
        1 != selection.length && this.$refs.list.setCurrentRow();
      },
      rowEdit(index, row) {

        // 当前行索引，从0开始
        console.log(index);

        this.isShowEditDialog = true;
        this.setCurRowChecked(row);
      },
      rowDel(index, row) {
      },
      setCurRowChecked(row) {

        this.$refs.list.clearSelection();
        this.$refs.list.toggleRowSelection(row);
      }
    }
  }
</script>

<style scoped lang="less"></style>