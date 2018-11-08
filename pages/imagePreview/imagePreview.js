
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperItem: null,
    currentImageIndex: 0,
    imageLocalPath: []
  },
 
  goHome(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  

  swiperChangeHandler(e) {
    this.setData({ currentImageIndex: e.detail.current })
  },

  downloadHandler() {

    wx.showLoading({
      title: '正在下载',
      mask: true
    })

    wx.downloadFile({
      url: this.data.swiperItem[this.data.currentImageIndex].image,
      success(res) {
        if (res.statusCode === 200) {
          wx.saveFile({
            tempFilePath: res.tempFilePath,
            success(res) {
              wx.hideLoading()
              wx.showToast({
                title: `下载成功， 文件存放在${res.savedFilePath}`,
              })
            },
            fail: (err) => {
              wx.hideLoading()
              wx.showToast({
                icon: "none",
                title: err.errMsg.replace("downloadFile:", ""),
              })
            }
          })
        }
      },
      fail: (err) => {
        console.log(err)
        wx.hideLoading()
        wx.showToast({
          icon: "none",
          title: err.errMsg.replace("downloadFile:", ""),
        })
      }
    })
  },

  previewImage(e){

    wx.previewImage({
      current: this.data.imageLocalPath[e.currentTarget.dataset.imageIndex],
      urls: this.data.imageLocalPath
    })

  },

  onShareAppMessage: function (res) {
    return {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      currentImageIndex: options.index
    })

    this.setData({
      swiperItem: app.globalData.eventDetail.imageList
    })

    this.setData({
      imageLocalPath: this.data.swiperItem.map(item => item.image)
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