const app = getApp()
import API from '../../server/server.js'
import fetchData from '../../server/fetch.js'

Component({
  properties: {
    datas: {
      type: Array,
      default: []
    }
  },
  methods: {
    goToPageDetails(e) {
      wx.navigateTo({
        url: `/pages/postDetails/postDetails?id=${e.currentTarget.dataset.id}`
      })
    },
    addLike(e) {
      let post_id = e.currentTarget.dataset.id
      let index = e.currentTarget.dataset.index
      let user_id = app.globalData.userId
      let item = this.data.datas[index]

      if (item.like_user_ids.includes(user_id)) return wx.showToast({
        title: '请勿重复点赞',
        icon: 'none'
      })

      fetchData(API.addLike, {
        post_id,
        user_id
      }, res => {
        let arr = this.data.datas

        arr.forEach(item => {
          if (item.id == post_id) {
            item.like_num++
            item.like_user_ids.push(user_id)
          }
        })

        this.setData({
          datas: arr
        })
      })
    }
  }
})