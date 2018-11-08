
const app = getApp()

import API from '../../server/server.js'
import UTILS from '../../utils/util.js'
import fetchData from '../../server/fetch.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoSrc: []
  },

  playHandler(e){

  },

  binderror(){
    wx.showToast({
      title: '视频播放出错，请稍后重试',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      videoSrc: app.globalData.eventDetail.videoList || []
    })

    // fetchData(API.getEventDetail + options.id, {

    // }, res => {
    //     this.setData({
    //       videoSrc: res.data.datas.videos
    //      })
    // })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})