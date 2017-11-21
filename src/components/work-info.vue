<template>
  <div class="work">
    <h5>   总计{{total}}条数据</h5>



    <el-form :inline="true" class="demo-form-inline" :loading="loading">
      <el-form-item label="姓名">
        <el-input v-model="search" placeholder="输入姓名查询"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button-group>
          <el-button type="primary" @click="fetch">查询</el-button>
          <el-button  @click="add_form.visible=true">增加劳务信息</el-button>
        </el-button-group>
      </el-form-item>

    </el-form>
      <el-table
        :data="list"
        style="width: 100%"
        border
        size="small"
      >
        <el-table-column prop="id" label="id"></el-table-column>
        <el-table-column prop="teacher" label="监考老师"></el-table-column>
        <el-table-column prop="id_card"  label="年龄"></el-table-column>
        <el-table-column prop="exam"  label="考试名称"></el-table-column>
        <el-table-column prop="place" label="考试地点"></el-table-column>
        <el-table-column prop="price" label="总计"></el-table-column>
        <el-table-column prop="shui" label="税"></el-table-column>
        <el-table-column  label="操作" width="135" >
          <template scope="scope">
            <el-button-group>
              <el-button type="danger" @click="remove(scope.row)" size="small">删除</el-button>
              <el-button @click="open_edit(scope.row)" size="small">编辑</el-button>
            </el-button-group>

          </template>
        </el-table-column>
      </el-table>


    <el-dialog title="增加税务信息" :visible.sync="add_form.visible"
    >
      <el-form class="demo-form-inline" label-width="100px">
        <el-form-item label="监考老师">
          <el-input v-model="add_form.teacher" placeholder="输入姓名"></el-input>
        </el-form-item>

        <el-form-item label="老师身份证">
          <el-input v-model="add_form.id_card" placeholder="输入老师身份证"></el-input>
        </el-form-item>

        <el-form-item label="考试名称">
          <el-input v-model="add_form.exam" placeholder="输入考试名称"></el-input>
        </el-form-item>

        <el-form-item label="考试地点">
          <el-input v-model="add_form.place" placeholder="输入考试地点"></el-input>
        </el-form-item>


        <el-form-item label="总计">
          <el-input v-model="add_form.price" placeholder="输入price"></el-input>
        </el-form-item>


        <el-form-item label="税">
          <el-input v-model="add_form.shui" placeholder="输入税"></el-input>
        </el-form-item>
      </el-form>


        <span slot="footer" class="dialog-footer">
          <el-button @click="add_form.visible=false" size="small">取 消</el-button>
          <el-button type="primary" @click="add" size="small">确 定</el-button>
        </span>
    </el-dialog>


    <el-dialog title="编辑劳务信息" :visible.sync="edit_form.visible"
    >
      <el-form class="demo-form-inline" label-width="100px">
        <el-form-item label="监考老师">
          <el-input v-model="edit_form.teacher" placeholder="输入姓名"></el-input>
        </el-form-item>

        <el-form-item label="老师身份证">
          <el-input v-model="edit_form.id_card" placeholder="输入老师身份证"></el-input>
        </el-form-item>

        <el-form-item label="考试名称">
          <el-input v-model="edit_form.exam" placeholder="输入考试名称"></el-input>
        </el-form-item>

        <el-form-item label="考试地点">
          <el-input v-model="edit_form.place" placeholder="输入考试地点"></el-input>
        </el-form-item>


        <el-form-item label="总计">
          <el-input v-model="edit_form.price" placeholder="输入price"></el-input>
        </el-form-item>


        <el-form-item label="税">
          <el-input v-model="edit_form.shui" placeholder="输入税"></el-input>
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
  import ElButtonGroup from "../../node_modules/element-ui/packages/button/src/button-group.vue";
  var request = axios.create({
    baseURL:'http://123.56.3.23:8888'
  })

export default {
  components: {ElButtonGroup},
  name: 'work-info',
  data () {
    return {
      list:[],
      total:0,
      search:'',
      page_size:10,
      current_page:1,
      loading:false,
      add_form:{
        teacher:'',
        id_card:'',
        exam:'',
        place:'',
        price:'',
        shui:'',
        id:'',
        visible:false
      },
      edit_form:{
        teacher:'',
        id_card:'',
        exam:'',
        place:'',
        price:'',
        shui:'',
        id:'',
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
              teacher:data.teacher,
              id_card:data.id_card,
              exam:data.exam,
              place:data.place,
              price:data.price,
              shui:data.shui,
              id:data.id,
          }
      },
      async fetch(){

          var _limit = this.page_size,
              _page = this.current_page,
              search = this.search

          this.loading = true
          var response = await request.get('/func/ccc',{
              params:{
                  _limit,
                  _page,

              }
          })
          this.list = response.data.list
          this.total = response.data.total
          this.loading = false
      },
      async add(){
          var add_form = this.add_form
          delete add_form.visible
          var response = await request.post('/data/ryan/work/',add_form)
          this.fetch()
      },
      async remove(data){
        var response = await request.delete('/data/ryan/work/'+data.id)
        this.fetch()
      },
      async edit(){
        var edit_form = this.edit_form
        console.log(edit_form)
        var id = edit_form.id
        delete edit_form.id
        delete edit_form.visible
        var response = await request.patch('/data/ryan/work/'+id,edit_form)
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
.work{
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
