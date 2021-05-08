// components/rank-list/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        rankList: Array
    },

    observers: {
        'rankList': function (rankList) {
            if (!rankList) {
                return
            }
            if (rankList.length === 0) {
                return
            }
            const left = rankList.find(i => i.num === 1)
            const rightTop = rankList.find(i => i.num === 2)
            const rightBottom = rankList.find(i => i.num === 3)
            this.setData({
                left,
                rightTop,
                rightBottom
            })
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        themeImg: '/images/themes/t-2.png'
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onGotoDetail(e) {
            const id = e.currentTarget.dataset.id
            wx.navigateTo({
                url:`/pages/work/work?id=${id}`
            })
        },
    }
})
