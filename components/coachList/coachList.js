Component({
  properties: {
    datas: {
      type: Array,
      value: []
    }
  },
  methods: {
    goDetail(e){
      wx.navigateTo({
        url: `/pages/coachDetail/coachDetail?id=${e.currentTarget.dataset.id}`,
      })
    }
  }
})