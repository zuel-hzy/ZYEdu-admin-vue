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
                    console.log(response)
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
