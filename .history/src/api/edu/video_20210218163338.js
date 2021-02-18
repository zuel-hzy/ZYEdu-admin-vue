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
  //删除小节
  deleteVideo(videoId) {
    return request({
      url: `/edu/edu-video/${videoId}`,
      method: 'delete',
    })
  },
  //删除视频
  deleteAiyunVideo(videoId) {
    return request({
      url: `/vod/video/removeVideo/${videoId}`,
      method: 'delete',
    })
  },
}