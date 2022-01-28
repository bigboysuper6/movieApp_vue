<template>
  <el-form
    ref="ruleForm"
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
  >
    <el-form-item
      prop="email"
      label="Email"
      :rules="[
        {
          required: false,
          message: 'Please input email address',
          trigger: 'blur',
        },
        {
          type: 'email',
          message: 'Please input correct email address',
          trigger: ['blur', 'change'],
        },
      ]"
    >
      <el-input v-model="ruleForm.email"></el-input>
    </el-form-item>
    <el-form-item label="Password" prop="password">
      <el-input
        v-model="ruleForm.password"
        type="password"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item label="Name" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm', ruleForm)"
        >Register</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import http from "../services/httpService";
export default {
  data() {
    const checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Please input the name"));
      } else if (typeof value != "string") {
        callback(new Error("Please input string"));
      } else {
        if (value.length < 5) {
          callback(new Error("Name length must be greater than 5"));
        } else {
          callback();
        }
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password"));
      } else {
        if (value.length < 6)
          callback(new Error("Please input the password length >= 6"));
        else callback();
      }
    };
    return {
      ruleForm: {
        password: "",
        email: "",
        name: "",
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        name: [{ validator: checkName, trigger: "blur" }],
      },
      button: true,
    };
  },
  methods: {
    submitForm(formName, data) {
      // console.log(data);
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            const response = await http.post(
              "http://localhost:3900/api/users",
              data
            );
            localStorage.setItem("token", response.headers["x-auth-token"]);
            // this.$router.push({ path: "/" });
            window.location = "/";
          } catch (ex) {
            alert("database maybe down");
          }

          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
