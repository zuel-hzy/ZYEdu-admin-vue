<template>
    <div class="app-container">       
        <h2 style="text-align: center;">发布新课程</h2>       
        <el-steps :active="2"  process-status="wait" align-center style="margin-bottom: 40px;">
            <el-step title="填写课程基本信息"/>
            <el-step title="创建课程大纲"/>
            <el-step title="提交发布"/>       
        </el-steps>
        <el-form>
            <el-form-item>
                <el-button type="primary" @click="openChapterDialog">新增章节</el-button>
            </el-form-item>
            <!-- TODO:拖拽排序 -->
            <el-form-item>
                <ul class="chapterList">
                    <li 
                        v-for="chapter in chapterVideoList" 
                        :key="chapter.id">
                        <P>
                            {{chapter.title}}
                            <span class="acts">
                                <el-button type="text" @click="openVideoEditor(chapter.id)">添加小节</el-button>
                                <el-button type="text" @click="openChapterEditor(chapter.id)">编辑</el-button>
                                <el-button type="text" @click="removeChapter(chapter.id)">删除</el-button>
                            </span>
                        </P>
                        <ul class="chapterList videoList">
                            <li 
                                v-for="video in chapter.children" 
                                :key="video.id">
                                <P>
                                    {{video.title}}
                                </P>
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
            <el-button type="primary" @click="saveOrUpdateChapter">确 定</el-button>
        </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogVideoFormVisible" title="添加课时">
    <el-form :model="video" label-width="120px">
        <el-form-item label="课时标题">
            <el-input v-model="video.title"/>
        </el-form-item>
        <el-form-item label="课时排序">
            <el-input-number v-model="video.sort" :min="0" controls-position="right"/>
        </el-form-item>
        <el-form-item label="是否免费">
            <el-radio-group v-model="video.free">
                <el-radio :label="true">免费</el-radio>
                <el-radio :label="false">付费</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="上传视频">
            <el-upload
                :on-success="handleVodUploadSuccess"
                :on-remove="handleVodRemove"
                :before-remove="beforeVodRemove"
                :on-exceed="handleUploadExceed"
                :file-list="fileList"
                :action="BASE_API+'/eduvod/video/uploadAlyiVideo'"
                :limit="1"
                class="upload-demo">
            <el-button size="small" type="primary">上传视频</el-button>
            <el-tooltip placement="right-end">
                <div slot="content">最大支持1G，<br>
                    支持3GP、ASF、AVI、DAT、DV、FLV、F4V、<br>
                    GIF、M2T、M4V、MJ2、MJPEG、MKV、MOV、MP4、<br>
                    MPE、MPG、MPEG、MTS、OGG、QT、RM、RMVB、<br>
                    SWF、TS、VOB、WMV、WEBM 等视频格式上传</div>
                <i class="el-icon-question"/>
            </el-tooltip>
            </el-upload>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVideoFormVisible = false">取 消</el-button>
        <el-button :disabled="saveVideoBtnDisabled" type="primary" @click="saveOrUpdateVideo">确 定</el-button>
    </div>
    </el-dialog>
    </div>
</template>

<script>
import chapter from "@/api/edu/chapter"
export default {
    props: {

    },
    data() {
        return {
            saveBtnDisabled: false,
            chapterVideoList:[],
            courseID:"",
            dialogChapterFormVisible:false,
            //TODO:判断是否为空
            chapter:{
                title:"",
                sort:""
            },
            dialogVideoFormVisible:false,
            video:{
                title: '',
                sort: 0,
                free: 0,
                videoSourceId: '',
                videoOriginalName:''//视频名称
            }
        }
    },
    computed: {

    },
    created() {
        if(this.$route.params && this.$route.params.id){
            this.courseID = this.$route.params.id
            this.getChapterVideo(this.courseID)
        }
        
    },
    mounted() {

    },
    watch: {

    },
    methods: {
        //======================================== 章节
        saveChapter(){
            this.chapter.courseId = this.courseID
            chapter.addChapter(this.chapter)
                .then(response=>{
                    this.dialogChapterFormVisible=false
                    this.$message({
                        type: 'success',
                        message: "添加章节信息成功"
                    })
                    this.getChapterVideo(this.courseID)
                    this.cleanDialog()
                })
        },
        updateChapter(){
            chapter.updateChapter(this.chapter)
                .then(response=>{
                    this.$message({
                        type: 'success',
                        message: "修改章节信息成功"
                    })
                    this.dialogChapterFormVisible = false
                    this.getChapterVideo(this.courseID)
                    this.cleanDialog()
                })
        },
        saveOrUpdateChapter() {
            if(this.chapter.id){
                console.log("修改")
                this.updateChapter()
            }else{
                console.log("保存")
                this.saveChapter()
            }
            
        },
        cleanDialog(){
            this.chapter.title = ""
            this.chapter.sort = ""
        },
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
                    // console.log(this.chapterVideoList)
                })
        },
        openChapterDialog() {
            //弹框
            this.dialogChapterFormVisible = true
        },
        openChapterEditor(chapterId){
            this.dialogChapterFormVisible = true
            chapter.getChapterById(chapterId)
                .then(response=>{
                    // console.log(response)
                    this.chapter = response.data.chapter
                })
        },
        removeChapter(chapterId){
            this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                chapter.deleteChapter(chapterId)
                .then(response=>{
                    this.getChapterVideo(this.courseID)
                })
            })
            
        },

        //=================================小节
        openVideoEditor() {
            //弹框
            this.dialogVideoFormVisible = true
            this.video.chapterId = chapterId
        },
        saveVideo(){
            this.chapter.courseId = this.courseID
            chapter.addChapter(this.chapter)
                .then(response=>{
                    this.dialogChapterFormVisible=false
                    this.$message({
                        type: 'success',
                        message: "添加章节信息成功"
                    })
                    this.getChapterVideo(this.courseID)
                    this.cleanDialog()
                })
        },
        updateVideo(){
            chapter.updateChapter(this.chapter)
                .then(response=>{
                    this.$message({
                        type: 'success',
                        message: "修改章节信息成功"
                    })
                    this.dialogChapterFormVisible = false
                    this.getChapterVideo(this.courseID)
                    this.cleanDialog()
                })
        },
        saveOrUpdateVideo() {
            if(this.video.id){
                console.log("修改")
                this.updateChapter()
            }else{
                console.log("保存")
                this.saveChapter()
            }
            
        },
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
