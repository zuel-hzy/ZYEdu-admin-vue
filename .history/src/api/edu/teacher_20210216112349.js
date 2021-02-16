import request from '@/utils/request'

export default{
  getTeacherListPage(current,size,teacherQuery) {
    return request({
      url: `/edu/edu_teacher/pageTeacherCondition/${current}/${size}`,
      method: 'post',
      data: teacherQuery
    })
  },
  deleteTeacherById(id) {       
    return request({
      url: `/edu/edu_teacher/${id}`,
      method: 'delete'    
    })
  },
  addTeacher(teacher) {       
    return request({
      url: `/edu/edu_teacher/addTeacher`,
      method: 'post',
      data:teacher   
    })
  },
  getTeacherById(id) {       
    return request({
      url: `/edu/edu_teacher/getTeacher/${id}`,
      method: 'get'
    })
  },
  updatetTeacher(teacher) {       
    return request({
      url: `/edu/edu_teacher/updateTeacher`,
      method: 'post',
      data:teacher  
    })
  },
}