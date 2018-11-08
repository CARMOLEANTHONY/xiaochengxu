const app = getApp()

const fetchData = function(url, params, callback, fetchType, header = {}) {
  wx.showLoading({
    title: '玩命加载中',
  })

  params = params || {}

  header = { ...header, token: app.globalData.token}

  fetchType = fetchType || 'GET'

  wx.request({
    url,
    data: { ...params
    },
    method: fetchType,
    header,
    success: res => {

      wx.hideLoading()

      res.data.success ? !!callback && callback(res) : wx.showToast({
        title: '系统异常',
        icon: 'none'
      })
    },
    fail: (err) => {
      wx.hideLoading()

      wx.showToast({
        title: '系统异常',
        icon: 'none'
      })
    }
  })
}

module.exports = fetchData