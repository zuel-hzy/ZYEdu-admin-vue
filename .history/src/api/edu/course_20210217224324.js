import request from '@/utils/request'

export default{
  addCourseInfo(courseInfo) {
    return request({
        url: `/edu/edu-course/addCourseInfo`,
        method: 'post',
        data:courseInfo
    })
  },
  getTeacherList() {
    return request({
      url: `/edu/edu_teacher/findAll`,
      method: 'get'
    })
  },
  getCourseInfo(id) {
    return request({
        url: `/edu/edu-course/getCourseInfo/${id}`,
        method: 'get',
    })
  },
  updateCourseInfo(courseInfo) {
    return request({
        url: `/edu/edu-course/updateCourseInfo`,
        method: 'post',
        data:courseInfo
    })
  },
  getCoursePublishInfo(id) {
    return request({
        url: `/edu/edu-course/getCoursePublishInfo/${id}`,
        method: 'get'
    })
  },
  publishCourse(id) {
    return request({
        url: `/edu/edu-course/publishCourse/${id}`,
        method: 'post'
    })
  },
  getCourseList(urrent,size,courseQuery) {
    return request({
      url: `/edu/edu-course/pageCourseCondition/${current}/${size}`,
      method: 'post',
      data:courseQuery
    })
  },
  deleteCourseById(id) {       
    return request({
      url: `/edu/edu-course/${id}`,
      method: 'delete'    
    })
  },
}