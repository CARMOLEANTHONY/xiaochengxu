Component({
  methods: {
    goToPage(e) {
      wx.navigateTo({
        url: `/pages/movementDetails/movementDetails?id=${e.currentTarget.dataset.index}`
      })
    }
  },
  properties: {
    datas: {
      type: Array,
      default: []
    }
  },
  ready(){
    // console.log(this.properties)
  }
})