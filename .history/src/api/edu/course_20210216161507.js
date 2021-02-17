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
}