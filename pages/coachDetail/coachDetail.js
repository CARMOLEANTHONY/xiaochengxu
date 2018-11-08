
import API from '../../server/server.js'
import UTILS from '../../utils/util.js'
import fetchData from '../../server/fetch.js'
import wxParse from '../../wxParse/wxParse.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: null,
    orderName: '',
    orderID: '',
    orderNumber: '',
    orderDate: '',
    orderTime: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDetail(options.id)
  },

  getDetail(id){
    fetchData(API.getCoachDetail, {id}, res => {
      let self = this
      wxParse.wxParse('content', 'html', res.data.datas.desc, self, 5)

      if (res.data.success){
        this.setData({
          detail: res.data.datas
        })

      }
    })
  },

  goCoachComment(e){
    wx.navigateTo({
      url: `/pages/commentList/commentList?id=${e.currentTarget.dataset.id}&nav=教练评论&model=coach`,
    })
  },

  goOrder(e){
    wx.navigateTo({
      url: `/pages/coachOrder/coachOrder?id=${e.currentTarget.dataset.id}`,
    })
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