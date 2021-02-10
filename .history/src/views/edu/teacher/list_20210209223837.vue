<template>
    <div>
        教师列表
    </div>
</template>

<script>
import teacher from '@/api/edu/teacher'
export default {
    props: {

    },
    data() {
        return {
            page:1,
            size:10,
            total:0,
            teacherQuery:{},
            list:null
        };
    },
    computed: {

    },
    created() {
        this.getList()
    },
    mounted() {

    },
    watch: {

    },
    methods: {
        // 教师列表
        getList(){
            teacher.getTeacherListPage(this.page,this.size,this.teacherQuery0)
                .then(response => {
                    this.list = response.data.rows
                    this.total = response.data.total
                    console.log(list)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    },
    components: {

    },
};
</script>

<style scoped lang="scss">

</style>
