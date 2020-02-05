
//获取应用实例
const app = getApp()

Component({
  data: {
    renameDict: {
      '周榜': 'week_list',
      '总榜': 'total_list'
    },
    tabArray: [
      '周榜', '总榜'
    ],
    curTabName: '周榜',
    curSwiperName: 'week_list'
  },
  options: {
    addGlobalClass: true,
  },
  attached: function () {
    qq.request({
      url: app.globalData.remoteIp + '/toplist/get_list',
      method: 'GET',
      success: res => {
        console.log(res.data)
        this.setData({
          total_list: res.data.total_list,
          week_list: res.data.week_list
        })
      }
    })
  },
  methods: {
    tabSelect(e) {

      let tabName = e.currentTarget.dataset.tabname
      this.setData({
        curTabName: tabName,
        curSwiperName: this.data.renameDict[tabName]
      })
    },
    SwiperChange(e){
      let index = e.detail.current
      this.setData({
        curTabName: this.data.tabArray[index]
      })
    }
  }
})
