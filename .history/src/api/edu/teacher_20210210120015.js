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
    console.log("111")   
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
  }
}