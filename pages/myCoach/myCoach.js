const app = getApp()

import API from '../../server/server.js'
import fetchData from '../../server/fetch.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navItem: 0,
    dataType: ['no_start', 'on_going', 'complete'],
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getList('no_start')
  },

  switchNav(e) {
    let n = e.currentTarget.dataset.navItem

    this.setData({
      navItem: Number(n)
    })

    this.getList(this.data.dataType[n])
  },

  getList(dT) {
    let params = {
      page: 1,
      limit: 10000,
      user_id: app.globalData.userId,
      action: dT
    }
    fetchData(API.getMyCoachList, params, res => {
     this.setData({
       list: res.data.datas.list
     })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})