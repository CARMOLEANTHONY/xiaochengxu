// pages/postDetails/postDetails.js

const app = getApp()

import API from '../../server/server.js'
import fetchData from '../../server/fetch.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    postDetail: {}
  },

  updateData(e){
    console.log(e)
    this.getPostDetail(this.data.id)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      id: options.id
    })

  },

  onShow() {
    this.getPostDetail(this.data.id)
  },

  report() {
    wx.navigateTo({
      url: '/pages/report/report?postId=' + this.data.postDetail.id,
    })
  },

  addLike() {
    let uId = app.globalData.userId
    if (this.data.postDetail.like_user_ids.includes(uId)) return wx.showToast({
      title: '请勿重复点赞',
      icon: 'none'
    })

    fetchData(API.addLike, {
      post_id: this.data.id,
      user_id: uId
    }, res => {
      this.getPostDetail(this.data.id)
    }, 'POST', {
      "content-type": "application/x-www-form-urlencoded"
    })
  },

  getPostDetail(id) {
    fetchData(API.getPostDetail, {
      id
    }, res => this.setData({
      postDetail: res.data.datas
    }))
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})