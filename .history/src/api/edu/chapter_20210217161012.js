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
      data:chapter
    })
  },
  getChapterById(chapterId) {
    return request({
      url: `/edu/edu-chapter/getChapterInfo/${chapterId}`,
      method: 'get',
    })
  },
  updateChapter(chapter) {
    return request({
      url: `/edu/edu-chapter/updateChapter/`,
      method: 'post',
      data:chapter
    })
  },
  deleteChapter(chapterId) {
    return request({
      url: `/edu/edu-chapter/deleteChapter/${chapterId}`,
      method: 'delete',
    })
  },
}