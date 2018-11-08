import API from '../../server/server.js'
import fetchData from '../../server/fetch.js'
import wxParse from '../../wxParse/wxParse.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    courseDetail: {},
    isTimeout: false
  },

  isOver(endTime) {
    let now = Date.now()
    let end = new Date(endTime).getTime()

    return now > end
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      id: options.id
    })

    this.getCourseDetail(options.id)
  },

  getCourseDetail(id) {
    fetchData(API.getCourseDetail, {
      id
    }, res => {
      console.log(res.data.datas)
      res.data.datas.price = res.data.datas.price.split('.')[0]
      res.data.datas.end_time = res.data.datas.end_time.split(' ')[0]
      res.data.datas.start_time = res.data.datas.start_time.split(' ')[0]

      let self = this
      wxParse.wxParse('content', 'html', res.data.datas.desc, self, 5)

      this.setData({
        courseDetail: res.data.datas,
        isTimeout: this.isOver(res.data.datas.end_time)
      })
    })
  },

  goCourseComment(){
    wx.navigateTo({
      url: `/pages/commentList/commentList?id=${this.data.courseDetail.id}&nav=课程评论`,
    })
  },

  goOrder(){
    wx.navigateTo({
      url: `/pages/courseOrder/courseOrder?id=${this.data.courseDetail.id}`,
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