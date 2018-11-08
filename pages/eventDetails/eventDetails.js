
import API from '../../server/server.js'
import UTILS from '../../utils/util.js'
import fetchData from '../../server/fetch.js'
import wxParse from '../../wxParse/wxParse.js'

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    eventDetail: {},
    currentStatus: 0,
    id: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this.fetchEventDetail(options.id)
  },

  fetchEventDetail(id){
    fetchData(API.getEventDetail + id , {
      
    }, res => {

      let self = this 

      wxParse.wxParse('content', 'html', res.data.datas.content, self, 5)

      this.setData({
        eventDetail: res.data.datas,
        currentStatus: this.compareDate(res.data.datas)
      })

      console.log(res)

      app.globalData.eventDetail.videoList = res.data.datas.videos || []
      app.globalData.eventDetail.imageList = res.data.datas.images || []
      app.globalData.eventDetail.projects = res.data.datas.projects
      app.globalData.eventDetail.eventResult = res.data.datas.game_result
    })
  },

  compareDate(res = this.data.eventDetail){
    let temp = new Date().getTime()

    if (temp <= new Date(res.deadline).getTime()) return 0
    if (temp <= new Date(res.enroll_start_date).getTime()) return 1
    if (temp <= new Date(res.start_time).getTime()) return 2
    if (temp <= new Date(res.end_time).getTime()) return 3

    return 3
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  }
})