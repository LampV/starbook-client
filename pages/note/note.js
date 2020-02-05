//获取应用实例
const app = getApp()

Page({
    data: {
        iconArray: ['']
    },

    onLoad: function (options) {
        let remoteUrl = app.globalData.remoteIp + '/record/note/details'
        qq.request({
            url: remoteUrl,
            method: 'POST',
            data: {
                noteid: options.noteid
            },
            success: res => {
                this.setData({
                    note: res.data.note,
                    comments: res.data.comments
                })
                console.log(res.data)
            }
        })
        this.setData({
            note_index: options.note_index
        })
    },
    commentInput: function (e) {
        this.setData({
            cur_comment: e.detail.value
        })
    },
    triggleNoteLikeChange: function () {
        let note = this.data.note
        let like_flag = note.like_flag
        note.like_flag = !like_flag
        note.like_count += like_flag ? -1 : 1
        this.setData({
            note: note
        })
        app.globalData.noteChangeMsg = {
            note_index: this.data.note_index,
            new_note: note
        }
    },
    triggleNoteFavorChange: function () {
        let note = this.data.note
        let favor_flag = note.favor_flag
        note.favor_flag = !favor_flag
        note.favor_count += favor_flag ? -1 : 1
        this.setData({
            note: note
        })
        app.globalData.noteChangeMsg = {
            note_index: this.data.note_index,
            new_note: note
        }
    },
    sendComment: function (e) {
        if (!this.data.cur_comment) {
            console.log('12344')
            wx.showToast({
                title: '评论内容为空！',
                mask: true,
                icon: 'none',
                duration: 1500
            })
        }
        else {
            let note = this.data.note
            note.comment_count += 1
            this.setData({
                note: note
            })
            app.globalData.noteChangeMsg = {
                note_index: this.data.note_index,
                new_note: note
            }
            let remoteUrl = app.globalData.remoteIp + '/records/comment/send'
            qq.request({
                url: remoteUrl,
                method: 'POST',
                data: {
                    nid: this.data.note.nid,
                    uid: app.globalData.accountInfo.uid,
                    cur_comment: this.data.cur_comment
                },
                success: res => {
                    this.setData({
                        comments: res.data.comments,
                        cur_comment: ''
                    })
                }
            })
        }
    }
})
