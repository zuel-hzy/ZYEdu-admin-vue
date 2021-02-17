import request from '@/utils/request'

export default{
  getChapterVideo() {
    return request({
      url: `/edu/edu-chapter/getChapterVideo/${chapterId}`,
      method: 'get'
    })
  },
}