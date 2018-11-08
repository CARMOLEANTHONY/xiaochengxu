import { switchNavHandler } from '../../utils/util.js'

Component({
  properties: {
    showDefaultSlot: {
      type: Boolean,
      value: true
    },
    datas: {
      type: Array,
      value: []
    }
  },
  data: {
    navItem: 0
  },
  methods: {
    switchNav(e) {
      switchNavHandler(e, this, self => {
        this.triggerEvent("emitNavItem", this.data.navItem)
      })
    },
    goDetails(e) {
      wx.navigateTo({
        url: `/pages/eventDetails/eventDetails?id=${e.currentTarget.dataset.id}`,
      })
    }
  },
  ready() {
  }
})