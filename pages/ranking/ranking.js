import API from '../../server/server.js'
import UTILS from '../../utils/util.js'
import fetchData from '../../server/fetch.js'

Page({
  data: {
    currentDatas: [],
    dataType: ['no_start', 'on_going', 'complete'],
    currentNav: 0
  },

  tapEventDetails: function() {
    wx.navigateTo({
      url: '../eventDetails/eventDetails',
    })
  },

  fetchEventList(action = this.data.dataType[this.data.currentNav]) {
    fetchData(API.getEventList, {
      limit: 10000,
      page: 1,
      action
    }, res => {
      this.setData({
        currentDatas: res.data.datas.list
      })
    })
  },

  onLoad() {
    this.fetchEventList()
  },

  navItemHandler(e) {
    this.setData({
      currentNav: e.detail - 0
    })
    this.fetchEventList(this.data.dataType[this.data.currentNav])
  },

  onReachBottom(){
  }
})