import { Search } from "../../models/search"
import { HistoryKeyword } from "../../models/keyword-history"

const history = new HistoryKeyword()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        loading: false,
        hotTags: [],
        toast: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad() {
        const historyTags = history.get()
        const hotTags = (await Search.getHotKeyword()).data.sort(() => 0.5 - Math.random()).filter(k => k.keyword)

        this.setData({
            historyTags,
            hotTags
        })
    },

    async onSearch(e) {
        const keyword = e.detail.name || e.detail.value
        if (!keyword) {
            wx.showToast({
                title: '请输入关键字',
                duration: 1000,
                icon: 'none'
            })
            return
        }
        history.save(keyword)
        const result = (await Search.searchKeyword(keyword)).data

        console.log(result)

        this.setData({
            loading: true,
            search: true,
            toast: false,
            historyTags: history.get()
        })

        wx.lin.renderWaterFlow(result, true)

        if (result.length === 0) {           
            this.setData({
                loading: false,
                toast: true
            })
        } else {
            this.setData({
                loading: false,
                toast: false
            })
        }
    },

    onCancel() {
        this.setData({
            search: false,
            toast: false
        })
    },

    onDeleteHistory() {
        history.clear()
        this.setData({
            historyTags: []
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})