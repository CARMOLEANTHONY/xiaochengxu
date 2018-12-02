const API = require('../server/server.js')

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

const uploadImages = function (imageList, urlList, currentIndex, callback){
  let len = imageList.length;

  if (len == 0) return callback()

  wx.uploadFile({
    url: API.uploadImages,
    filePath: imageList[currentIndex],
    name: `file`,
    success: res => {
      res.data = JSON.parse(res.data)
      urlList.push(res.data.datas)
    },
    complete: () => {
      ++currentIndex < len ? uploadImages(imageList, urlList, currentIndex, callback) : callback()
    },
    fail: err => {
      wx.showToast({
        title: '本张图片上传失败，请稍后重试',
        icon: 'none'
      })
    }
  })
}

module.exports = {
  formatTime,
  switchNavHandler,
  setStorage,
  getStorage,
  uploadImages
}
