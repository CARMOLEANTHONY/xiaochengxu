// pages/index/index.js

const app = getApp()

import API from '../../server/server.js'
import UTILS from '../../utils/util.js'
import fetchData from '../../server/fetch.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navItem: 0, //默认选着约运动
    showMaskPage: false, //0隐藏弹窗  1显示弹窗
    exerciseIndex: 1,
    exerciseList: [],
    exerciseCount: 0,
    postIndex: 1,
    postList: [],
    postCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
  },

  onShow(){
    this.setData({
      exerciseList:[],
      exerciseIndex: 1,
      postList: [],
      postIndex: 1
    })
    let timer = setInterval(() => {
      if (app.globalData.token) {
        this.getExerciseList(this.data.exerciseIndex)
        this.getPostList(this.data.postIndex)
        clearInterval(timer)
      }
    }, 100)
  },

  

  getExerciseList(page) {

    fetchData(API.getSportList, {
      page,
      limit: 10
    }, res => {
      let d = Date.now()
      res.data.datas.list.forEach(item => {
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
      })

      this.setData({
        exerciseList: [...this.data.exerciseList, ...res.data.datas.list],
        exerciseCount: res.data.datas.count
      })
    })

  },

  formatDate(str) {
    let transforArr = []

    transforArr = str.split(' ')

    transforArr = transforArr[0].split('-')

    return `${transforArr[1]}-${transforArr[2]}`
  },

  getPostList(page) {

    fetchData(API.getPostList, {
      page,
      limit: 10
    }, res => {
      res.data.datas.list.forEach(item => {
        item.create_time = this.formatDate(item.create_time)
      })

      this.setData({
        postList: [...this.data.postList, ...res.data.datas.list],
        postCount: res.data.datas.count
      })
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

    if (this.data.navItem == 0) {
      if (this.data.exerciseIndex * 10 >= this.data.exerciseCount) {
        wx.showToast({
          title: '没有更多了',
          icon: "none"
        })
      } else {
        this.setData({
          exerciseIndex: this.data.exerciseIndex + 1
        })

        this.getExerciseList(this.data.exerciseIndex)
      }
    } else {
      if (this.data.postIndex * 10 >= this.data.postCount) {
        wx.showToast({
          title: '没有更多了',
          icon: "none"
        })
      } else {
        this.setData({
          postIndex: this.data.postIndex + 1
        })

        this.getPostList(this.data.postIndex)
      }
    }
  },

  switchNav: function(e) {
    var that = this;
    if (that.data.navItem == e.target.dataset.navitem) {
      return false;
    } else {
      that.setData({
        navItem: e.target.dataset.navitem
      })
    }
  },

  showMask: function() {
    var that = this;
    that.setData({
      showMaskPage: !that.data.showMaskPage
    })
  },

  releaseMovement: function() {
    var that = this;
    wx.navigateTo({
      url: '../releaseMovement/releaseMovement'
    });
    that.setData({
      showMaskPage: false
    })
  },

  releaseMovementCircle: function() {
    var that = this;
    that.setData({
      showMaskPage: false
    })
  },

  releaseRunCircle: function() {
    var that = this;
    wx.navigateTo({
      url: '../releaseMovementCircle/releaseMovementCircle'
    });
    that.setData({
      showMaskPage: false
    })
  },

  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})