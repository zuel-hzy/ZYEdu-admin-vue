import request from '@/utils/request'

export default{
  getSubjectListPage() {
    return request({
      url: `/edu/edu-subject/getSubject`,
      method: 'get'
    })
  },
}