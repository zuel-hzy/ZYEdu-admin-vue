<template>
    <div class="app-container">       
        <h2 style="text-align: center;">发布新课程</h2>       
        <el-steps :active="1"  process-status="wait" align-center style="margin-bottom: 40px;">
            <el-step title="填写课程基本信息"/>
            <el-step title="创建课程大纲"/>
            <el-step title="提交发布"/>       
        </el-steps>      
        <el-form label-width="120px">
            <el-form-item label="课程标题">
                <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课"  />
            </el-form-item>
            <el-form-item label="课程分类">
                <el-select 
                    v-model="courseInfo.teacherId" 
                    placeholder="一级分类">
                   <el-option
                        v-for="subject in subjectList"
                        :key="subject.id"
                        :label="subject.title"
                        :value="subject.id"/>
                </el-select>
                <el-cascader 
                    v-model="courseInfo.subjectId" 
                    :options="subjectList"
                    :label="subject.title"
                    :value="subject.id"
                    placeholder="请选择">
                </el-cascader>
            </el-form-item>    
                <!-- 课程讲师 TODO: -->
            <el-form-item label="课程简介">
                <el-input v-model="courseInfo.description" placeholder=" "  />
            </el-form-item>
            <el-form-item label="总课时">    
                <el-input-number :min="0"  v-model="courseInfo.lessonNum" controls-position="right"/>  
            </el-form-item>
            <!-- 课程封面 TODO: -->
            <el-form-item label="课程价格">    
                <el-input-number :min="0"  v-model="courseInfo.price" controls-position="right" />
            </el-form-item>
            <el-form-item label="课程教师">
                <el-select 
                    v-model="courseInfo.teacherId" 
                    placeholder="请选择">
                   <el-option
                        v-for="teacher in teacherList"
                        :key="teacher.id"
                        :label="teacher.name"
                        :value="teacher.id"/>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button :disabled="saveBtnDisabled" type="primary" @click="next">保存并下一步</el-button>
            </el-form-item>       
        </el-form>  
    </div>
</template>

<script>
import course from "@/api/edu/course"
import subject from "@/api/edu/subject"
export default {
    props: {

    },
    data() {
        return {
            courseInfo: {
                title: '',  
                subjectId: '',  
                subjectParentId:'',
                teacherId: '',  
                lessonNum: 0,  
                description: '',  
                cover: '',  
                price: 0
            },
            saveBtnDisabled: false,
            teacherList:[],
            subjectList:{}
        };
    },
    computed: {

    },
    created() {
        this.getTeacherList()
        this.getSubject()
    },
    mounted() {

    },
    watch: {

    },
    methods: {
        // TODO: 课程添加逻辑优化(缓存添加,但是不保存没有课程id)
        next() {
            course.addCourseInfo(this.courseInfo)
                .then(response=>{
                    this.$message({
                        type: 'success',
                        message: "添加课程信息成功"
                    })
                    this.$router.push({ path: '/course/chapter/'+response.data.courseId })    
                })
            
        },
        getTeacherList(){
            course.getTeacherList()
                .then(response=>{
                    this.teacherList = response.data.items
                })
        },
        getSubject(){
            subject.getSubjectListPage()
                .then(response=>{
                    this.subjectList = response.data.list;
                })
        }
    },
    components: {

    },
};
</script>

<style scoped lang="scss">

</style>
