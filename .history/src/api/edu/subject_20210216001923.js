import request from '@/utils/request'

export default{
  getSubjectListPage() {
    return request({
      url: `/edu_teacher/pageTeacherCondition/${current}/${size}`,
      method: 'post',
      data: teacherQuery
    })
  },
}