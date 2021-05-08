import { List } from "../../models/list"
import {
    DATA_COUNT,
    LIST_LOADING_TEXT,
    LIST_END_TEXT
} from "../../core/enum"

const list = new List()
let id

let flag = false

Page({

    /**
     * 页面的初始数据
     */
    data: {
        loadingType: 'loading',
        loadingText: LIST_LOADING_TEXT,
        endText: LIST_END_TEXT
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        id = options.id
        this.setTitle(options.name)
        this.initData()
    },

    async initData() {
        const listData = (await list.getListData(id)).data
        this.bindData(listData)
    },

    bindData(data) {
        if (data.end || data.product.length === 0) {
            this.setData({
                loadingType: 'end'
            })
            return
        }
        wx.lin.renderWaterFlow(data.product, flag, this.changeToLoading())
        if (!data.end) {
            flag = false
        } else {
            this.changeToEnd()
        }

        if (data.product.length < DATA_COUNT) {           
            this.changeToEnd()
        }
    },

    onReachBottom: function () {
        this.getMoreData()
    },

    async getMoreData() {
        const moreData = (await list.getListMoreData(id)).data
        this.bindData(moreData)
    },

    onUnload() {
        getApp().globalData.reset = true
    },

    onPullDownRefresh: function () {
        flag = true
        getApp().globalData.reset = true
        this.initData()
        wx.stopPullDownRefresh()
    },

    changeToLoading() {
        this.setData({
            loadingType: 'loading'
        })
    },

    changeToEnd() {
        this.setData({
            loadingType: 'end'
        })
    },

    setTitle(name) {
        wx.setNavigationBarTitle({
            title: name
        })
    }
})