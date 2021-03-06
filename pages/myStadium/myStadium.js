const app = getApp()

import API from '../../server/server.js'
import fetchData from '../../server/fetch.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataType: ['no_start', 'on_going', 'complete'],
    currentNav: 0,
    list: []
  },

  toDetails(e) {
    wx.navigateTo({
      url: `/pages/stadiumDetails/stadiumDetails?id=${e.currentTarget.dataset.id}`
    })
  },

  navItemHandler(e) {
    this.setData({
      currentNav: e.detail - 0
    })
    this.getList()
  },

  getList(action = this.data.dataType[this.data.currentNav]) {
    let params = {
      page: 1,
      limit: 10000,
      user_id: app.globalData.userId,
      action
    }

    fetchData(API.getMyStadiumList, params, res => {
      this.setData({
        list: res.data.datas.list
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
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