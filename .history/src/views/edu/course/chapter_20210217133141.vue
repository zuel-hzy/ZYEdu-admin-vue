<template>
    <div class="app-container">       
        <h2 style="text-align: center;">发布新课程</h2>       
        <el-steps :active="2"  process-status="wait" align-center style="margin-bottom: 40px;">
            <el-step title="填写课程基本信息"/>
            <el-step title="创建课程大纲"/>
            <el-step title="提交发布"/>       
        </el-steps>
        <el-form label-width="120px">
            <el-form-item>
                <el-button>新增章节</el-button>
            </el-form-item>
            <el-form-item>
                <ul class="chapterList">
                    <li 
                        v-for="chapter in chapterVideoList" 
                        :key="chapter.id">
                        <P>{{chapter.title}}</P>
                        <ul class="chapterList videoList">
                            <li 
                                v-for="video in chapter.children" 
                                :key="video.id">
                                <P>{{video.title}}</P>
                            </li>
                        </ul>
                    </li>
                </ul>
            </el-form-item>
            <el-form-item>
                <el-button :disabled="saveBtnDisabled" type="nomal" @click="previous">上一步</el-button>
                <el-button :disabled="saveBtnDisabled" type="primary" @click="next">下一步</el-button>
            </el-form-item>       
        </el-form>  

        <!-- 添加和修改章节表单 -->
    <el-dialog :visible.sync="dialogChapterFormVisible" title="添加章节">
        <el-form :model="chapter" label-width="120px">
            <el-form-item label="章节标题">
                <el-input v-model="chapter.title"/>
            </el-form-item>
            <el-form-item label="章节排序">
                <el-input-number v-model="chapter.sort" :min="0" controls-position="right"/>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogChapterFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
        </div>
    </el-dialog>

    </div>
</template>

<script>
import course from "@/api/edu/course"
import chapter from "@/api/edu/chapter"
export default {
    props: {

    },
    data() {
        return {
            saveBtnDisabled: false,
            chapterVideoList:[],
            courseID:"",
            dialogChapterFormVisible:""
        }
    },
    computed: {

    },
    created() {
        if(this.$route.params && this.$route.params.id){
            this.courseID = this.$route.params.id
            console.log(this.courseID)
            this.getChapterVideo(this.courseID)
        }
        
    },
    mounted() {

    },
    watch: {

    },
    methods: {
        previous(){
            this.$router.push({ path: '/course/info/'+this.courseID })    
        },
        next() {
            this.$router.push({ path: '/course/publish/'+this.courseID })    
        },
        getChapterVideo(id){
            chapter.getChapterVideo(id)
                .then(response=>{
                    this.chapterVideoList = response.data.chapterVideo
                    console.log(this.chapterVideoList)
                })
        }
    },
    components: {

    },
};
</script>

<style scoped lang="scss">
// TODO:样式美化，参考mooc
.chapterList{    
    position: relative;    
    list-style: none;    
    margin: 0;    
    padding: 0;
}
.chapterList li{
    position: relative;
}
.chapterList p{  
    float: left;  
    font-size: 20px;  
    margin: 10px 0;  
    padding: 10px;  
    height: 70px;  
    line-height: 50px;  
    width: 100%;  
    border: 1px solid #DDD;
}
.chapterList .acts {    
    float: right;    
    font-size: 14px;
}
.videoList{  
    padding-left: 50px;
}
.videoList p{  
    float: left;  
    font-size: 14px; 
    margin: 10px 0;  
    padding: 10px;  
    height: 50px;  
    line-height: 30px;  
    width: 100%;  
    border: 1px dotted #DDD;
}
</style>
