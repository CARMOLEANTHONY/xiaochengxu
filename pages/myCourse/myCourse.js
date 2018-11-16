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
  onLoad: function (options) {
    this.getList('no_start')
  },

  getList(dT) {
    let params = {
      page: 1,
      limit: 10000,
      user_id: app.globalData.userId,
      action: dT
    }
    fetchData(API.getMyCourseList, params, res => {
      this.setData({
        list: res.data.datas.list
      })
    })
  },


  getDatas(e) {
    this.setData({
      datas: e.detail
    })
  },
  getNavItem(e) {
    this.setData({
      navItem: e.detail
    })

    console.log(e.detail)

    this.getList(this.data.dataType[Number(e.detail)])
  }
})