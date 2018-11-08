import API from '../../server/server.js'
import fetchData from '../../server/fetch.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentSwiperIndex: 0,
    swiperSetting: {
      indicatorDots: true,
      indicatorColor: '#9b9b9b',
      indicatorActiveColor: '#f5a623',
      autoplay: true,
      interval: 2000,
      circular: true
    }
  },
  onChange: function (e) {
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  onShow(){
    this.getHomePageDetail()
  },

  goCoachDetail(e){
    wx.navigateTo({
      url: `/pages/coachDetail/coachDetail?id=${e.currentTarget.dataset.id}`,
    })
  },

  getHomePageDetail(){
    fetchData(API.exerciseHomePage, {}, res => {
      console.log(res.data.datas)
      this.setData({
        detail: res.data.datas
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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
  
  },

  swiperChangeHandler(e){
    this.setData({
      currentSwiperIndex: e.detail.current
    })
  }
})