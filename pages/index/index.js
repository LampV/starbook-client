//获取应用实例
const app = getApp()

Page({
  data: {
    iconArray: ["creative", "upstage", "my"],
    curIcon: "",
  },
  onPullDownRefresh: function () {
    this.selectComponent("#creative").flashCreative();
    qq.stopPullDownRefresh()
  },
  onReachBottom: function () {
    if (this.data.curIcon == "creative") {
      this.selectComponent("#creative").loadMore();
    }
  },
  onLoad: function () {
    console.log('index load')
    // 页面加载时将当前页面设置为第0个
    app.userLogin().then(res => {
      this.setData({
        curIcon: this.data.iconArray[0],
      })
      this.selectComponent("#my").setAccountInfo();
    })
  },
  barIconTap: function (e) {
    this.setData({
      curIcon: e.target.dataset.icon,
    })
  },
  SwitchToMy() {
    this.setData({
      curIcon: 'my',
    })
  }
})
