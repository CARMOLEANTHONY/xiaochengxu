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
    }
  },
  ready(){

  }
})