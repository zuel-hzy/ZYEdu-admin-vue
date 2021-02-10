<template>
    <div>
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
            <!-- @current-change="fetchData" -->
        />      
    </div>
</template>

<script>
import teacher from '@/api/edu/teacher'
export default {
    props: {

    },
    data() {
        return {
            page:1,
            size:4,
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
            teacher.getTeacherListPage(this.page,this.size,this.teacherQuery0)
                .then(response => {
                    this.list = response.data.rows
                    this.total = response.data.total
                    console.log(this.list)
                    console.log(this.total)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    },
    components: {

    },
};
</script>

<style scoped lang="scss">

</style>
