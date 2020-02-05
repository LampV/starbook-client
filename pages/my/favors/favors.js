const app = getApp()
Page({
    data: {
        noteArray: [],
        page: 0
    },
    onLoad() {
        this.getAccountNotes()
    },
    getAccountNotes() {
        let page = this.data.page
        qq.request({
            url: app.globalData.remoteIp + '/record/note/self_favor',
            method: 'POST',
            data: {
                uid: app.globalData.accountInfo.uid,
                page: page
            },
            success: res => {
                let noteArray = this.data.noteArray
                noteArray = noteArray.concat(res.data.notes)
                this.setData({
                    noteArray: noteArray
                })
            }
        })
    },
    changeStatus(e) {
      let note_index = e.detail.index
      let noteArray = this.data.noteArray
      let note = noteArray[note_index]
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
        noteArray: noteArray
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
})