import request from '@/utils/request'

export default{
  getSubjectListPage() {
    return request({
      url: `/edu_teacher/edu-subject/getSubject`,
      method: 'get'
    })
  },
}