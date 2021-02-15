import request from '@/utils/request'

export default{
  getSubjectListPage(current,size,teacherQuery) {
    return request({
      url: `/edu_teacher/pageTeacherCondition/${current}/${size}`,
      method: 'post',
      data: teacherQuery
    })
  },
}