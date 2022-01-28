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
      label="Username"
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
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm', ruleForm)"
        >Submit</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
import http from "../services/httpService";
export default {
  data() {
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
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },

  methods: {
    submitForm(formName, data) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            const { data: jwt } = await http.post(
              "http://localhost:3900/api/auth",
              data
            );
            localStorage.setItem("token", jwt);
            window.location = "/";
          } catch (ex) {
            alert("error user or password ");
          }
          // this.$router.push({ path: "/" });
        } else {
          alert("submit!");

          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
