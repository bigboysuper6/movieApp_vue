<template>
  <el-form
    ref="ruleForm"
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
  >
    <el-form-item label="Title" prop="title">
      <el-input v-model="ruleForm.title" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="Genre" prop="genreId">
      <el-select
        style="width: 100%"
        v-model="ruleForm.genreId"
        placeholder="Action"
        autocomplete="off"
      >
        <el-option
          v-for="name in movieSpecies"
          :key="name._id"
          :label="name.name"
          :value="name._id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="number in Stock" prop="numberInStock">
      <el-input
        v-model.number="ruleForm.numberInStock"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item label="Rate" prop="dailyRentalRate">
      <el-input v-model.number="ruleForm.dailyRentalRate"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm', ruleForm)"
        >Save</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { toRaw } from "vue-demi";
import http from "../services/httpService";
export default {
  data() {
    const checkRate = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("Please input the Rate"));
      } else if (typeof value != "number") {
        {
          // console.log(typeof value);
          callback(new Error("Please input number"));
        }
      } else {
        if (value > 10 || value < 1) {
          callback(new Error("Rate must be 1 to 10"));
        } else {
          callback();
        }
      }
    };
    const validateTitle = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the Title"));
      } else if (typeof value != "string")
        callback(new Error("Please input string"));
      else if (value.length < 5)
        callback(new Error("Please input string length>5"));
      else {
        callback();
      }
    };
    const validateNumberStock = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the number in stock"));
      } else if (!Number.isInteger(value)) {
        callback(new Error("Please input digits"));
      } else {
        callback();
      }
    };
    const checkGenre = (rule, value, callback) => {
      if (value === "") callback(new Error("Please input the Genre"));
      else callback();
    };
    return {
      movieSpecies: [],
      ruleForm: {
        title: "",
        numberInStock: "",
        dailyRentalRate: "",
        genreId: "",
      },
      rules: {
        title: [{ validator: validateTitle, trigger: "blur" }],
        numberInStock: [{ validator: validateNumberStock, trigger: "blur" }],
        dailyRentalRate: [{ validator: checkRate, trigger: "blur" }],
        genreId: [{ validator: checkGenre, trigger: "blur" }],
      },
    };
  },
  async created() {
    const { data: genres } = await http.get("http://localhost:3900/api/genres");
    // const genres = genres_.map((item) => item.name);
    this.movieSpecies = genres;
  },
  methods: {
    async submitForm(formName, data) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          await this.saveMovie(data);
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    saveMovie(movie) {
      if (movie._id) {
        const body = { ...movie };
        delete body._id;
        return http.put(
          "http://localhost:3900/api/movies" + "/" + movie._id,
          body
        );
      } else {
        return http.post("http://localhost:3900/api/movies", movie);
      }
    },
  },
};
</script>
