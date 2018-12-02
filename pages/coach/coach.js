import API from '../../server/server.js'
import fetchData from '../../server/fetch.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    coachList: [],
    totalCount: 0,
    currentPage: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   
  },

  onShow(){
    this.setData({
      coachList: [],
      totalCount: 0,
      currentPage: 1
    })

    this.getCoachList(this.data.currentPage)
  },

  getCoachList(page) {
    fetchData(API.getCoachList, {
      page,
      limit: 10
    }, res => {
      res.data.datas.list.forEach(item => {
        item.desc = item.desc.replace(/<[^>]+>/g, '')
      })

      console.log(res.data.datas.list)

      this.setData({
        coachList: [...this.data.coachList, ...res.data.datas.list],
        totalCount: res.data.datas.count
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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
      this.getCoachList(this.data.currentPage)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})