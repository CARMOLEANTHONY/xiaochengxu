import fetchData from '../../server/fetch.js'
import API from '../../server/server.js'
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.id)
    this.getDetail(options.id)
  },

  getDetail(id) {
    fetchData(`${API.getSportDetail}/id/${id}`, {

    }, res => {
      let item = res.data.datas
      let d = Date.now()

      item.isJoin = item.entry_users.some(v => v.id = app.globalData.userId)

      if (!item.isJoin && d < new Date(item.create_time).getTime() && item.entry_counts < item.number_limit) {
        item.status = '未报名'
      } else if (item.isJoin && d < new Date(item.create_time).getTime()) {
        item.status = '已报名'
      } else if (d > new Date(item.create_time).getTime() && d < new Date(item.end_time).getTime()) {
        item.status = '进行中'
      } else if (d > new Date(item.end_time).getTime()) {
        item.status = '已结束'
      }

      item.location = item.location == null ? '' : item.location
      item.slogan = item.slogan == null ? '' : item.slogan
      
      this.setData({
        detail: item
      })

      console.log(this.data.detail)
    })
  },

  join() {
    let params = {
      rel_id: this.data.detail.id,
      user_id: app.globalData.userId,
      model: 'sport'
    }
    fetchData(API.joinSport, {
      params
    }, res => {
      wx.showToast({
        title: '加入成功',
        succuss(){
          wx.switchTab({
            url: '/pages/index/index',
          })
        }
      })
 
    })
  },

  exist() {
    let params = {
      rel_id: this.data.detail.id,
      user_id: app.globalData.userId,
      model: 'sport'
    }
    fetchData(API.existSport, {
      params
    }, res => {
      wx.showToast({
        title: '退出成功',
        succuss() {
          wx.switchTab({
            url: '/pages/index/index',
          })
        }
      })
    })
  },

  goMap() {
    let that = this

    let position = that.data.detail.location.split(',')
    wx.openLocation({

      latitude: Number(position[1]), //坐标纬度（从地图获取坐标）

      longitude: Number(position[0]), //坐标经度（从地图获取坐标）

      address: that.data.detail.address //打开后显示的地址汉字

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