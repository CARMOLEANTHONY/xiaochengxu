
import API from '../../server/server.js'
import fetchData from '../../server/fetch.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stadiumList: [],
    currentPage: 0,
    totalCount: 0
  },

  toDetails(e){
    wx.navigateTo({
      url: `/pages/stadiumDetails/stadiumDetails?id=${e.currentTarget.dataset.id}`
    })
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
    this.getStadiumList(this.data.currentPage)
  },

  getStadiumList(page) {
    fetchData(API.getStadiumList, {
      page,
      limit: 10 
    }, res => {
      this.setData({
        stadiumList: [...this.data.stadiumList, ...res.data.datas.list],
        totalCount: res.data.datas.count
      })
    })
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

    10 * this.data.currentPage >= this.data.totalCount ?
      wx.showToast({
        title: '没有更多了',
        icon: "none"
      }) :
      (this.setData({
        currentPage: this.data.currentPage + 1
      }) && this.getStadiumList(this.data.currentPage))

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})