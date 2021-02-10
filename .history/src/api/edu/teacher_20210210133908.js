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
  },
  addTeacher(teacher) {       
    return request({
      url: `/edu_teacher/addTeacher`,
      method: 'post',
      data:teacher   
    })
  },
  getTeacherById(id) {       
    return request({
      url: `/edu_teacher/getTeacher/${id}`,
      method: 'get'
    })
  },
  updatetTeacher() {       
    return request({
      url: `/edu_teacher/updateTeacher`,
      method: 'put',
      data:teacher  
    })
  },
}