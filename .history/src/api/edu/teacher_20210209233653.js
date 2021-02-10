import request from '@/utils/request'

export default{
  getTeacherListPage(current,size,teacherQuery) {
    return request({
      url: `/edu_teacher/pageTeacherCondition/${current}/${size}`,
      method: 'post',
      data: teacherQuery
    })
  },
  deleteTeacherById(id) {       
    return request({
      url: `/edu_teacher/${id}`,
      method: 'delete'    
    })
  }
}