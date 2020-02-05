//获取应用实例
const app = getApp()
var util = require('../../../utils/util.js')
Component({
  data: {
    page: 0,
    torchEnd: false
  },
  options: {
    addGlobalClass: true,
  },
  pageLifetimes: {
    // 在回到index页面的时候检测全局信息
    show() {
      console.log('index show (from creative component)')
      if (app.globalData.noteChangeMsg) {
        let noteChangeMsg = app.globalData.noteChangeMsg
        let origin_note = this.data.note_list[noteChangeMsg.note_index]
        let new_note = noteChangeMsg.new_note
        // setdata
        let note_list = this.data.note_list
        note_list[noteChangeMsg.note_index] = new_note
        this.setData({
          note_list: note_list
        })
        // like
        if (origin_note.like_flag != new_note.like_flag) {
          qq.request({
            method: 'POST',
            url: app.globalData.remoteIp + '/account/like',
            data: {
              action: new_note.like_flag,
              nid: new_note.nid,
              uid: app.globalData.accountInfo.uid
            }
          })
        }
        // favor
        if (origin_note.favor_flag != new_note.favor_flag) {
          qq.request({
            method: 'POST',
            url: app.globalData.remoteIp + '/account/favor',
            data: {
              action: new_note.favor_flag,
              nid: new_note.nid,
              uid: app.globalData.accountInfo.uid
            }
          })
        }
        // reset msg
        app.globalData.noteChangeMsg = null
      }
      if (app.globalData.reflash) {
        this.flashCreative()
      }
    },
    pullDownReflash() {
      console.log('flasjhing')
    }
  },
  attached: function () {
    console.log('creative home attached')
    qq.showShareMenu({
      showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment']
    })
    let remoteUrl = app.globalData.remoteIp + '/record/note/list'
    qq.request({
      url: remoteUrl,
      method: 'POST',
      data: {
        page: this.data.page
      },
      success: res => {
        this.setData({
          page: this.data.page + 1,
          note_list: res.data.notes
        })
        // console.log(res.data)
      }
    })
    this.setData({
      remoteUrl: remoteUrl,
      devTool: app.globalData.devTool
    })
  },
  methods: {
    changeStatus(e) {
      let accountInfo = app.globalData.accountInfo
      if (!accountInfo) {
        this.showModal('DialogModal')
        return
      }
      console.log('change status ', e)
      let note_index = e.detail.index
      let note_list = this.data.note_list
      let note = note_list[note_index]
      let flag
      if (e.detail.tapType == 'like') {
        flag = note.like_flag
        note.like_flag = !flag
        note.like_count += flag ? -1 : 1
      }
      if (e.detail.tapType == 'favor') {
        flag = note.favor_flag
        note.favor_flag = !flag
        note.favor_count += flag ? -1 : 1
      }
      this.setData({
        note_list: note_list
      })

      let remoteUrl = app.globalData.remoteIp + '/account/' + e.detail.tapType
      let action = !flag

      qq.request({
        method: 'POST',
        url: remoteUrl,
        data: {
          action: action,
          nid: note.nid,
          uid: app.globalData.accountInfo.uid
        }
      })
    },
    GoSignIn() {
      this.hideModal()
      this.triggerEvent('switchToMy', {}, {})
    },
    showModal(modalName) {
      this.setData({
        modalName: modalName
      })
    },
    hideModal(e) {
      this.setData({
        modalName: null
      })
    },
    navToNewNote: function () {
      let accountInfo = app.globalData.accountInfo
      if (!accountInfo) {
        this.showModal('DialogModal')
        return
      }
      let today = util.formatDate(new Date())
      if (!app.globalData.devTool&&app.globalData.haveSendDate >= today) {
        qq.showToast({
          title: '今天已经记录过了！',
          mask: true,
          icon: 'none',
          duration: 1500
        })
        return
      }
      qq.navigateTo({
        url: '/pages/creative/new_note/new_note'
      })
    },
    flashCreative() {
      console.log('invoke flashCreative')
      let remoteUrl = app.globalData.remoteIp + '/record/note/list'
      qq.request({
        url: remoteUrl,
        method: 'POST',
        data: {
          page: 0
        },
        success: res => {
          this.setData({
            page: 1,
            note_list: res.data.notes
          })
          // console.log(res.data)
        }
      })
    },
    loadMore(){
      console.log('invoke loadMore')
      let remoteUrl = app.globalData.remoteIp + '/record/note/list'
      let note_list = this.data.note_list
      let page = this.data.page
      qq.request({
        url: remoteUrl,
        method: 'POST',
        data: {
          page: page
        },
        success: res => {
          this.setData({
            page: page + 1,
            note_list: note_list.concat(res.data.notes)
          })
          if (res.data.notes.length == 0){
            this.setData({
              torchEnd: true
            })
          }
          // console.log(res.data)
        }
      })
    }
  }
})
