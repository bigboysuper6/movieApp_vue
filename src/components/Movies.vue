<template>
  <div class="typography">
    <div class="card">
      <Card v-bind:movieSpecies="movieSpecies" v-on:selectMovie="selectData" />
    </div>
    <div class="main">
      <NewButton v-bind:user="user" />
      <Search
        class="search"
        v-bind:data="movieData"
        v-on:selectMovie="selectMovie"
      />
      <MovieTable
        class="table"
        v-bind:user="user"
        v-bind:data="tableData"
        v-bind:currentPage="currentPage"
        v-bind:pageSize="pageSize"
        v-on:dataUpdate="updateData"
      />
      <pagination
        class="pagination"
        v-bind:currentPage="currentPage"
        v-bind:pageSize="pageSize"
        v-bind:data="tableData"
        v-on:changeCurrent="changePage"
      />
    </div>
  </div>
</template>

<style scoped>
.typography {
  display: flex;
  flex-wrap: wrap;
}
.card {
  margin: 0 50px;
}
.main {
  width: 80vw;
}
.search {
  margin-left: 12px;
}
.pagination {
  margin-top: 15px;
}
</style>

<script lang="ts">
import Pagination from "./Pagination.vue";
import http from "../services/httpService";
import { Star } from "@element-plus/icons";
import Card from "./Card.vue";
import Search from "./Search.vue";
import NewButton from "./NewButton.vue";
import MovieTable from "./MovieTable.vue";

export default {
  props: ["user"],
  data() {
    return {
      tableData: [],
      currentPage: 1, // 当前页码
      pageSize: 4, // 每页的数据条数
      movieData: [],
      movieSpecies: [],
    };
  },
  async created() {
    const { data } = await http.get("http://localhost:3900/api/movies");
    this.tableData = data;
    this.movieData = data;
    const { data: genres_ } = await http.get(
      "http://localhost:3900/api/genres"
    );
    const genres = genres_.map((item) => item.name);
    this.movieSpecies = genres;
  },

  methods: {
    selectData(name) {
      if (name === "All Movie") {
        this.tableData = this.movieData;
      } else {
        this.tableData = this.movieData.filter(
          (item) => item.genre.name === name
        );
      }
      console.log(this.tableData, this.movieData);
    },
    changePage(newPage) {
      this.currentPage = newPage;
      // console.log(this.currentPage);
    },
    async updateData(movie) {
      console.log(this.tableData);
      const originalData = this.tableData;
      const newMovie = originalData.filter((data) => data._id !== movie._id);
      this.tableData = newMovie;
      this.movieData = newMovie;
    },
    selectMovie(data) {
      this.tableData = data;
    },
  },
  components: {
    Star,
    Pagination,
    Card,
    Search,
    NewButton,
    MovieTable,
  },
  computed: {},
};
</script>
