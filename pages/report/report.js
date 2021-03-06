import API from '../../server/server.js'
import fetchData from '../../server/fetch.js'

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultComment: '输入内容',
    content: '',
    postId: ''
  },

  inputHandler(e) {
    this.setData({
      content: e.detail.value
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    !!options.defaultComment && this.setData({ defaultComment: options.defaultComment })

    this.setData({
      postId: options.postId
    })
  },

  submit() {

    if (!this.data.content) return wx.showToast({
      title: '内容不能为空',
      icon: 'none'
    })

    let params = {
      post_id: this.data.postId,
      create_user: app.globalData.userId,
      content: this.data.content
    }

    fetchData(API.getReport, params, res => {
      wx.navigateTo({
        url: '/pages/postDetails/postDetails?id=' + this.data.postId,
      })
    }, 'POST')
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