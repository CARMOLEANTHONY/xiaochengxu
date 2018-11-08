import API from '../../server/server.js'
import fetchData from '../../server/fetch.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: null,
    orderDate: '',
    currentIndex: 0,
    currentList: [],
    selectedList: [],
    cost: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getDetail(options.id)
    this.setData({
      orderDate: options.d
    })
  },

  toggleStadium(e) {
    this.setData({
      currentIndex: e.currentTarget.dataset.index
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  getDetail(id) {
    fetchData(API.getStadiumDetail, {
      id
    }, res => {

      let arr = res.data.datas.prices

      let res1 = this.data.orderDate.split(' ')[0]

      let resArr = arr.find(item => item.date.indexOf(res1) != -1)

      if (!resArr) {
        res.data.datas.fields = []

        this.setData({
          detail: res.data.datas,
          currentList: []
        })

        return
      }

      resArr.list.forEach(item => {
        item.price_list.forEach(v => {
          v.isSelect = false
        })
      })


      res.data.datas.fields = resArr.list

      this.setData({
        detail: res.data.datas,
        currentList: resArr.list
      })
    })
  },

  goPay(){
    fetchData(API.payment, {}, res => {
      console.log(res)
    })
  },

  addSelect(e) {
    let arr = this.data.currentList
    let selectArr = this.data.selectedList
    let index = e.currentTarget.dataset.index

    if (arr[this.data.currentIndex].price_list[index].isSelect) return

    arr[this.data.currentIndex].price_list[index].isSelect = true

    selectArr.push({
      name: arr[this.data.currentIndex].field_name,
      time: arr[this.data.currentIndex].price_list[index].time,
      price: arr[this.data.currentIndex].price_list[index].price || 0
    })

    let cost = selectArr.reduce((prev, curr) => {
      return prev + Number(curr.price)
    }, 0)

    this.setData({
      currentList: arr,
      selectedList: selectArr,
      cost
    })

  },

  deleteItem(e) {
    let index = e.currentTarget.dataset.index
    let selectArr = this.data.selectedList
    let currentArr = this.data.currentList

    let res = selectArr.splice(index, 1)[0]

    currentArr.forEach(item => {
      if (item.field_name == res.name) {
        item.price_list.forEach(v => {
          if (v.time == res.time) {
            v.isSelect = false
          }
        })
      }
    })

    let cost

    if (selectArr.length > 0) {
      cost = selectArr.reduce((prev, curr) => {
        return prev + Number(curr.price)
      }, 0)
    } else {
      cost = 0
    }

    this.setData({
      currentList: currentArr,
      selectedList: selectArr,
      cost
    })

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