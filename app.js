//app.js
App({
  onLaunch: function () {
    // 设置导航标题
    // 设置remote url
    console.log('app on launch')
    try {
      const res = qq.getSystemInfoSync()
      let useDev = false;
      if (res.brand == 'devtools' && useDev) {
        this.globalData.remoteIp = 'http://127.0.0.1:5000',
          this.globalData.devTool = true
      } else {
        this.globalData.remoteIp = 'https://hyunee.top',
          this.globalData.devTool = false
      }
    } catch (e) {

    }

    // 登录

    let haveSendDate = qq.getStorageSync('haveSendDate')
    this.globalData.haveSendDate = haveSendDate

    // 获取今天是否发送过


    console.log('launch end')
  },
  globalData: {
    userInfo: null,
    curIcon: 'creative',
    readLevelDict: {
      1: '白丁',
      5: '童生',
      15: '秀才',
      30: '举人',
      50: '贡生',
      100: '进士',
      200: '探花',
      500: '榜眼',
      1000: '状元',
      2000: '大帅',
      3000: '文豪',
      6000: '圣贤',
      10000: '伟人'
    }
  },
  userLogin: function () {
    let promise = new Promise((resolve, reject) => {
      let openid = qq.getStorageSync('openid')
      if (!openid) {
        qq.login({
          success: res => {
            console.log('no openid')
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            if (res.code) {
              // 发起网络请求
              qq.request({
                url: this.globalData.remoteIp + '/account/login',
                method: 'POST',
                data: {
                  code: res.code
                },
                success: res => {
                  console.log('login return msg:', res.data)
                  // 将信息存储到globalData以及storage
                  this.globalData.openid = res.data.openid
                  this.globalData.accountInfo = res.data.account_info
                  qq.setStorage({
                    key: "openid",
                    data: res.data.openid
                  })
                  resolve()
                },
                fail: err => {
                  reject(err)
                }
              })
            } else {
              reject('登录失败！' + res.errMsg)
            }
          }
        })
      } else {
        this.globalData.openid = openid
        console.log(this.globalData.remoteIp)
        qq.request({
          // TODO 这里this.globalData.remoteIp是undified
          url: this.globalData.remoteIp + '/account/get_info',
          method: 'POST',
          data: {
            openid: openid
          },
          success: res => {
            // 将信息存储到globalData
            this.globalData.accountInfo = res.data.account_info
            resolve(res)
          },
          fail: err => {
            reject(err)
          }
        })
      }
    })
    return promise
  }
})
