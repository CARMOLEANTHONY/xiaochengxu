import API from '../../server/server.js'
import fetchData from '../../server/fetch.js'

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageList: [],
    imageLocalPath: [],
    titleValue: '',
    contentValue: ''
  },

  release() {
    if (!this.data.titleValue) return wx.showToast({
      title: '请输入运动圈标题',
      icon: 'none'
    })

    if (this.data.titleValue.length > 20) return wx.showToast({
      title: '标题最多输入20字',
      icon: 'none'
    })

    if (this.data.contentValue.length > 1000) return wx.showToast({
      title: '内容最多输入1000字',
      icon: 'none'
    })

    if (!this.data.contentValue && this.data.imageList.length < 1) return wx.showToast({
      title: '请输入运动圈内容或者加入图片',
      icon: 'none'
    })

    let params = {
      create_user: app.globalData.userId,
      parent_id: 0,
      origin_post_id: 0,
      title: this.data.titleValue,
      content: this.data.contentValue,
      images: this.data.imageList
    }

    // 发布api操作
    fetchData(API.createPost, params, res => {
      wx.switchTab({
        url: '/pages/index/index',
      })
    }, 'POST')

    wx.uploadFile({
      url: API.createPost,
      filePath: '',
      name: '',
    })
  },

  contentBlur(obj) {
    this.setData({
      contentValue: obj.detail.value
    })
  },

  titleBlur(obj) {

    this.setData({
      titleValue: obj.detail.value
    })
  },

  uploadImage() {
    wx.chooseImage({
      count: 5,
      success: res => {

        this.setData({
          imageList: [...this.data.imageList, ...res.tempFiles]
        })

        this.setData({
          imageLocalPath: [...this.data.imageLocalPath, ...res.tempFilePaths]
        })

      }
    })
  },

  deleteImageItem(e) {
    let index, mapArr;

    index = e.currentTarget.dataset.imageIndex

    mapArr = this.data.imageList

    this.setData({
      imageList: mapArr.splice(index, 1) && mapArr
    })

  },

  previewImage(e) {

    wx.previewImage({
      current: this.data.imageLocalPath[e.currentTarget.dataset.imageIndex],
      urls: this.data.imageLocalPath
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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