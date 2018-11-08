const formatTime = (date, sp = '/') => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join(sp) + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const switchNavHandler = function (e, self, callback) {
  if (e.currentTarget.dataset.navItem === self.data.navItem) return false

  self.setData({
    navItem: e.currentTarget.dataset.navItem
  })

  callback && callback(self)
}

const getStorage = function (key) {

  return wx.getStorageSync(key) || ''
  
}

const setStorage = function( key, data) {
  wx.setStorage({
    key,
    data
  })
}

module.exports = {
  formatTime,
  switchNavHandler,
  setStorage,
  getStorage
}
