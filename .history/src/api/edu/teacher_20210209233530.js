import request from '@/utils/request'

export default{
  getTeacherListPage(current,size,teacherQuery) {
    return request({
      url: `/edu_teacher/pageTeacherCondition/${current}/${size}`,
      method: 'post',
      data: teacherQuery
    })
  },
  removeById(teacherId) {       
    return request({url: `${api_name}/${teacherId}`,
    method: 'delete'    })
  }
}