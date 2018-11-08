import API from '../../server/server.js'
import fetchData from '../../server/fetch.js'
import UTILS from '../../utils/util.js'
import wxParse from '../../wxParse/wxParse.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    currentSwiperIndex: 0,
    swiperSetting: {
      indicatorDots: true,
      indicatorColor: '#9b9b9b',
      indicatorActiveColor: '#f5a623',
      autoplay: true,
      interval: 2000,
      circular: true
    },
    dateList: {},
    detail: {}
  },

  getDateList() {
    let today = Date.now();
    let oneDay = 3600 * 24 * 1000;
    let result = []

    for (let i = 0; i < 7; i++) {
      let d = new Date(today + oneDay * i)
      result.push(`${UTILS.formatTime(d, '/').split(' ')[0]} 星期${this.transferNum(d.getDay())}`)
    }

    return result
  },
  transferNum(num) {

    return ['日', '一', '二', '三', '四', '五', '六'][num]
  },

  goOrder(e){
    console.log(e)
    wx.navigateTo({
      url: `/pages/stadiumOrder/stadiumOrder?d=${e.currentTarget.dataset.d}&id=${this.data.detail.id}`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      id: options.id || 0,
      dateList: this.getDateList()
    })

    this.getDetail(options.id)

  },

  getDetail(id) {
    fetchData(API.getStadiumDetail, {
      id
    }, res => {
      let self = this

      res.data.datas.descript = res.data.datas.descript || ''

      wxParse.wxParse('content', 'html', res.data.datas.descript, self, 5)

      this.setData({
        detail: res.data.datas
      })

      wx.setNavigationBarTitle({
        title: res.data.datas.name
      })
    })
  },

  swiperChangeHandler(e) {
    this.setData({
      currentSwiperIndex: e.detail.current
    })
  },

  callStadium() {
    wx.makePhoneCall({
      phoneNumber: '18819418043',
      fail: (err) => {
        wx.showToast({
          title: '拨打失败，请稍后重试',
          icon: 'none'
        })
      }
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