//获取应用实例
const app = getApp()

Component({
    data: {
        page: 0
    },
    properties: {
        note: Object,
        index: Number
    },
    options: {
        addGlobalClass: true,
    },
    methods: {
        componentNavToNote(e) {
            console.log('nav to note ', this.data.note.nid)
            qq.navigateTo({
                url: "/pages/note/note?noteid=" + this.data.note.nid + '&note_index=' + this.data.index
            })
        },
        triggleLikeChange() {
            const myEventDetail = {
                index: this.data.index,
                tapType: 'like'
            } // detail
            const myEventOption = {} // 触发事件的选项
            this.triggerEvent('statuschange', myEventDetail, myEventOption)
        },
        triggleFavorChange() {
            const myEventDetail = {
                index: this.data.index,
                tapType: 'favor'
            } // detail
            const myEventOption = {} // 触发事件的选项
            this.triggerEvent('statuschange', myEventDetail, myEventOption)
        }
    }
})
