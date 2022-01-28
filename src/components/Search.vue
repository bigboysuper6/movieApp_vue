<template>
  <div class="demo-input-suffix">
    <span class="demo-input-label"></span>
    <el-row :gutter="20">
      <el-input
        v-model="input2.title"
        placeholder="Search"
        prefix-icon="el-icon-search"
        @change="handleSelect"
      />
    </el-row>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      input2: {
        title: "",
      },
    };
  },
  computed: {
    handleSelect() {
      // if (this.input2.title)
      let Select;
      if (this.input2.title != "") {
        Select = this.data.filter((m) =>
          m.title.toLowerCase().startsWith(this.input2.title.toLowerCase())
        );
        this.$emit("selectMovie", Select);
      }
      // console.log(Select, this.data);
    },
  },
};
</script>

<style>
.demo-input-label {
  display: inline-block;
  width: 130px;
}

.demo-input-suffix {
  margin-bottom: 10px;
}
</style>
