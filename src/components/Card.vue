<template>
  <el-tabs
    :tab-position="tabPosition"
    style="height: 200px"
    @tab-click="leftpage"
  >
    <el-tab-pane label="All Movie" name="All Movie"></el-tab-pane>
    <el-tab-pane
      v-for="name in movieSpecies"
      :key="name"
      :label="name"
      :name="name"
    ></el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  props: ["movieSpecies"],
  data() {
    return {
      tabPosition: "left",
    };
  },
  methods: {
    leftpage(tab) {
      // console.log(tab.paneName);
      this.$emit("selectMovie", tab.paneName);
    },
  },
};
</script>
