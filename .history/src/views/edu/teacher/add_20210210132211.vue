<template>
    <div>
        <div class="app-container">  
            <!-- //TODO 表单验证            -->
            <el-form label-width="100px">
                <el-form-item label="教师名称">
                    <el-input v-model="teacher.name"/>
                </el-form-item>
                <el-form-item label="教师排序">
                    <el-input-number v-model="teacher.sort" controls-position="right" min="1" />
                </el-form-item>
                <el-form-item label="教师头衔">
                    <el-select v-model="teacher.level" clearable placeholder="请选择">
                        <el-option :value="1"  label="高级教师"/>
                        <el-option :value="2"  label="首席教师"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="教师资历">
                    <el-input v-model="teacher.career"/>
                </el-form-item>
                <el-form-item label="教师简介">
                    <el-input v-model="teacher.intro" :rows="10" type="textarea"/>
                </el-form-item>
                <!-- //TODO:头像 -->
                <el-form-item>
                    <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
                </el-form-item>       
            </el-form>
        </div>
    </div>
</template>

<script>
import teacherApi from '@/api/edu/teacher'
export default {
    props: {

    },
    data() {
        return {
            teacher:{
                name: '',
                sort: 0,
                level: 1,
                career: '',
                intro: '',
                avatar: ''
            },
            saveBtnDisabled: false
        };
    },
    computed: {

    },
    created() {
        if (this.$route.params && this.$route.params.id){
            const id = this.$route.params.id
            console.log(id)
            this.getTeacher(id)
        }
    },
    mounted() {

    },
    watch: {

    },
    methods: {
        getTeacher(id){
            teacherApi.getTeacherById(id)
                .then(response=>{
                    this.teacher = response.data.teacher
                })
        },
        saveOrUpdate(){
            this.saveTeacher()
        },
        saveTeacher(){
            teacherApi.addTeacher(this.teacher)
                .then(response=>{
                    this.$message({
                        type: 'success',
                        message: '添加成功!'
                    })
                    this.$router.push({path:'/teacher/table'})
                })
        }
    },
    components: {

    },
};
</script>

<style scoped lang="scss">

</style>
