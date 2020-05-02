<template>
  <div>
    <h1>{{id ? "编辑" : '添加'}}物品</h1>
    <el-form  label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <!-- 上传图片 -->
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="afterUpload">
          <img v-if="model.icon" :src="model.icon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    id: {}
  },
  data () {
    return {
      model: {
      }
    }
  },
  methods: {
    // 保存物品
    async save () {
      let res
      if (this.id) {
        res = await this.$http.put(`rest/items/${this.id}`,this.model)
      }else{
        res = await this.$http.post('rest/items', this.model)
      }
      if (res.status !== 200) {
        return this.$message.error('保存失败')
      }
      this.$router.push('/items/list')
      this.$message.success('保存成功!')
    },
    async fetch() {
      const res = await this.$http.get(`rest/items/${this.id}`)
      this.model = res.data
    },
    afterUpload (res) {
      console.log(res)
      // 如果在实例创建之后添加新的属性到实例上，它不会触发视图更新。
      // Vue 不能检测到对象属性的添加或删除。
      // Vue 不允许在已经创建的实例上动态添加新的根级响应式属性 (root-level reactive property)。然而它可以使用 Vue.set(object, key, value) 方法将响应属性添加到嵌套的对象上：
      this.$set(this.model, 'icon', res.url)
    }
  },
  created () {
    this.id && this.fetch()
  }
}
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>