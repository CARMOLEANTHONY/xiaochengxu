const app = getApp()

import API from '../../server/server.js'
import fetchData from '../../server/fetch.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    list: [],
    count: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getList()
  },

  getList() {
    fetchData(API.getPostList, {
      limit: 10,
      page: this.data.page,
      user_id: app.globalData.userId
    }, res => {
      this.setData({
        list: [...this.data.list, ...res.data.datas.list],
        count: res.data.datas.count
      })
    })

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
    if (this.data.page * 10 >= this.data.count) {
      wx.showToast({
        title: '没有更多了',
        icon: 'none'
      })
    } else {
      this.setData({
        page: ++this.data.page
      })
      this.getList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})