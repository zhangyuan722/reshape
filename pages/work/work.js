import { Work } from "../../models/work"

import { Like } from "../../models/like"

import {
    LIKE_TOAST,
    IMAGE_MODE_WIDTH
} from "../../core/enum"

let stepImgs = []
let id = -1
let likeNum = -1

Page({

    /**
     * 页面的初始数据
     */
    data: {
        loading: true,
        show: true,
        showType: 'fade-up',
        detail: {},
        tags: [],
        liking: false,
        likeNum: 0,
        scrollTop: 0,
        mode: 'aspectFill',
        likeIcon: 'gif',
        toast: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        
        id = options.id
        if (id === -1) {
            return
        }
        this.initDetailData(id)
    },

    async initDetailData(id) {
        const detail = (await Work.getWorkDetailData(id)).data
        let tags = []

        stepImgs = detail.steps.map(i => i.step_img)

        if (detail.tags !== '' && detail.tags !== null) {
            tags = detail.tags.split('#')
        }

        const liking = wx.getStorageSync(`like-${id}`)

        if (!liking) {
            wx.setStorageSync(`like-${id}`, false)
        }
        likeNum = detail.praise
        
        this.setData({
            detail,
            tags,
            liking,
            likeNum,
            loading: false
        })
    },

    async onLikeGif(e) {
        if (e) {
            setTimeout(await this.timer, 400)
        }
    },

    timer() {
        this.setData({
            likeIcon: 'png'
        })
    },

    onSticky() {
        this.setData({
            show: false
        })
    },

    onUnsticky() {
        this.setData({
            show: true,
            showType: 'fade-down'
        })
    },

    onLoadImg(e) {
        if (e.detail.width < IMAGE_MODE_WIDTH) {
            this.setData({
                mode: 'aspectFit'
            })
        } else {
            this.setData({
                mode: 'aspectFill'
            })
        }
    },

    async onLike() {
        const status = wx.getStorageSync(`like-${id}`)

        wx.setStorageSync(`like-${id}`, !status)
        console.log(!status)

        await Like.bindLike(id, !status)

        likeNum = status ? likeNum - 1 : likeNum + 1
        console.log(likeNum)
        if (!status) {
            wx.showToast({
                title: LIKE_TOAST[Math.floor(Math.random() * LIKE_TOAST.length)],
                duration: 1000,
                icon: 'none'
            })
        }

        this.setData({
            likeNum,
            liking: !status,
            likeIcon: 'gif',
            toast: !status
        })
    },

    onPageScroll(e) {
        wx.lin.setScrollTop(e.scrollTop)
    },

    preview(e) {
        wx.previewImage({
            current: e.detail.img,
            urls: stepImgs
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