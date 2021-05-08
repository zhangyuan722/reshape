import {
    PRODUCT_DESC,
    COPYRIGHT_NOTICE
} from "../../core/enum"
import { My } from "../../models/my"

const likeList = new Set()
let clearedAll = false
let clearedPortion = false

let aboutUsImg = ''
Page({

    /**
     * 页面的初始数据
     */
    data: {
        teamData: {},
        like: 0,
        share: 0,
        publish: 0,
        iconSize: 30,
        gap: 30,
        dialog: false,
        prodDesc: PRODUCT_DESC,
        copyright: COPYRIGHT_NOTICE
    },

    onLoad() {
        this.getTeamData()
    },

    async getTeamData() {
        const teamData = ((await My.getTeamData()).data)[0]
        aboutUsImg = teamData.about_img
        this.setData({
            teamData
        })
    },

    getMyLikeList() {
        const regex = /^like-*/

        let storage = {}

        try {
            storage = wx.getStorageInfoSync()
        } catch (e) {
            console.log(e)
            return
        }

        storage.keys.map(i => {
            if (!regex.test(i)) {
                return
            }

            if (wx.getStorageSync(i)) {
                likeList.add(i)
            } else {
                if (likeList.has(i)) {
                    likeList.delete(i)
                }
            }
        })

        this.setData({
            like: likeList.size
        })
    },

    onShow() {
        this.getMyLikeList()
    },

    onMyShare() {
        this.showToast('抱歉~ 暂未开放该功能', 1000)
    },

    onConfirm() {
        wx.removeStorageSync('keywords')
        this.showToast('已完成')
        clearedPortion = true
    },

    onCancel() {
        const regex = /^like-*/
        wx.removeStorageSync('keywords')
        wx.getStorageInfo({
            success(res) {
                res.keys.map(i => {
                    if (regex.test(i)) {
                        wx.removeStorageSync(i)
                    }
                })

            }
        })
        this.showToast('已完成')
        this.setData({
            like: 0,
            share: 0
        })
        clearedAll = true
    },

    tapClear() {
        if (clearedAll) {
            this.showToast('请勿重复清除哦')
            return
        }
        if (clearedPortion) {
            clearedAll = true
        }
        this.setData({
            dialog: true
        })
    },

    toastInfo(e) {
        switch (e.currentTarget.dataset.id) {
            case '0':
                wx.showToast({
                    title: `塑新已有${e.currentTarget.dataset.info}次浏览量`,
                    icon:'none'
                })
                break
            case '1':
                wx.showToast({
                    title: `塑新作品共收获${e.currentTarget.dataset.info}个赞`,
                    icon:'none'
                })
                break
        }
        
    },

    aboutUs() {
        console.log(aboutUsImg)
        wx.previewImage({
            current: aboutUsImg,
            urls: [aboutUsImg]
        })
    },

    showToast(title, duration = 800) {
        wx.showToast({
            title,
            duration,
            icon: 'none'
        })
    }
})