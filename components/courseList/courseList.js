Component({
  properties: {
    datas: {
      type: Array,
      value: []
    },
    needTop: {
      type: Boolean,
      value: true
    }
  },
  ready(){

  },
  methods: {
    goDetails(e) {
      wx.navigateTo({
        url: `/pages/courseDetails/courseDetails?id=${e.currentTarget.dataset.id}`,
      })
    }
  }
})