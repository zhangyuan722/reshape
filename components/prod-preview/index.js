// components/prod-preview/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        data: Object,
        slipping: Boolean
    },

    observers: {
        data: function (data) {
            if (!data) {
                return
            }

            const tags = (data.tags || '').split('#')
            if (tags[tags.length-1] === '') {
                return
            }

            let flag = this.data.flag
            if (!tags) {
                flag = true
            }
            this.setData({
                tags,
                flag
            })
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        tags: '',
        flag: false,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onGotoDetail(e) {
            const id = e.currentTarget.dataset.pid
            wx.navigateTo({
                url:`/pages/work/work?id=${id}`
            })
        },

        onImgLoad(event) {
            const { width, height } = event.detail
            this.setData({
                w: 340,
                h: height * 340 / width
            })
        }
    }
})
