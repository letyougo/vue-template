<template>
  <div id="app">
    <el-row>
      <el-col :span="2">
        <el-menu
          :default-active="name"
          class="el-menu-vertical-demo"
        >
            <el-menu-item index="/user" @click="route('user')">
              <i class="el-icon-setting"></i>
              <span slot="title">用户</span>
            </el-menu-item>
          <el-menu-item index="/good" @click="route('good')">
            <i class="el-icon-menu"></i>
            <span slot="title">商品</span>
          </el-menu-item>
          <el-menu-item index="/record" @click="route('record')">
            <i class="el-icon-setting"></i>
            <span slot="title">订单</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="22">
        <router-view/>
      </el-col>

    </el-row>

  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
      var name = this.$route.path
      return {
          name
      }
  },
  methods:{
      route(name){
          this.$router.push(name)
      }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

}
</style>
