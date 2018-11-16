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
    addLike(e){
      let post_id = e.currentTarget.dataset.id
      let user_id = app.globalData.userId

      fetchData(API.addLike, { post_id, user_id }, res => {
        console.log(res)
      })
    }
  },
  ready(){

  }
})