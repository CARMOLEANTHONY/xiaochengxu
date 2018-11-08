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
  getNavItem(e) {
    console.log(e)
    this.setData({
      navItem: e.detail
    })

    this.getList()
  },

  getList(action = this.data.dataType[this.data.navItem]) {
    let params = {
      page: 1,
      limit: 10000,
      user_id: app.globalData.userId,
      action
    }

    fetchData(API.getMyExerciseList, params, res => {
      // res.data.datas.list.forEach(item => {
      //   item.isJoin = item.entry_users.some(v => v.id = app.globalData.userId)

      //   if (!item.isJoin && d < new Date(item.create_time).getTime() && item.entry_counts < item.number_limit) {
      //     item.status = '未报名'
      //   } else if (item.isJoin && d < new Date(item.create_time).getTime()) {
      //     item.status = '已报名'
      //   } else if (d > new Date(item.create_time).getTime() && d < new Date(item.end_time).getTime()) {
      //     item.status = '进行中'
      //   } else if (d > new Date(item.end_time).getTime()) {
      //     item.status = '已结束'
      //   }
      // })
      
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