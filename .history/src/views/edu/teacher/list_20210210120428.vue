<template>
    <div style="margin: 20px 20px">
        <!--查询表单-->
        <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
            <el-form-item label="教师名">
                <el-input v-model="teacherQuery.name" placeholder="教师名"/>
            </el-form-item>
            <el-form-item label="教师头衔">
                <el-select v-model="teacherQuery.level" clearable placeholder="教师头衔">
                    <el-option :value="1"  label="高级教师"/>
                    <el-option :value="2"  label="首席教师"/>
                </el-select>
            </el-form-item>
            <el-form-item label="开始时间">
                <el-date-picker
                    v-model="teacherQuery.begin"
                    type="datetime"
                    placeholder="选择开始时间"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    default-time="00:00:00"/>
            </el-form-item>
            <el-form-item label="截止时间">
                <el-date-picker
                    v-model="teacherQuery.end"
                    type="datetime"
                    placeholder="选择截止时间"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    default-time="00:00:00"/>
            </el-form-item>
            <el-button type="primary" size="small" icon="el-icon-search" @click="getList()">查询</el-button>
            <el-button type="default" size="small" @click="resetData()">清空</el-button>
        </el-form>
        <!-- 表格 -->       
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
                <!-- <template slot-scope="scope">          
                    {{ (page - 1) * limit + scope.$index + 1 }}
                </template> -->
            </el-table-column>
            <el-table-column prop="name" label="名称" width="80" />
            <el-table-column label="头衔" width="80">
                <template slot-scope="scope">          
                    {{ scope.row.level===1?'高级讲师':'首席讲师' }}
                </template>
            </el-table-column><el-table-column prop="intro" label="资历" />
            <el-table-column prop="gmtCreate" label="添加时间" width="160"/>
            <el-table-column prop="sort" label="排序" width="60" />
            <el-table-column label="操作" width="200" align="center">
                <template slot-scope="scope">
                    <router-link :to ="'/edu/teacher/edit/'+scope.row.id">
                        <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
                    </router-link>
                    <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row)">删除</el-button>
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
import teacherApi from '@/api/edu/teacher'
export default {
    props: {

    },
    data() {
        return {
            page:1,
            size:10,
            total:0,
            teacherQuery:{},
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
        // 教师列表
        getList(page = 1){
            this.page = page
            teacherApi.getTeacherListPage(this.page,this.size,this.teacherQuery)
                .then(response => {
                    this.list = response.data.rows
                    this.total = response.data.total
                    console.log(this.list)
                    console.log(this.total)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        onSubmit() {
            console.log('submit!');
        },
        resetData() {       
            this.teacherQuery = {}       
            this.getList()
        },
        removeDataById(id){
            this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                teacherApi.deleteTeacherById(id)
                .then(response => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                    this.getList()
                })
                .catch(error => {
                    console.log(error)
                })
            })
            console.log(id)
        }
    },
    components: {

    },
};
</script>

<style scoped lang="scss">

</style>
