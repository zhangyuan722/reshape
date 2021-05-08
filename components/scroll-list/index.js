// components/scroll-list/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        prodList:Array
    },

    /**
     * 组件的初始数据
     */
    data: {
        themeImg: '/images/themes/t-1.png'
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
        }
    }
})
