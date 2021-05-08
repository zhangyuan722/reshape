import { getWindowHeightRpx } from "../../utils/system"
import { Category } from "../../models/category"
import { CATEGORY_SHOW_DEFAULT_ID } from "../../core/enum"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        segHeight: 0,
        subH: 0,
        category: [],
        defaultRootId: CATEGORY_SHOW_DEFAULT_ID
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setDynamicSegmentHeight()
        this.initCategoryData()
    },

    async initCategoryData() {
        const category = new Category()
        this.data.category = category
        await category.getAll()

        const roots = category.getRoots()
        const defaultRoot = this.getDefaultRoot(roots)
        const currentSubs = category.getSubs(defaultRoot.id)

        this.setData({
            roots,
            currentSubs,
            currentBannerImg: defaultRoot.img
        })
    },

    getDefaultRoot(roots) {
        let defaultRoot = roots.find(r => r.id === this.data.defaultRootId)
        if (!defaultRoot) {
            defaultRoot = roots[0]
        }
        return defaultRoot
    },

    onSegChange(e) {
        const rootId = e.detail.activeKey
        const currentSubs = this.data.category.getSubs(rootId)
        const currentRoot = this.data.category.getRoot(rootId)

        this.setData({
            currentSubs,
            currentBannerImg: currentRoot.img
        })
    },

    async setDynamicSegmentHeight() {
        const windowHeightRpx = await getWindowHeightRpx()
        const h = windowHeightRpx - 60 - 20 - 2
        const subH = windowHeightRpx - 60 - 20 - 2 - 200 - 16 - 100 - 24 - 6
        this.setData({
            segHeight: h,
            subH,
        })
    },

    onGotoSearch() {
        wx.navigateTo({
            url: '/pages/search/search'
        })
    }
})