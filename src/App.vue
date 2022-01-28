<template>
  <NavBar v-model:user="user" class="navBar" />
  <router-view />
</template>
<style scoped></style>

<script>
import NavBar from "./components/NavBar.vue";
import getUser from "./services/User";
export default {
  name: "App",
  data() {
    const user = getUser();
    return {
      user: user,
    };
  },
  components: {
    NavBar,
  },
};
</script>
