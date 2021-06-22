// components/scroll-list/index.js
Component({

    properties: {
        prodList:Array
    },

    data: {
        themeImg: '/images/themes/t-1.png'
    },

    methods: {
        onGotoDetail(e) {
            const id = e.currentTarget.dataset.id
            wx.navigateTo({
                url:`/pages/work/work?id=${id}`
            })
        }
    }
})
