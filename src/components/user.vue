<template>
  <div class="user">
    <h5>   总计{{total}}条数据</h5>



    <el-form :inline="true" class="demo-form-inline" :loading="loading">
      <el-form-item>

      </el-form-item>

      <el-form-item label="姓名">
        <el-input v-model="search" placeholder="输入姓名查询"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="fetch">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button  @click="add_form.visible=true">增加用户</el-button>
      </el-form-item>
    </el-form>


      <el-table
        :data="list"
        style="width: 100%"
        border

      >
        <el-table-column prop="id" label="id"></el-table-column>
        <el-table-column prop="name" label="名字"></el-table-column>
        <el-table-column prop="age"  label="年龄"></el-table-column>
        <el-table-column prop="sex"  label="性别"></el-table-column>
        <el-table-column prop="single" label="是否单身"></el-table-column>
        <el-table-column  label="操作">
          <template scope="scope">
            <el-button type="danger" @click="remove(scope.row)">删除</el-button>
            <el-button @click="open_edit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>


    <el-dialog title="增加用户" :visible.sync="add_form.visible"
    >
      <el-form class="demo-form-inline" label-width="100px">
        <el-form-item label="姓名">
          <el-input v-model="add_form.name" placeholder="输入姓名"></el-input>
        </el-form-item>

        <el-form-item label="年龄">
          <el-input v-model="add_form.age" placeholder="输入姓名查询"></el-input>
        </el-form-item>

        <el-form-item label="性别">
          <el-input v-model="add_form.sex" placeholder="输入姓名查询"></el-input>
        </el-form-item>

        <el-form-item label="单身">
          <el-input v-model="add_form.single" placeholder="输入姓名查询"></el-input>
        </el-form-item>
      </el-form>


        <span slot="footer" class="dialog-footer">
          <el-button @click="add_form.visible=false">取 消</el-button>
          <el-button type="primary" @click="add">确 定</el-button>
        </span>
    </el-dialog>


    <el-dialog title="编辑用户" :visible.sync="edit_form.visible"
    >
      <el-form class="demo-form-inline"  label-width="100px">

        <el-form-item label="姓名">
          <el-input v-model="edit_form.name" placeholder="输入姓名"></el-input>
        </el-form-item>

        <el-form-item label="年龄">
          <el-input v-model="edit_form.age" placeholder="输入姓名查询"></el-input>
        </el-form-item>

        <el-form-item label="性别">
          <el-input v-model="edit_form.sex" placeholder="输入姓名查询"></el-input>
        </el-form-item>

        <el-form-item label="单身">
          <el-input v-model="edit_form.single" placeholder="输入姓名查询"></el-input>
        </el-form-item>
      </el-form>


      <span slot="footer" class="dialog-footer">
          <el-button @click="edit_form.visible=false">取 消</el-button>
          <el-button type="primary" @click="edit">确 定</el-button>
        </span>
    </el-dialog>

    <br>
    <el-pagination

      layout="prev, pager, next"
      :total="total"
      @current-change="(p)=>current_page=p"
      :current-page="current_page"
      :page-size="page_size"
    >
    </el-pagination>
  </div>
</template>

<script>
  import axios from 'axios'
  var request = axios.create({
    baseURL:'http://123.56.3.23:8888'
  })

export default {
  name: 'user',
  data () {
    return {
      list:[],
      total:0,
      search:'',
      page_size:10,
      current_page:1,
      loading:false,
      add_form:{
        name:'',
        age:'',
        sex:'',
        single:'',
        visible:false
      },
      edit_form:{
        name:'',
        age:'',
        sex:'',
        single:'',
        visible:false
      }
    }
  },

  watch:{
      current_page(){
          this.fetch()
      }
  },

  methods:{
      change_page(p){
          console.log(p)
      },
      open_edit(data){
          console.log(data)
          data.visible = true
          this.edit_form = {
              visible:true,
              name:data.name,
              single:data.single,
              sex:data.sex,
              age:data.age ,
              id:data.id
          }
      },
      async fetch(){

          var _limit = this.page_size,
              _page = this.current_page,
              search = this.search

          this.loading = true
          var response = await request.get('/func/bbb',{
              params:{
                  _limit,
                  _page,
                  name_like:search
              }
          })
          this.list = response.data.list
          this.total = response.data.total
          this.loading = false
      },
      async add(){
          var add_form = this.add_form
          delete add_form.visible
          var response = await request.post('/data/ryan/user/',add_form)
          this.fetch()
      },
      async remove(data){
        var response = await request.delete('/data/ryan/user/'+data.id)
        this.fetch()
      },
      async edit(){
        var edit_form = this.edit_form
        console.log(edit_form)
        var id = edit_form.id
        delete edit_form.id
        delete edit_form.visible
        var response = await request.patch('/data/ryan/user/'+id,edit_form)
        this.fetch()
      }
  },
  mounted(){
      this.fetch()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
.user{
  box-sizing:border-box;
  padding:20px;
}
ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
