import API from '../../server/server.js'
import UTILS from '../../utils/util.js'
import fetchData from '../../server/fetch.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseList: [],
    currentPage: 1,
    totalCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  onShow() {
    this.setData({
      courseList: [],
      currentPage: 1,
      totalCount: 0
    })

    this.getCourseList(this.data.currentPage)
  },

  getCourseList(page) {
    fetchData(API.getCourseList, {
      page,
      limit: 10
    }, res => {
      this.setData({
        courseList: [...this.data.courseList, ...res.data.datas.list],
        totalCount: res.data.datas.count
      })
    })
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
    if (10 * this.data.currentPage >= this.data.totalCount) {
      wx.showToast({
        title: '没有更多了',
        icon: "none"
      })
    } else {
      this.setData({
        currentPage: this.data.currentPage + 1
      })

      this.getCourseList(this.data.currentPage)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})