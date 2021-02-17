import request from '@/utils/request'

export default{
  addVideo(video) {
    return request({
      url: `/edu/edu-video/addVideo`,
      method: 'post',
      data:video
    })
  },
  getVideoById(videoId) {
    return request({
      url: `/edu/edu-video/getVideoInfo/${videoId}`,
      method: 'get',
    })
  },
  updateVideo(video) {
    return request({
      url: `/edu/edu-video/updateVideo`,
      method: 'post',
      data:video
    })
  },
  deleteVideo(videoId) {
    return request({
      url: `/edu/edu-video/deleteVideo/${videoId}`,
      method: 'delete',
    })
  },
}