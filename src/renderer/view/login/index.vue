<script>
// Api
import { login, signup } from "@/api/user";

// Config
import { user, token } from "@/config/enum";

// Utils
import { setCookie, getCookie } from "@/utils/index";

const form = { password: "", email: "", name: "" };

export default {
  data() {
    return {
      ruleForm: {},
      drawer: false,
      mode: {
        login: {
          api: login,
          callback: (data) => {
            setCookie(token, data);
            this.$router.push("index");
          },
        },
        signup: {
          api: signup,
          callback: () => {
            this.$message.success("注册成功!");
            this.drawer = false;
          },
        },
      },
    };
  },

  created() {
    this.ruleForm = getCookie(user) || form;
  },

  methods: {
    async submitForm(flag) {
      setCookie(user, this.ruleForm);

      const { code, data, msg } = await this.mode[flag].api(this.ruleForm);

      if (code !== 200) {
        this.$message({ type: "error", message: msg });
        return;
      }

      this.mode[flag].callback(data);
    },
  },
};
</script>

<template>
  <div>
    <el-form :model="ruleForm" status-icon ref="ruleForm" class="demo-ruleForm">
      <el-form-item label="邮箱" prop="email">
        <el-input type="email" v-model="ruleForm.email" autocomplete="off" prefix-icon="el-icon-message" />
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off" prefix-icon="el-icon-lock" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('login')">登录</el-button>
        <el-button @click="drawer = true">注册</el-button>
      </el-form-item>
    </el-form>

    <el-drawer title="注册" :visible.sync="drawer" direction="btt" size="95%">
      <div class="login-signup">
        <el-form :model="ruleForm" status-icon ref="ruleForm" class="demo-ruleForm">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="ruleForm.name" autocomplete="off" prefix-icon="el-icon-user" />
          </el-form-item>

          <el-form-item label="邮箱" prop="email">
            <el-input type="email" v-model="ruleForm.email" autocomplete="off" prefix-icon="el-icon-message" />
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off" prefix-icon="el-icon-lock" />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('signup')">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>

<style>
.login-signup {
  padding: 10px;
}
</style>
