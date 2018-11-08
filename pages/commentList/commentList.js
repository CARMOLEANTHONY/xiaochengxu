import API from '../../server/server.js'
import fetchData from '../../server/fetch.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let nav = options.nav || '评论列表'
    wx.setNavigationBarTitle({
      title: nav
    })

    this.getList(options.model, options.id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  getList(model, rel_id) {
    fetchData(API.getCommentList, {
      model,
      rel_id
    }, res => {
      res.data.datas.forEach(item => {
        let d = Date.now()
        let c = new Date(item.create_time).getTime()
        let perDay = 3600 * 1000 * 24

        if (c % perDay == d % perDay) {
          item.create_time = '今天'
        } else if (d % perDay - c % perDay == 1) {
          item.create_time = '昨天'
        } else {
          item.create_time = item.create_time.split(' ')[0]
        }

      })
      this.setData({
        list: res.data.datas
      })

      console.log(this.data.list)

    })
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