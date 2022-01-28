<template>
  <el-row>
    <el-button v-if="user" type="success" round @click="newmovie"
      >NewMovie</el-button
    >
  </el-row>
</template>

<script>
export default {
  props: ["user"],
  methods: {
    newmovie() {
      this.$router.push({ path: `/newmovie` });
    },
  },
};
</script>
