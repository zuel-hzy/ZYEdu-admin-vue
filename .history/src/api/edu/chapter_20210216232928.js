import request from '@/utils/request'

export default{
  getChapterVideo(chapterId) {
    return request({
      url: `/edu/edu-chapter/getChapterVideo/${chapterId}`,
      method: 'get'
    })
  },
}