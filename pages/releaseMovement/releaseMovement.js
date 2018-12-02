import API from '../../server/server.js'
import fetchData from '../../server/fetch.js'

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startTime: '',
    endTime: '',
    cost: 'AA',
    costType: 10,
    costArr: [true, false],
    movementType: '',
    count: '',
    phone: '',
    location: '',
    longitude: 0,
    slogan: '',
    costRemark: '',
    title: '',
    address: '选择场地位置'
  },

  selectCostType(e) {

    let arr = this.data.costArr

    this.setData({
      costArr: e.currentTarget.dataset.type == '10' ?
        arr[0] ? [false, false] : [true, false] : arr[1] ? [false, false] : [false, true],
      costType: Number(e.currentTarget.dataset.type),
      cost: e.currentTarget.dataset.type == '10' ? 'AA' : '免费'
    })
  },

  typeHandler(e) {
    this.setData({
      movementType: e.detail.value
    })
  },

  titleHandler(e) {
    this.setData({
      title: e.detail.value
    })
  },

  sloganHandler(e) {
    this.setData({
      slogan: e.detail.value
    })
  },

  countHandler(e) {
    this.setData({
      count: parseInt(e.detail.value)
    })
  },

  phoneHandler(e) {
    this.setData({
      phone: e.detail.value
    })
  },

  costRemarkHandler(e) {
    this.setData({
      costRemark: e.detail.value
    })
  },

  costHandler(e) {
    this.setData({
      costArr: [false, false],
      costType: Number(e.currentTarget.dataset.type),
      cost: e.detail.value
    })

  },

  onGetStartResult(res) {
    this.setData({
      startTime: res.detail.data
    })
  },

  onGetEndResult(res) {
    this.setData({
      endTime: res.detail.data
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  register() {
    if (!this.data.location) return wx.showToast({
      title: '请选择位置',
      icon: 'none'
    })

    if (!this.data.movementType) return wx.showToast({
      title: '运动类型不能为空',
      icon: 'none'
    })

    if (!this.data.count) return wx.showToast({
      title: '人数不能为空',
      icon: 'none'
    })

    if (!this.data.phone) return wx.showToast({
      title: '联系方式不能为空',
      icon: 'none'
    })

    if (!this.data.title) return wx.showToast({
      title: '标题不能为空',
      icon: 'none'
    })

    if (!this.data.slogan) return wx.showToast({
      title: '口号不能为空',
      icon: 'none'
    })

    if (!this.data.costType) return wx.showToast({
      title: '请选择费用方式',
      icon: 'none'
    })

    if (!this.data.startTime) return wx.showToast({
      title: '请选择开始时间',
      icon: 'none'
    })

    if (!this.data.endTime) return wx.showToast({
      title: '请选择结束时间',
      icon: 'none'
    })

    let params = {
      user_id: app.globalData.userId,
      start_time: new Date(this.data.startTime).getTime(),
      end_time: new Date(this.data.endTime).getTime(),
      number_limit: Number(this.data.count),
      address: this.data.address,
      location: this.data.location,
      title: this.data.title,
      slogan: this.data.slogan,
      cost_type: this.data.costType == 'AA' ? 10 : this.data.costType == '免费' ? 20:  30,
      cost: this.data.cost,
      phone: this.data.phone,
      cost_remark: this.data.costRemark,
      sport_type: this.data.movementType
    }

    fetchData(API.setSport, params, res => {
      wx.switchTab({
        url: '/pages/index/index',
      })
    }, 'POST')
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

  },

  goToMap: function(e) {
    let that = this

    wx.chooseLocation({
      success(res) {
        console.log(res)
        that.setData({
          location: `${res.longitude},${res.latitude}`,
          address: res.address || ''
        });
      }
    })
  }
})