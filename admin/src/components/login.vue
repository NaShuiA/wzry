<template>
<div class="login_container">
  <el-card header="请先登录" class="login_card">
    <el-form @submit.native.prevent="login">
      <el-form-item label="用户名:">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码:">
        <el-input type="password" v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">登录</el-button>
        <el-button type="info">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</div>
</template>
<script>
export default {
  data() {
    return{
      model:{}
    }
  },
  methods:{
    async login() {
      const res = await this.$http.post('login',this.model)
      localStorage.token = res.data.token
      this.$message.success('登录成功')
      this.$router.push('/')
      console.log(res.data)
    }
  }
}
</script>  
<style lang="scss" scoped>
.login_card {
  width: 25rem;
  font-size: 1.4rem;
  margin: 10rem auto;
}
</style>