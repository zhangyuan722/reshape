// components/sub-category/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        categories: Array,
        bannerImg: String,
        height: Number
    },

    /**
     * 组件的初始数据
     */
    data: {
        
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onTapGridItem(e) {
            const { id, name } = e.currentTarget.dataset

            wx.navigateTo({
                url: `/pages/list/list?id=${id}&name=${name}`
            })
        }
    }
})
