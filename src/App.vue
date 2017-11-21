<template>
  <div id="app">
    <div class="top-bar">
      <div>考试管理系统</div>
      <span class="name">欢迎admin</span>
    </div>
    <el-row>
      <el-col :span="2">
        <el-menu
          :default-active="name"
          class="el-menu-vertical-demo"

        >
            <!--<el-menu-item index="/user" @click="route('user')">-->
              <!--<i class="el-icon-setting"></i>-->
              <!--<span slot="title">用户</span>-->
            <!--</el-menu-item>-->
          <el-menu-item index="/teacher" @click="route('teacher')">
            <i class="el-icon-setting"></i>
            <span slot="title">教师信息</span>
          </el-menu-item>

          <el-menu-item index="/exam" @click="route('exam')">
            <i class="el-icon-setting"></i>
            <span slot="title">考试信息</span>
          </el-menu-item>
          <el-menu-item index="/work" @click="route('work')">
            <i class="el-icon-setting"></i>
            <span slot="title">劳务信息</span>
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
  body,html{
    width: 100%;
    height: 100%;

  }
  div{
    margin: 0;
    padding: 0;
  }
#app {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  min-width: 1280px;

}
  .top-bar{
    background:#409EFF ;
    line-height: 70px;
    text-align: center;
    color: #ffffff;
    font-size: 30px;
    text-shadow: 10px 10px 4px 4px rgba(0,0,0,0.8);
    position: relative;
  }

  .name{
    position: absolute;
    right: 20px;
    line-height: 70px;
    top: 0;
    bottom: 0;
    font-size: 14px;
  }
</style>
