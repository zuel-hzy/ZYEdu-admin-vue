import request from '@/utils/request'
import course from './course'

export default{
  getChapterVideo(chapterId) {
    return request({
      url: `/edu/edu-chapter/getChapterVideo/${chapterId}`,
      method: 'get'
    })
  },
  addChapter(chapter) {
    return request({
      url: `/edu/edu-chapter/addChapter/`,
      method: 'post',
      data:course
    })
  },
}