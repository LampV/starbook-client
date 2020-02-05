//获取应用实例
const app = getApp()
var util = require('../../../utils/util.js')
Page({
  data: {
    showCanvas: false,
    index: null,
    imgList: [],
    durationArray: Array.from(new Array(24), (v, i) => { return i * 5 + 5 })
  },
  onLoad: function () {

    if (!app.globalData.accountInfo) {
      app.userLogin().then(res => {
        let user = app.globalData.accountInfo
        user.reading_hour = Math.ceil(user.self_cum_reading / 60)
        this.setData({
          user: user
        })
      })
    } else {
      let user = app.globalData.accountInfo
      user.reading_hour = Math.ceil(user.self_cum_reading / 60)
      this.setData({
        user: user
      })
    }
  },
  showModal(e) {
    this.setData({
      modalName: 'Modal'
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  ChooseImage() {
    qq.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    })
  },
  ViewImage(e) {
    qq.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    qq.showModal({
      title: '确定要删除吗？',
      cancelText: '再看看',
      confirmText: '再见',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  DurationChange(e) {
    this.setData({
      cur_duration: this.data.durationArray[e.detail.value]
    })
  },
  SubmitNote(e) {
    console.log('start submit')
    let today = util.formatDate(new Date())
    if (app.globalData.haveSendDate >= today) {
      qq.showToast({
        title: '发送失败，今天已经记录过了！',
        mask: true,
        icon: 'none',
        duration: 1500
      })
      return
    }
    let book_name = this.data.bookName
    let cur_duration = this.data.cur_duration
    let text_content = this.data.textContent
    console.log(book_name, cur_duration, text_content)
    if (!book_name) {
      qq.showToast({
        title: '书名为空！',
        mask: true,
        icon: 'none',
        duration: 1500
      })
      return
    }
    if (!cur_duration) {
      qq.showToast({
        title: '时长为空！',
        mask: true,
        icon: 'none',
        duration: 1500
      })
      return
    }
    if (!text_content) {
      qq.showToast({
        title: '笔记为空！',
        mask: true,
        icon: 'none',
        duration: 1500
      })
      return
    }
    console.log('start request')
    qq.request({
      url: app.globalData.remoteIp + '/records/note/send',
      method: 'POST',
      data: {
        uid: app.globalData.accountInfo.uid,
        book_name: book_name,
        cur_duration: cur_duration,
        text_content: text_content
      },
      success: res => {
        if (res.data.permission == 'invalid') {
          // 说明今天发过了
          qq.showToast({
            title: '发送失败，今天已经记录过了！',
            mask: true,
            icon: 'none',
            duration: 1500
          })
        } else {
          this.CheckLevel(app.globalData.accountInfo.self_cum_reading, res.data.account_info.self_cum_reading)
          let accountInfo = res.data.account_info
          accountInfo.read_duration = cur_duration
          accountInfo.reading_hour = Math.ceil(accountInfo.self_cum_reading / 60)
          app.globalData.accountInfo = accountInfo
          app.globalData.reflash = true
          this.MyDrawPost()
        }
        // 无论如何都说明发过了
        let date = util.formatDate(new Date())
        app.globalData.haveSendDate = date
        qq.setStorage({
          key: 'haveSendDate',
          data: date
        })

      }
    })
  },
  MyDrawPost1() {
    this.hideModal()
    let accountInfo = app.globalData.accountInfo
    accountInfo.read_duration = 120
    this.DrawPost(accountInfo)
    this.setData({
      showCanvas: true
    })
  },
  MyDrawPost() {
    this.hideModal()
    let accountInfo = app.globalData.accountInfo
    this.DrawPost(accountInfo)
    this.setData({
      showCanvas: true
    })
  },
  DrawPost(accountInfo) {
    wx.getImageInfo({
      src: app.globalData.remoteIp + '/img/post_bkg',
      success: (res) => {
        let context = qq.createCanvasContext('mycanvas')
        let bkg_path = res.path
        wx.getImageInfo({
          src: accountInfo.avatar,
          success: (res) => {
            this.DrawWithCanvas(context, bkg_path, accountInfo, res.path)
          }
        })
        
      },
      fail: (err) => { this.DrawPost(accountInfo) }
    })
  },
  DrawWithCanvas(context, bkgPath, accountInfo, avatarPath) {

    context.drawImage(bkgPath, 0, 0, 375, 667) //以iPhone 6尺寸大小为标准绘制图片
    this.setAccountInfo(context, accountInfo, avatarPath)
    context.draw(false, () => {
      wx.canvasToTempFilePath({
        canvasId: 'mycanvas',
        success: res => {
          this.setData({
            tempFilePath: res.tempFilePath
          })
          qq.showToast({
            icon: 'none',
            title: '发送成功，长按保存海报'
          })
          console.log(res.tempFilePath)
        },
        fail: function (res) {
          console.log(res.errMsg)
        }
      })
    })
  },
  setAccountInfo(context, accountInfo, avatarPath) {
    // nickname
    let nickname = accountInfo.nickname
    context.setTextAlign('center')
    context.setFillStyle('#999999')
    context.setFontSize(16)
    context.fillText(nickname, 187.5, 360, 375)

    context.beginPath()
    context.setFillStyle('#fbbd08')
    context.setLineWidth(20)
    context.setTextAlign('center')
    context.setFontSize(46)

    let readingHour = accountInfo.reading_hour
    context.fillText(readingHour, 240, 455, 60)

    let noteCount = accountInfo.self_note_count
    context.fillText(noteCount, 112, 560, 60)

    let contiousCount = accountInfo.contious_count
    context.fillText(contiousCount, 240, 560, 60)

    let readDuration = accountInfo.read_duration
    context.fillText(readDuration, 112, 455, 60)
    // avatar
    let r = 75
    let sx = 187.5 - r
    let sy = 180
    let cx = sx + r
    let cy = sy + r
    context.arc(cx, cy, r, 0, 2 * Math.PI)
    context.clip()
    console.log(accountInfo.avatar)
    context.drawImage(avatarPath, sx, sy, 2 * r, 2 * r)


  },
  SaveCanvas() {
    console.log('savecanvas')
    qq.getSetting({
      success: res => {
        if (res.authSetting['scope.writePhotosAlbum']) {
          qq.saveImageToPhotosAlbum({
            filePath: this.data.tempFilePath,
            success: () => {
              wx.showToast({
                title: '图片保存成功，快去分享吧~',
                icon: 'none',
                duration: 2000
              })
            },
            fail: () => {
              wx.showToast({
                title: '保存失败',
                icon: 'none'
              })
            }
          })
        } else {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              wx.saveImageToPhotosAlbum({
                filePath: this.data.tempFilePath,
                success() {
                  that.setData({
                    showShareImg: false
                  })
                  wx.showToast({
                    title: '图片保存成功，快去分享吧~',
                    icon: 'none',
                    duration: 2000
                  })
                },
                fail() {
                  wx.showToast({
                    title: '保存失败',
                    icon: 'none'
                  })
                }
              })
            },
            fail() {
              // 如果用户拒绝过或没有授权，则再次打开授权窗口
              console.log('请设置允许访问相册')
              wx.showToast({
                title: '请设置允许访问相册',
                icon: 'none'
              })
            }
          })
        }
      }
    })
    // qq.saveImageToPhotosAlbum({
    //   filePath: this.data.tempFilePath,
    //   success: res => { }
    // })
  },
  SubmitNoteTest(e) {

    let book_name = this.data.bookName
    let cur_duration = this.data.cur_duration
    let text_content = this.data.textContent
    if (!book_name) {
      qq.showToast({
        title: '书名为空！',
        mask: true,
        icon: 'none',
        duration: 1500
      })
      return
    }
    if (!cur_duration) {
      qq.showToast({
        title: '时长为空！',
        mask: true,
        icon: 'none',
        duration: 1500
      })
      return
    }
    if (!text_content) {
      qq.showToast({
        title: '笔记为空！',
        mask: true,
        icon: 'none',
        duration: 1500
      })
      return
    }
    qq.request({
      url: app.globalData.remoteIp + '/records/note/send_test',
      method: 'POST',
      data: {
        uid: app.globalData.accountInfo.uid,
        book_name: book_name,
        cur_duration: cur_duration,
        text_content: text_content
      },
      success: res => {
        if (res.data.permission == 'invalid') {
          // 说明今天发过了
          qq.showToast({
            title: '发送失败，今天已经记录过了！',
            mask: true,
            icon: 'none',
            duration: 1500
          })
        } else {
          let accountInfo = res.data.account_info
          accountInfo.read_duration = cur_duration
          accountInfo.reading_hour = Math.ceil(accountInfo.self_cum_reading / 60)
          app.globalData.accountInfo = accountInfo
          app.globalData.reflash = true
          this.MyDrawPost()
        }
        // 无论如何都说明发过了
        let date = util.formatDate(new Date())
        app.globalData.haveSendDate = date
        qq.setStorage({
          key: 'haveSendDate',
          data: date
        })

      }
    })
  },
  CheckLevel(origin_reading, new_reading) {
    console.log('origin_reading, new_reading', origin_reading, new_reading)
    let readLevelDict = app.globalData.readLevelDict
    for (let key in readLevelDict) {
      let divide_line = key * 60
      console.log('divide_line', divide_line)
      if (origin_reading < divide_line && new_reading >= divide_line) {
        console.log('恭喜您获得「' + readLevelDict[key] + '」称号！')
        qq.showToast({
          icon: 'none',
          title: '恭喜您获得「' + readLevelDict[key] + '」称号！'
        })
      }
    }
  },
  BookInput(e){
    this.setData({
      bookName: e.detail.value
    })
  },
  TextInput(e){
    this.setData({
      textContent: e.detail.value
    })
  }
})