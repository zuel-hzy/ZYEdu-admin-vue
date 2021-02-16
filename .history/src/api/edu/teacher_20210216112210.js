import request from '@/utils/request'

export default{
  getTeacherListPage(current,size,teacherQuery) {
    return request({
      url: `/edu/pageTeacherCondition/${current}/${size}`,
      method: 'post',
      data: teacherQuery
    })
  },
  deleteTeacherById(id) {       
    return request({
      url: `/edu/${id}`,
      method: 'delete'    
    })
  },
  addTeacher(teacher) {       
    return request({
      url: `/edu/addTeacher`,
      method: 'post',
      data:teacher   
    })
  },
  getTeacherById(id) {       
    return request({
      url: `/edur/getTeacher/${id}`,
      method: 'get'
    })
  },
  updatetTeacher(teacher) {       
    return request({
      url: `/edu/updateTeacher`,
      method: 'post',
      data:teacher  
    })
  },
}