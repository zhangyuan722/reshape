let counter = 0
let customSlogan = 'undefined'
let clickSave
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        value: String,
        windowWidth: Number,
        windowHeight: Number
    },

    /**
     * 组件的初始数据
     */
    data: {
        custom: false
    },

    observers: {
        'value': function (value) {
            if (!value) {
                return
            }
            if (value.length === 0) {
                return
            }
            this.setData({
                title: value
            })
        }
    },


    /**
     * 组件的方法列表
     */
    methods: {
        onNext() {
            counter++
            if (counter >= 10) {
                counter = Math.floor(Math.random() * 10)
            }
            this.triggerEvent('next', counter)
        }
    }
})
