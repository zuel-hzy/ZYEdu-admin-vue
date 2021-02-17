<template>
    <div class="app-container">       
        <h2 style="text-align: center;">发布新课程</h2>       
        <el-steps :active="2"  process-status="wait" align-center style="margin-bottom: 40px;">
            <el-step title="填写课程基本信息"/>
            <el-step title="创建课程大纲"/>
            <el-step title="提交发布"/>       
        </el-steps>      
        <el-form >
            <el-form-item >
                <div class="ccInfo">
                <img :src="coursePublish.cover">
                <div class="main">
                    <h2>{{ coursePublish.title }}</h2>
                    <p class="gray"><span>共{{ coursePublish.lessonNum }}课时</span></p>
                    <p><span>所属分类：{{ coursePublish.subjectLevelOne }} — {{ coursePublish.subjectLevelTwo }}</span></p>
                    <p>课程讲师：{{ coursePublish.teacherName }}</p>
                    <h3 class="red">￥{{ coursePublish.price }}</h3>
                </div>
                </div>
            </el-form-item>
            <el-form-item>
                <el-button :disabled="saveBtnDisabled" type="nomal" @click="previous">上一步</el-button>
                <el-button :disabled="saveBtnDisabled" type="primary" @click="next">发布</el-button>
            </el-form-item>       
        </el-form>  
    </div>
</template>

<script>
import course from "@/api/edu/course"
export default {
    props: {

    },
    data() {
        return {
            courseID:"",
            saveBtnDisabled: false,
            coursePublish:{}
        };
    },
    computed: {

    },
    created() {
        if(this.$route.params && this.$route.params.id){
            this.courseId = this.$route.params.id
        }
    },
    mounted() {

    },
    watch: {

    },
    methods: {
        previous(){
            this.$router.push({ path: '/course/chapter/'+this.courseId })    
        },
        next() {
            this.$router.push({ path: '/course/publish/'+this.courseId })    
        },
        getCoursePublishById(){
            course.getCoursePublishInfo(this.courseID)
                .then(response=>{
                    this.coursePublish = response.data.coursePublish
                })
        }
    },
    components: {

    },
};
</script>

<style scoped lang="scss">

.ccInfo {
    background: #f5f5f5;
    padding: 20px;
    overflow: hidden;
    border: 1px dashed #DDD;
    margin-bottom: 40px;
    position: relative;
}
.ccInfo img {
    background: #d6d6d6;
    width: 500px;
    height: 278px;
    display: block;
    float: left;
    border: none;
}
.ccInfo .main {
    margin-left: 520px;
}

.ccInfo .main h2 {
    font-size: 28px;
    margin-bottom: 30px;
    line-height: 1;
    font-weight: normal;
}
.ccInfo .main p {
    margin-bottom: 10px;
    word-wrap: break-word;
    line-height: 24px;
    max-height: 48px;
    overflow: hidden;
}

.ccInfo .main p {
    margin-bottom: 10px;
    word-wrap: break-word;
    line-height: 24px;
    max-height: 48px;
    overflow: hidden;
}
.ccInfo .main h3 {
    left: 540px;
    bottom: 20px;
    line-height: 1;
    font-size: 28px;
    color: #d32f24;
    font-weight: normal;
    position: absolute;
}
</style>
