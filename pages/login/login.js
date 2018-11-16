const app = getApp()

import API from '../../server/server.js'
import UTILS from '../../utils/util.js'
import fetchData from '../../server/fetch.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  // 开发使用
  getuserinfo(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    fetchData(API.syncUserInfo, {
      user_name: e.detail.userInfo.nickName,
      head_img: e.detail.userInfo.avatarUrl,
      wx_id: app.globalData.openId
    }, res => {
      app.globalData.userId = res.data.datas.id
      wx.switchTab({
        url: '/pages/index/index',
      })
    }, 'POST')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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