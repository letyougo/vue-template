<template>
  <div class="teacher">
    <h5>   总计{{total}}条数据</h5>



    <el-form :inline="true" class="demo-form-inline" :loading="loading">
      <el-form-item>

      </el-form-item>

      <el-form-item label="姓名">
        <el-input v-model="search" placeholder="输入姓名查询"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button-group>
          <el-button type="primary" @click="fetch">查询</el-button>
          <el-button  @click="add_form.visible=true">增加老师</el-button>
          <el-button  @click="muti_idcard.visible=true">批量上传身份证</el-button>
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
        <el-table-column prop="name" label="名字"></el-table-column>
        <el-table-column prop="idcard"  label="身份证"></el-table-column>
        <el-table-column prop="location"  label="住址"></el-table-column>
        <el-table-column prop="province" label="籍贯"></el-table-column>
        <el-table-column prop="sex"  label="性别"></el-table-column>

        <el-table-column  label="操作" width="135" >
          <template scope="scope">
            <el-button-group>
              <el-button type="danger" @click="remove(scope.row)" size="small">删除</el-button>
              <el-button @click="open_edit(scope.row)" size="small">编辑</el-button>
            </el-button-group>

          </template>
        </el-table-column>
      </el-table>


    <el-dialog title="增加老师信息" :visible.sync="add_form.visible"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form class="demo-form-inline" label-width="60px">
            <el-form-item label="姓名">
              <el-input v-model="add_form.name" placeholder="输入姓名"></el-input>
            </el-form-item>

            <el-form-item label="年龄">
              <el-input v-model="add_form.idcard" placeholder="身份证"></el-input>
            </el-form-item>

            <el-form-item label="性别">
              <el-input v-model="add_form.location" placeholder="输入地址"></el-input>
            </el-form-item>

            <el-form-item label="电话">
              <el-input v-model="add_form.sex" placeholder="输入性别"></el-input>
            </el-form-item>

            <el-form-item label="籍贯">
              <el-input v-model="add_form.province" placeholder="输入籍贯"></el-input>
            </el-form-item>




          </el-form>

        </el-col>
        <el-col :span="12">

          <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :auto-upload="false"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
          <el-button @click="add_form.visible=false" size="small">取 消</el-button>
          <el-button type="primary" @click="add" size="small">确 定</el-button>
        </span>

    </el-dialog>

    <el-dialog title="批量上传身份证" :visible=" muti_idcard.visible ">

      <el-upload
        class="upload-demo"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :auto-upload="false"
        style="width: 100%"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>

      <span slot="footer" class="dialog-footer">
          <el-button @click="muti_idcard.visible=false">取 消</el-button>
          <el-button type="primary" @click="edit">确 定</el-button>
        </span>
    </el-dialog>


    <el-dialog title="编辑老师信息" :visible.sync="edit_form.visible"
    >
      <el-form class="demo-form-inline"  label-width="100px">

        <el-form-item label="姓名">
          <el-input v-model="edit_form.name" placeholder="输入姓名"></el-input>
        </el-form-item>

        <el-form-item label="年龄">
          <el-input v-model="edit_form.idcard" placeholder="身份证"></el-input>
        </el-form-item>

        <el-form-item label="性别">
          <el-input v-model="edit_form.location" placeholder="输入地址"></el-input>
        </el-form-item>

        <el-form-item label="电话">
          <el-input v-model="edit_form.sex" placeholder="输入性别"></el-input>
        </el-form-item>

        <el-form-item label="籍贯">
          <el-input v-model="edit_form.province" placeholder="输入籍贯"></el-input>
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
  import ElDialog from "../../node_modules/element-ui/packages/dialog/src/component.vue";
  var request = axios.create({
    baseURL:'http://localhost:8000'
  })

export default {
  components: {
    ElDialog,
    ElButtonGroup},
  name: 'teacher-info',
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
        idcard:'',
        location:'',
        province:'',
        sex:'',
        visible:false
      },
      edit_form:{
        name:'',
        idcard:'',
        location:'',
        province:'',
        sex:'',
        visible:false
      },
      muti_idcard:{
        visible:false
      },
      fileList:[]
    }
  },

  watch:{
      current_page(){
          this.fetch()
      }
  },

  methods:{
    handlePreview(){},
    handleRemove(){},
    submitUpload(){},
      change_page(p){
          console.log(p)
      },
      open_edit(data){
          console.log(data)
          data.visible = true
          this.edit_form = {
              visible:true,
              name:data.name,
              idcard:data.idcard,
              location:data.location,
              province:data.province,
              sex:data.sex,

          }
      },
      async fetch(){

          var _limit = this.page_size,
              _page = this.current_page,
              search = this.search

          this.loading = true
          var response = await request.get('/api/school_client/teacher/',{
              params:{
                  _limit,
                  _page,
                  name_like:search
              }
          })
          this.list = response.data.objects
          this.total = response.data.total
          this.loading = false
      },
      async add(){
          var add_form = this.add_form
          delete add_form.visible
          var response = await request.post('/data/ryan/teacher/',add_form)
          this.fetch()
      },
      async remove(data){
        var response = await request.delete('/data/ryan/teacher/'+data.id)
        this.fetch()
      },
      async edit(){
        var edit_form = this.edit_form
        console.log(edit_form)
        var id = edit_form.id
        delete edit_form.id
        delete edit_form.visible
        var response = await request.patch('/data/ryan/teacher/'+id,edit_form)
        this.fetch()
      }
  },
  mounted(){
      this.fetch()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
h1, h2 {
  font-weight: normal;
}
.teacher{
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

  .el-upload-dragger,.el-upload{
    display: block;
    width: 100%;
  }
</style>
