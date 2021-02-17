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
                    v-model="courseInfo.subjectParentId" 
                    placeholder="一级分类" @change="firstSubjectChange">
                   <el-option
                        v-for="subject in subjectList"
                        :key="subject.id"
                        :label="subject.title"
                        :value="subject.id"/>
                </el-select>
                <el-select 
                    v-model="courseInfo.subjectId" 
                    placeholder="二级分类">
                   <el-option
                        v-for="subject in secondSubjectList"
                        :key="subject.value"
                        :label="subject.title"
                        :value="subject.id"/>
                </el-select>
                <!-- <el-cascader 
                    v-model="courseInfo.subjectId" 
                    :options="subjectList"
                    placeholder="请选择">
                </el-cascader> -->
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
            <el-form-item label="课程简介">
                <tinymce
                    v-model="courseInfo.description" 
                    placeholder=" "  />
            </el-form-item>
            <el-form-item label="课程封面">
                <el-upload    
                    :show-file-list="false"    
                    :on-success="handleAvatarSuccess"    
                    :before-upload="beforeAvatarUpload"    
                    :action="BASE_API+'/fileoss/upload'"    
                    class="avatar-uploader">    
                    <img  :src="courseInfo.cover">  
                </el-upload>
            </el-form-item> 
            <el-form-item label="课程价格">    
                <el-input-number :min="0"  v-model="courseInfo.price" controls-position="right" />
            </el-form-item>
            <el-form-item label="总课时">    
                <el-input-number :min="0"  v-model="courseInfo.lessonNum" controls-position="right"/>  
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
import tinymce from "@/components/Tinymce"

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
                cover: 'https://zyedu-bg.oss-cn-shenzhen.aliyuncs.com/pexels-photo-255441.jpg',  
                price: 0
            },
            saveBtnDisabled: false,
            teacherList:[],
            subjectList:{},
            secondSubjectList:{},
            BASE_API: process.env.VUE_APP_BASE_API, // 接口API地址
            OSS_PATH: process.env.VUE_APP_OSS_PATH, // 阿里云OSS地址

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
        },
        firstSubjectChange(id){
            //在前端进行过滤
            for (let i = 0; i < this.subjectList.length; i++) {
                if (this.subjectList[i].id === id) {
                    this.secondSubjectList = this.subjectList[i].children
                    this.courseInfo.subjectId = ''        
                }    
            }
        },
        handleAvatarSuccess(res,file){
            // console.log (res)// 上传响应  
            // console.log (URL.createObjectURL(file.raw ))// base64编码  
            this.courseInfo.cover = res.data.url
        },
        beforeAvatarUpload(file){
            const isJPG = file.type ===  'image/jpeg'  
            const isLt2M = file.size / 1024 / 1024 < 2  
            if (!isJPG) {    
                this.$message.error('上传头像图片只能是 JPG 格式!')  
            }  
            if (!isLt2M) {    
                this.$message.error('上传头像图片大小不能超过 2MB!')  
            }  
            return isJPG && isLt2M
        },
    },
    components: {
        tinymce
    },
};
</script>

<style scoped lang="scss">

</style>
