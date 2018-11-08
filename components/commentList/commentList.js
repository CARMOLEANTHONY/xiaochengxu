import API from '../../server/server.js'
import fetchData from '../../server/fetch.js'

const app = getApp()

Component({
  properties: {
    datas: {
      type: Array,
      value: []
    },
    needLike: {
      type: Boolean,
      value: true
    }
  },
  methods: {
    addLike(e) {
      let post_id = e.currentTarget.dataset.id
      let user_id = app.globalData.userId

      fetchData(API.addLike, { post_id, user_id }, res => {
        this.triggerEvent("updateData")
      })
    }
  }
})