<template>
    <div class="app-container">       
        <h2 style="text-align: center;">发布新课程</h2>       
        <el-steps :active="2"  process-status="wait" align-center style="margin-bottom: 40px;">
            <el-step title="填写课程基本信息"/>
            <el-step title="创建课程大纲"/>
            <el-step title="提交发布"/>       
        </el-steps>      
        <el-form label-width="120px">
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
            saveBtnDisabled: false
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    watch: {

    },
    methods: {
        previous(){
            this.$router.push({ path: '/course/chapter/1' })    
        },
        next() {
            this.$router.push({ path: '/course/publish/1' })    
        }
    },
    components: {

    },
};
</script>

<style scoped lang="scss">

</style>
