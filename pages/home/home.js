import {
    getWindowWithRpx,
    getWindowHeightRpx
} from "../../utils/system"

import {
    ROLL_SLOGAN_LENGTH,
    HOME_LOADING_TEXT,
    HOME_END_TEXT
} from "../../core/enum"

import { HomeData } from "../../models/home"
import { ProdPaging } from "../../models/prod-paging"

let lock = false
let flag = false

Page({

    data: {
        loading: true,
        windowWidth: 0,
        windowHeight: 0,
        showing: false,
        sloganStatus: 'still',
        loadingType: 'loading',
        loadingText: HOME_LOADING_TEXT,
        endText: HOME_END_TEXT,

        slogan: '',
        banner: [],
        newest: [],
        rank: [],
        recommend: []
    },

    async onLoad(options) {
        this.initAllData()
        this.getWindowSize()
    },

    onReady() {
        this.setData({
            loading: false
        })
    },

    async initAllData() {
        const homeData = (await HomeData.getHomeData()).data
        const data = homeData
        if (typeof data != 'object') {
            if (data != null) {
                data = json.replace("\ufeff", "")
                data = JSON.parse(data)
            }
        }

        const slogans = data.slogan
        wx.setStorageSync('slogans', slogans)
        this.bindSlogan()

        const banner = data.banner.sort((a, b) => a.banner_id - b.banner_id)
        const grid = data.grid
        const illustration = data.illustration
        const newest = data.newest
        const rank = data.rank
        const recommend = data.recommend

        wx.lin.renderWaterFlow(recommend, false)

        this.setData({
            banner,
            grid,
            illustration,
            newest,
            rank
        })

    },

    bindSlogan(e) {
        let slogan = ''
        const slogans = wx.getStorageSync('slogans')
        if (!e) {
            slogan = slogans[0].value
        } else {
            slogan = (wx.getStorageSync('slogans'))[e.detail].value
        }

        if (slogan.length < ROLL_SLOGAN_LENGTH) {
            this.setData({
                slogan,
                sloganStatus: 'still'
            })
        } else {
            this.setData({
                slogan,
                sloganStatus: 'roll'
            }, () => {
                this.selectComponent('#slogan').linFlush()
            })
        }
    },

    onPullDownRefresh: function () {
        wx.stopPullDownRefresh()
        wx.reLaunch({
            url: '/pages/home/home'
        })
    },

    async onReachBottom(e) {
        if (lock) {
            return
        }
        const prodPaging = (await ProdPaging.getLatestPaging()).data
        console.log(prodPaging.recommend)
        wx.lin.renderWaterFlow(prodPaging.recommend, flag)
        if (prodPaging.end) {
            lock = true
            this.setData({
                loadingType: 'end'
            })
        }
    },

    async getWindowSize() {
        const windowWidth = await getWindowWithRpx()
        const windowHeight = await getWindowHeightRpx()
        this.setData({
            windowWidth,
            windowHeight
        })
    },

    onGotoDetail(e) {
        const id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: `/pages/work/work?id=${id}`
        })
    },

    openSloganPanel() {
        this.setData({
            showing: true
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})