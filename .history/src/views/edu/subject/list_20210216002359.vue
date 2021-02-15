<template>
    <div class="app-container">
    <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />

    <el-tree
      ref="tree2"
      :data="data2"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all
    />

  </div>
</template>

<script>
import subject from "@/api/edu/subject"
export default {
    props: {

    },
    data() {
        return {
            filterText: '',
            data2: [],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        };
    },
    computed: {

    },
    created() {
        thisgetSubject()
    },
    mounted() {

    },
    watch: {
        filterText(val) {
            this.$refs.tree2.filter(val)
        }
    },
    methods: {
        filterNode(value, data) {
            if (!value) return true
            return data.label.indexOf(value) !== -1
        },
        getSubject(){
            subject.getSubjectListPage()
                .then(response=>{
                    response.data.list = this.data2;
                })
        }
    },
    components: {

    },
};
</script>

<style scoped lang="scss">

</style>
