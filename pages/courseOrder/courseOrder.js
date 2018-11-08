import API from '../../server/server.js'
import fetchData from '../../server/fetch.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseDetail: null,
    orderName: '',
    orderID: '',
    orderNumber: ''
  },

  getCourseDetail(id) {
    fetchData(API.getCourseDetail, {
      id
    }, res => {
      console.log(res.data.datas)
      res.data.datas.price = res.data.datas.price.split('.')[0]
      res.data.datas.end_time = res.data.datas.end_time.split(' ')[0]
      res.data.datas.start_time = res.data.datas.start_time.split(' ')[0]
      this.setData({
        courseDetail: res.data.datas
      })
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

    console.log(this.data)

    let params = {
      course_id: this.data.courseDetail.id,
      username: this.data.orderName,
      id_card: this.data.orderID,
      contract: this.data.orderNumber,
      create_user_id: 0
    }

    fetchData(API.orderCourse, params, res => {
      console.log(res)

      if (res.data.success) {
        wx.showToast({
          title: '预约成功',
        })
      }
    }, 'POST')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCourseDetail(options.id)
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