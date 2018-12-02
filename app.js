//app.js

import UTILS from '/utils/util.js'
import API from '/server/server.js'

App({
  onLaunch: function() {

    //获取token
    this.getToken(this.ourLogin)


    // 获取设备信息
    this.globalData.deviceInfo = wx.getSystemInfoSync()

    
  },

  ourLogin(){
    wx.login({
      success: res => {

        wx.request({
          url: API.getUserCode,
          data: {
            code: res.code
          },
          success: res => {
            this.globalData.openId = res.data.datas.openid
            this.globalData.session_key = res.data.datas.session_key
            wx.getUserInfo({
              success: res => {
                this.globalData.userInfo = res.userInfo
                wx.request({
                  url: API.syncUserInfo,
                  method: 'POST',
                  data: {
                    user_name: res.userInfo.nickName,
                    head_img: res.userInfo.avatarUrl,
                    wx_id: this.globalData.openId
                  },
                  header: {
                    token: this.globalData.token
                  },
                  success: res => {
                    this.globalData.userId = res.data.datas.id
                  }
                })
              },
              fail: err => {
                wx.navigateTo({
                  url: '/pages/login/login',
                })
              }
            })
          }
        })
      }
    })
  },

  getToken(callback) {

    let params = {
      appid: this.globalData.appid,
      secret: this.globalData.secret
    }

    let that = this

    if (!!UTILS.getStorage('token') && (UTILS.getStorage('tokenStart') + UTILS.getStorage('tokenExpires') >= new Date().getTime())) {
      callback()
      return that.globalData.token = that.globalData.fetchParams.token = UTILS.getStorage('token')
    }

    wx.request({
      url: API.getToken,
      data: params,
      success(res) {
        if (res.data.success) {

          that.globalData.token = res.data.datas.access_token

          UTILS.setStorage('token', res.data.datas.access_token)
          UTILS.setStorage('tokenStart', new Date().getTime())
          UTILS.setStorage('tokenExpires', res.data.datas.expires_in * 1000)

          callback()
        }
      }
    })
  },

  globalData: {
    userInfo: null,
    userId: null,
    session_key: null,
    token: '',
    appid: '123', //wx0203e7d1186c8233
    secret: '123', //8cd6398949b103e4f4e15c26ac7fa184
    deviceInfo: {},
    fetchParams: {},
    eventDetail: {}
  },

  userInfoReadyCallback(res) {
    this.globalData.userInfo = res.userInfo
  }
})