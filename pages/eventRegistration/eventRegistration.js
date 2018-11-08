import API from '../../server/server.js'
import UTILS from '../../utils/util.js'
import fetchData from '../../server/fetch.js'

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    projects: [],
    totalMoney: 0,
    isGroup: false,
    max: 0,
    teamCount: 0,
    teamName: '',
    teamLeaderName: '',
    teamLeaderId: '',
    personalName: '',
    personalId: ''
  },

  toggleChecked(e) {
    let index, status, current, totalMoney;

    index = e.currentTarget.dataset.index;
    status = this.data.projects[index].isCheck

    status = !status;

    current = `projects[${index - 0}].isCheck`

    this.setData({
      [current]: status
    })

    totalMoney = 0;

    this.data.projects.forEach(item => {
      totalMoney += item.isCheck ? parseInt(item.price) == NaN ? 0 : parseInt(item.price) : 0;
    })

    this.setData({
      totalMoney
    })
  },

  countHandler(e) {
    this.setData({
      teamCount: e.detail.value
    })
  },

  nameHandler(e) {
    this.setData({
      teamName: e.detail.value
    })
  },

  leaderHandler(e) {
    this.setData({
      teamLeaderName: e.detail.value
    })
  },

  idNumHandler(e) {
    this.setData({
      teamLeaderId: e.detail.value
    })
  },

  personalNameHandler(e) {
    this.setData({
      personalName: e.detail.value
    })
  },
  personalIdHandler(e) {
    this.setData({
      personalId: e.detail.value
    })
  },

  submit() {
    let project_ids, params;

    if (this.data.isGroup) {
      if (this.data.teamName == '') return wx.showToast({
        title: `请输入团队名称`,
        icon: "none"
      })


      if (this.data.teamCount == 0) return wx.showToast({
        title: `请输入团队人数`,
        icon: "none"
      })

      if (/\D+/.test(this.data.teamCount)) return wx.showToast({
        title: '团队人数请输入整数',
        icon: "none"
      })

      if (parseInt((this.data.teamCount)) > this.data.max) return wx.showToast({
        title: `团队人数不能多于${this.data.max}个`,
        icon: "none"
      })

      if (this.data.teamLeaderName == '') return wx.showToast({
        title: `请输入责任人名称`,
        icon: "none"
      })


      if (!/^\d{17}(\d{1}|X{1})$/.test(this.data.teamLeaderId)) return wx.showToast({
        title: `请输入正确的证件号码`,
        icon: "none"
      })

    } else {
      if (this.data.personalName == '') return wx.showToast({
        title: `请输入个人名称`,
        icon: "none"
      })

      if (!/^\d{17}(\d{1}|X{1})$/.test(this.data.personalId)) return wx.showToast({
        title: `请输入正确的证件号码`,
        icon: "none"
      })
    }

    if (!this.data.projects.some(item => item.isCheck)) return wx.showToast({
      title: `请选择赛事`,
      icon: "none"
    })

    project_ids = ''

    this.data.projects.forEach(item => {
      item.isCheck && (project_ids += `${item.id},`)
    })

    project_ids = project_ids.substring(0, project_ids.length - 1)

    params = {
      game_id: this.data.id,
      project_ids
    }

    Object.assign(params, this.data.isGroup ? {
      team_name: this.data.teamName,
      team_num: this.data.teamCount,
      blame_person: this.data.teamLeaderName,
      id_card: this.data.teamLeaderId
    } : {
      personal_name: this.data.personalName,
      id_card: this.data.personalId
    })

    fetchData(API.registerEvent, params, res => {
      console.log(res)
    })
  },

  onLoad: function(options) {
    let arr = app.globalData.eventDetail.projects || []

    arr.map(v => {
      v.isCheck = false
      v.price -= 0
    })

    this.setData({
      projects: arr,
      isGroup: !!(options.eventType - 0),
      max: options.max || 0,
      id: options.id
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