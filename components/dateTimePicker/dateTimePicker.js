const date = new Date(),
  years = [],
  months = [],
  days = [],
  hours = [],
  minutes = [];

for (let i = 2018; i <= date.getFullYear() + 5; i++) years.push("" + i)
for (let i = 1; i <= 12; i++) months.push("" + (i < 10 ? "0" + i : i))
for (let i = 1; i <= 31; i++) days.push("" + (i < 10 ? "0" + i : i))
for (let i = 0; i <= 23; i++) hours.push("" + (i < 10 ? "0" + i : i))
for (let i = 0; i < 60; i++) minutes.push("" + (i < 10 ? "0" + i : i))

Component({
  properties: {
    placeHolder: {
      type: String,
      value: '选择时间'
    }
  },
  data: {
    time: '',
    multiArray: [years, months, days, hours, minutes],
    multiIndex: [0, date.getMonth(), date.getDate(), date.getHours(), date.getMinutes()]
  },
  methods: {
    bindMultiPickerChange: function(e) {

      this.setData({
        multiIndex: e.detail.value
      })

      let index = this.data.multiIndex

      this.setData({
        time: `${this.data.multiArray[0][index[0]]}-${this.data.multiArray[1][index[1]]}-${this.data.multiArray[2][index[2]]} ${this.data.multiArray[3][index[3]]}:${this.data.multiArray[4][index[4]]}`
      })

      this.triggerEvent('getResult', { data: this.data.time})
    },
    bindMultiPickerColumnChange: function(e) {

      let data = {
        multiArray: this.data.multiArray,
        multiIndex: this.data.multiIndex
      };

      data.multiIndex[e.detail.column] = e.detail.value;

      this.setData(data);
    }
  }
})