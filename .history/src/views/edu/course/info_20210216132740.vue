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
                <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视"  />
                <!-- 所属分类 TODO -->
                <!-- 课程讲师 TODO -->
            <el-form-item label="总课时">    
                <el-input-number :min="0"  v-model="courseInfo.lessonNum" controls-position="right" placeholder="课时数"/>  
            </el-form-item>
            <el-form-item label="课程价格">    
                <el-input-number :min="0"  v-model="courseInfo.price" controls-position="right" placeholder="课程价格" />
            </el-form-item>
            </el-form-item>
            <el-form-item>
                <el-button :disabled="saveBtnDisabled" type="primary" @click="next">保存并下一步</el-button>
            </el-form-item>       
        </el-form>  
    </div>
</template>

<script>
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
        next() {
            console.log ('next')
            this.$router.push({ path: '/course/chapter/1' })    
        }
    },
    components: {

    },
};
</script>

<style scoped lang="scss">

</style>
