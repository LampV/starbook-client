//index.js
//获取应用实例
const app = getApp()

Component({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: qq.canIUse('button.open-type.getUserInfo')
  },
  options: {
    addGlobalClass: true,
  },
  attached: function () {
    let accountInfo = app.globalData.accountInfo
    if (accountInfo) {
      accountInfo.read_hour = Math.ceil(accountInfo.self_cum_reading / 60)
      this.setData({
        accountInfo: accountInfo
      })
      console.log(accountInfo)
    }

  },
  methods: {
    getUserInfo: function (e) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    },
    SchoolInput(e) {
      this.setData({
        school: e.detail.value
      })
    },
    UserSignUp() {
      if (!(this.data.userInfo && this.data.school)) {
        qq.showToast({
          title: '信息不全！',
          icon: 'none',
        })
      } else {
        qq.request({
          url: app.globalData.remoteIp + '/account/add',
          method: 'POST',
          data: {
            userInfo: this.data.userInfo,
            school: this.data.school,
            openid: app.globalData.openid
          },
          success: res => {
            let accountInfo = res.data.account_info
            accountInfo.read_hour = Math.ceil(accountInfo.self_cum_reading / 60)
            app.globalData.accountInfo = accountInfo
            this.setData({
              accountInfo: accountInfo
            })
          }
        })
      }
    },
    NavToMyNotes() {
      qq.navigateTo({
        url: '/pages/my/notes/notes'
      })
    },
    NavToMyFavors() {
      qq.navigateTo({
        url: '/pages/my/favors/favors'
      })
    },
    setAccountInfo() {
      let accountInfo = app.globalData.accountInfo
      if (accountInfo) {
        accountInfo.read_hour = Math.ceil(accountInfo.self_cum_reading / 60)
      }
      this.setData({
        accountInfo: accountInfo
      })
    }
  }

})
