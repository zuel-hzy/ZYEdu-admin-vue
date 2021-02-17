<template>
    <div style="margin: 20px 20px">
        <!--查询表单-->
        <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
            <el-form-item label="课程名称">
                <el-input v-model="courseQuery.name" placeholder="课程名称"/>
            </el-form-item>
            <el-form-item label="课程状态">
                <el-select v-model="courseQuery.status" clearable placeholder="课程状态">
                    <el-option :value="Normal"  label="已发布"/>
                    <el-option :value="Draft"  label="未发布"/>
                </el-select>
            </el-form-item>
            <el-button type="primary" size="small" icon="el-icon-search" @click="getList()">查询</el-button>
            <el-button type="default" size="small" @click="resetData()">清空</el-button>
        </el-form>
        <!-- 表格 --> 
        <!-- //TODO 表单验证、样式       -->
        <el-table
            v-loading="listLoading"
            :data="list"
            element-loading-text="数据加载中"
            border
            stripe
            fit
            highlight-current-row>
            <el-table-column
                type="index"
                label="序号"
                width="70"
                align="center">
            </el-table-column>
            <el-table-column prop="title" label="课程名称" width="200" />
            <el-table-column label="课程状态" width="80">
                <template slot-scope="scope">          
                    {{ scope.row.status==="Normal"?'已发布':'未发布' }}
                </template>
            </el-table-column>
            <el-table-column prop="lessonNum" label="课时数" width="80"/>
            <el-table-column prop="gmtCreate" label="添加时间" width="160"/>
            <el-table-column prop="viewCount" label="浏览数量" width="60" />
            <el-table-column label="操作"  align="center" width="500">
                <template slot-scope="scope">
                    <router-link :to ="'/course/info/'+scope.row.id">
                        <el-button type="primary" size="mini" icon="el-icon-edit">编辑基本信息</el-button>
                    </router-link>
                    <router-link :to ="'/course/chapter/'+scope.row.id">
                        <el-button type="primary" size="mini" icon="el-icon-edit">编辑大纲信息</el-button>
                    </router-link>
                    <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>       
        </el-table>
        <el-pagination
            :current-page="page"
            :page-size="size"
            :total="total"
            style="padding: 30px 0; text-align: center;"
            layout="total, prev, pager, next, jumper"
            @current-change="getList"
        />      
    </div>
</template>

<script>
import course from "@/api/edu/course"
export default {
    props: {

    },
    data() {
        return {
            page:1,
            size:10,
            total:0,
            courseQuery:{},
            list:null
        };
    },
    computed: {

    },
    created() {
        this.getList()
    },
    mounted() {

    },
    watch: {

    },
    methods: {
        getList(page = 1){
            this.page = page
            course.getCourseList(this.page,this.size,this.courseQuery)
                .then(response => {
                    this.list = response.data.list
                })
                .catch(error => {
                    console.log(error)
                })
        },
        resetData() {       
            this.courseQuery = {}       
            this.getList()
        },
        removeDataById(id){
            this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                course.deleteCourseById(id)
                .then(()=>{
                    this.$message({
                        type: 'success',
                        message: "课程删除成功"
                    })
                    this.getList()
                })
            })
            
        }
    },
    components: {

    },
};
</script>

<style scoped lang="scss">

</style>
