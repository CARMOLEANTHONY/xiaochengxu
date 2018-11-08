import API from '../../server/server.js'
import fetchData from '../../server/fetch.js'
const app = getApp()

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

  getDetail(id) {
    fetchData(API.getCoachDetail, { id }, res => {

      if (res.data.success) {

        res.data.datas.desc = res.data.datas.desc.replace(/<\/?\w*\/?>/g, '')

        this.setData({
          detail: res.data.datas
        })

      }
    })
  },

  goOrder() {
    if (!this.data.orderName) return wx.showToast({
      title: '名字不能为空',
      icon: 'none'
    })

    if (!this.data.orderID) return wx.showToast({
      title: '身份证不能为空',
      icon: 'none'
    })

    if (!/^\d{17}(\d{1}|X{1})$/.test(this.data.orderID)) return wx.showToast({
      title: `请输入正确的证件号码`,
      icon: "none"
    })

    if (!this.data.orderNumber) return wx.showToast({
      title: '联系方式不能为空',
      icon: 'none'
    })

    if (!this.data.orderDate) return wx.showToast({
      title: '请选择日期',
      icon: 'none'
    })

    if (!this.data.orderTime) return wx.showToast({
      title: '请选择时间',
      icon: 'none'
    })

    console.log(this.data)

    let params = {
      coach_id: this.data.detail.id,
      username: this.data.orderName,
      id_card: this.data.orderID,
      contract: this.data.orderNumber,
      book_date: this.data.orderDate,
      book_time: this.data.orderTime,
      create_user_id: app.globalData.userId
    }

    fetchData(API.orderCoach, params, res => {

      if (res.data.success) {
        wx.showToast({
          title: '预约成功',
          success(){
            wx.switchTab({
              url: 'pages/exercise/exercise',
            })
          }
        })
      }
    }, 'POST')
  },

  nameHandler(e) {
    this.setData({
      orderName: e.detail.value
    })
  },

  IDHandler(e) {
    this.setData({
      orderID: e.detail.value
    })
  },

  numberHandler(e) {
    this.setData({
      orderNumber: e.detail.value
    })
  },

  bindTimeChange(e) {
    this.setData({
      orderTime: e.detail.value
    })
  },

  bindDateChange(e) {
    this.setData({
      orderDate: e.detail.value
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