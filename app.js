//app.js

import UTILS from '/utils/util.js'
import API from '/server/server.js'

App({
  onLaunch: function() {

    // 登录
    wx.login({
      success: res => {
        console.log(res)

        wx.request({
          url: API.getUserCode,
          data: {
            code: res.code
          },
          success: res => {
            this.globalData.userId = res.data.datas.openid
            this.globalData.session_key = res.data.datas.session_key
            
          }
        })
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    // 获取设备信息
    this.globalData.deviceInfo = wx.getSystemInfoSync()

    //获取token
    this.getToken()

    this.getUserInfo()

  },

  getUserInfo(){
    let timer = setInterval( () => {
      if (this.globalData.userId != null && this.globalData.token) {
       
        wx.request({
          url: API.getUser,
          data: {
            wx_id: this.globalData.userId
          },
          header: {
            token: this.globalData.token
          },
          success: res => {
            console.log(res)
            clearInterval(timer)
          }
        })
      }
    }, 100)
  },

  getToken() {

    let params = {
      appid: this.globalData.appid,
      secret: this.globalData.secret
    }

    let that = this

    if (!!UTILS.getStorage('token') && (UTILS.getStorage('tokenStart') + UTILS.getStorage('tokenExpires') >= new Date().getTime())) return (that.globalData.token = that.globalData.fetchParams.token = UTILS.getStorage('token'))

    wx.request({
      url: API.getToken,
      data: params,
      success(res) {
        if (res.data.success) {

          console.log(res.data.datas)

          that.globalData.fetchParams.token = res.data.datas.access_token
          that.globalData.token = res.data.datas.access_token

          UTILS.setStorage('token', res.data.datas.access_token)
          UTILS.setStorage('tokenStart', new Date().getTime())
          UTILS.setStorage('tokenExpires', res.data.datas.expires_in * 1000)

          that.onLaunch()
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
    fetchParams: {
      token: ''
    },
    eventDetail: {}
  },

  userInfoReadyCallback(res) {
    this.globalData.userInfo = res.userInfo
  }
})