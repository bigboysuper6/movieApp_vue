<template>
  <el-table
    :data="data.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
    :default-sort="{ prop: 'title', order: 'ascending' }"
    style="width: 100%"
  >
    <el-table-column prop="title" label="Title" sortable width="180" />
    <el-table-column prop="genre.name" sortable label="Genre" width="180" />
    <el-table-column prop="numberInStock" sortable label="Stock" />
    <el-table-column prop="dailyRentalRate" sortable label="Rate" />
    <el-table-column prop="liked" label="">
      <template v-slot="scope">
        <el-button
          :type="scope.row.liked ? 'warning' : 'default'"
          icon="el-icon-star-off"
          @click="this.star(scope.row)"
          circle
        ></el-button>
      </template>
    </el-table-column>
    <el-table-column width="100px" v-if="user" label="">
      <template v-slot="scope">
        <el-button type="danger" round @click="this.delete(scope.row)"
          >Delete</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import http from "../services/httpService";
export default {
  props: ["data", "currentPage", "pageSize", "user"],
  methods: {
    star(data) {
      data.liked = !data.liked;
    },
    async delete(data) {
      try {
        if (http.delete("http://localhost:3900/api/movies" + "/" + data._id)) {
          console.log("delete success");
          this.$emit("dataUpdate", data);
        }
      } catch (ex) {
        alter("delete error");
      }
    },
  },
};
</script>
