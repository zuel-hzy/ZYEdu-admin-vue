<template>
    <div>
        <div class="app-container">  
            <!-- //TODO 表单验证            -->
            <el-form label-width="100px">
                <el-form-item label="教师头像">
                    <pan-thumb :image="teacher.avatar"/>      
                        <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">
                            更换头像       
                        </el-button>
                    <image-cropper
                        v-show="imagecropperShow"
                        :width="300"
                        :height="300"
                        :key="imagecropperKey"
                        :url="BASE_API+'/fileoss/upload'"
                        field="file"
                        @close="close"
                        @crop-upload-success="cropSuccess"/>
                </el-form-item>
                <el-form-item label="教师名称">
                    <el-input v-model="teacher.name"/>
                </el-form-item>
                <el-form-item label="教师排序">
                    <el-input-number v-model="teacher.sort" controls-position="right" />
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
                <el-form-item>
                    <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
                </el-form-item>       
            </el-form>
        </div>
    </div>
</template>

<script>
import teacherApi from '@/api/edu/teacher'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
export default {
    props: {

    },
    components:{ImageCropper,PanThumb},
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
            imagecropperShow:false,
            imagecropperKey:0,
            BASE_API:process.env.BASE_API,
            saveBtnDisabled: false
        };
    },
    computed: {

    },
    created() {
        this.init()
    },
    mounted() {

    },
    watch: {
        //监听路由变化
        $$route(to,from){
            this.init()
        }
    },
    methods: {
        init(){
            if (this.$route.params && this.$route.params.id){
                const id = this.$route.params.id
                this.getTeacher(id)
            }else{
                this.teacher = {...defaultForm}
            }
        },
        getTeacher(id){
            teacherApi.getTeacherById(id)
                .then(response=>{
                    this.teacher = response.data.teacher
                    // console.log(response)
                })
        },
        saveOrUpdate(){
            if(!this.teacher.id){
                this.saveTeacher()
            }else{
                this.updateTeacher()
            }
            
        },
        updateTeacher(){
            console.log("update...")
             teacherApi.updatetTeacher(this.teacher)
                .then(response=>{
                    this.$message({
                        type: 'success',
                        message: '添加成功!'
                    })
                    this.$router.push({path:'/teacher/table'})
                })
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
        },
        close(){
            this.imagecropperShow = false
        },
        cropSuccess(data){
            this.imagecropperShow = false
            this.teacher.avatar = data.url
        }
    }
};
</script>

<style scoped lang="scss">

</style>
