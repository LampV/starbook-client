//index.js
//获取应用实例
const app = getApp()

Component({
    data: {
        iconArray: ["creative", "form", "my"],
        curIcon: "",
    },
    options: {
        addGlobalClass: true,
    },
    created: function(){
        console.log('tabbar created')
    },
    attached: function () {
        console.log('tabbar attached')
        this.setData({
            curIcon: app.globalData.curIcon || iconArray[0]
        })
    },
    detached: function () {
        console.log('tabbar detached')
    },
    methods: {
        iconChange(icon) {
            app.globalData.curIcon = icon
            this.setData({
                curIcon: icon,
            })
            qq.switchTab({
                url: '/pages/' + icon + '/home/home'
            })
        },
        barIconTap(e) {
            let icon = e.target.dataset.icon
            this.iconChange(icon)
        }
    }
})
