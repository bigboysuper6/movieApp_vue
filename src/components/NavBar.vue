<template>
  <el-menu
    :default-active="this.$route.path"
    class="el-menu-demo"
    mode="horizontal"
    router="true"
  >
    <el-button type="text" @click="this.toHome()">Vidly</el-button>
    <el-menu-item index="/">Movies</el-menu-item>
    <el-menu-item index="/customers">Customers</el-menu-item>
    <el-menu-item index="/rentals">Rentals</el-menu-item>
    <el-menu-item v-if="!user" index="/login">Login</el-menu-item>
    <el-menu-item v-if="user" index="/404">{{ user.name }}</el-menu-item>
    <el-menu-item v-if="!user" index="/register">Register</el-menu-item>
    <el-menu-item v-if="user" index="/logout">Logout</el-menu-item>
  </el-menu>
</template>

<style scoped>
button.el-button.el-button--text {
  padding: 12px 20px;
  font-size: 18px;
  color: black;
}

li.el-menu-item {
  --el-menu-hover-background-color: initial;
}
</style>

<script>
import getUser from "../services/User";
export default {
  props: ["user"],
  data() {
    return {
      user: getUser(),
    };
  },
  methods: {
    toHome() {
      window.location = "/";
    },
  },
};
</script>
