import request from '@/utils/request'

export default{
  addVideo(video) {
    return request({
      url: `/edu/edu-video/addvideo`,
      method: 'post',
      data:video
    })
  },
  getVideoById(videoId) {
    return request({
      url: `/edu/edu-video/getvideoInfo/${chvideoId}`,
      method: 'get',
    })
  },
  updateVideo(video) {
    return request({
      url: `/edu/edu-video/updatevideo`,
      method: 'post',
      data:chapter
    })
  },
  deleteVideo(videoId) {
    return request({
      url: `/edu/edu-video/deletevideo/${videorId}`,
      method: 'delete',
    })
  },
}