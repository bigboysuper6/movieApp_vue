<template>
  <el-pagination
    align="right"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-size="pageSize"
    background
    layout="prev, pager, next"
    :total="data.length"
  >
  </el-pagination>
</template>

<script>
import { toRaw } from "vue-demi";
export default {
  props: ["pageSize", "data", "currentPage"],
  methods: {
    //每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {},
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      // console.log(val);
      this.$emit("changeCurrent", val);
    },
  },
};
</script>
