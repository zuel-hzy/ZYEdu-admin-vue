<template>
    <div>
        <div class="app-container">       
            <el-form label-width="100px">
                <el-form-item label="讲师名称">
                    <el-input v-model="teacher.name"/>
                </el-form-item>
                <el-form-item label="讲师排序">
                    <el-input-number v-model="teacher.sort" controls-position="right" min="0" />
                </el-form-item>
                <el-form-item label="讲师头衔">
                    <el-select v-model="teacher.level" clearable placeholder="请选择">
                        <el-option :value="1"  label="高级讲师"/>
                        <el-option :value="2"  label="首席讲师"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="讲师资历">
                    <el-input v-model="teacher.career"/>
                </el-form-item>
                <el-form-item label="讲师简介">
                    <el-input v-model="teacher.intro" :rows="10" type="textarea"/>
                </el-form-item>
                <!-- 讲师头像：TODO -->
                <el-form-item>
                    <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
                </el-form-item>       
            </el-form>
        </div>
    </div>
</template>

<script>
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

    },
    mounted() {

    },
    watch: {

    },
    methods: {
        saveOrUpdate(){
            this.saveTeacher()
        },
        saveTeacher(){
            
        }
    },
    components: {

    },
};
</script>

<style scoped lang="scss">

</style>
