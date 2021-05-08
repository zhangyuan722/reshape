import { Category } from "../../models/category"
import { Share } from "../../models/share"
import { SHARE_NOTICE } from "../../core/enum"
const category = new Category()
let rootOption = []
let subOption = []
let root = ''
let sub = ''
let rootId = -1
let subId = -1

let info = {}
let workId = -1

let stepImgs = []

let lock = false

Page({

    /**
     * 页面的初始数据
     */
    data: {
        steps: [{}],
        showStep: false,
        submitBtn: false,
        categoryToast: false,
        rules: [{
            required: true,
            whitespace: true,
            message: '请填写完整哦'
        }],
        categoryRule: [{
            required: true,
            message: '分享心得 助力环保'
        }],
        categories: [],
        dialog: false,
        notice: SHARE_NOTICE
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.lin.initValidateForm(this)
        this.getCategoryData()
    },

    async submit(e) {
        info = e.detail.values
        info['category_id'] = subId
        console.log(info)
        if (Object.values(info).some(i => i === '')) {
            wx.showToast({
                title: '信息未填写完整',
                icon: 'none',
                duration: 800
            })
            return
        }

        if (!lock) {
            workId = (await Share.uploadBasicInfo(info)).data.product_id
            console.log(workId)
        }
        this.setData({
            showStep: true
        })
        lock = true
    },

    addStep(e) {

        wx.lin.submitForm('work')
        const imgAndDesc = this.getLastImgAndDesc()
        console.log(imgAndDesc)

        if (e.currentTarget.dataset.finished) {
            Share.uploadStep(imgAndDesc.lastImg, imgAndDesc.lastDesc, imgAndDesc.stepIndex, workId, 'true')
            wx.showToast({
                title: '上传成功，即将跳转至首页',
                icon: 'none'
            })
            setTimeout(() => {
                wx.reLaunch({
                    url: '/pages/home/home'
                })
            }, 2000);
        } else {
            Share.uploadStep(imgAndDesc.lastImg, imgAndDesc.lastDesc, imgAndDesc.stepIndex, workId)
            this.data.steps.push({})
        }
        this.setData({
            steps: this.data.steps
        })
    },

    addImg(e) {
        stepImgs = stepImgs.concat({
            index: e.currentTarget.dataset.index,
            img: e.detail.current
        })
    },

    removeImg(e) {
        const index = e.currentTarget.dataset.index
        stepImgs.splice(index, 1)
    },

    getLastImgAndDesc() {
        const regex = /^desc*/
        const descArr = Object.keys(info).filter(i => regex.test(i))

        const lastDescKey = descArr[descArr.length - 1]

        const lastDesc = info[lastDescKey]
        console.log(lastDesc)

        const lastImgTarget = stepImgs.filter(i => i.index === descArr.length - 1)[0]
        if (!lastImgTarget) {
            return
        }
        const lastImg = (lastImgTarget.img)[0]
        const stepIndex = lastImgTarget.index + 1
        console.log(stepIndex)
        console.log(lastImg)
        return {
            lastImg,
            lastDesc,
            stepIndex
        }
    },

    deleteStep() {
        const index = stepImgs.findIndex(i => i.index === this.data.steps.length - 1)
        stepImgs.splice(index, 1)
        console.log(stepImgs)
        const steps = this.data.steps
        if (steps.length === 1) {
            wx.showToast({
                title: '至少有一步哦',
                icon: 'none',
                duration: 800
            })
            return
        }
        steps.shift()
        this.setData({
            steps
        })
    },

    onCategoryConfirm(e) {
        const result = e.detail.value
        rootId = result[0] + 1
        root = (rootOption.filter(i => i.id === rootId))[0].name
        sub = (subOption.filter(i => i.parent_id === rootId))[result[1]].name
        subId = (subOption.filter(i => i.parent_id === rootId))[result[1]].id
        this.setData({
            root,
            sub,
            categoryToast: true
        })
    },

    getSubsFromRoot(id) {
        const subs = subOption.filter(i => i.parent_id === id).map(i => i.name)
        this.data.categories[1] = subs
        this.setData({
            categories: this.data.categories
        })
    },

    async getCategoryData() {
        this.data.category = category
        await category.getAll()

        rootOption = this.data.category.roots
        subOption = this.data.category.subs

        const roots = this.data.category.roots.map(i => i.name)
        const subs = this.data.category.subs.filter(i => i.parent_id === 1).map(i => i.name)

        this.data.categories.push(roots)
        this.data.categories.push(subs)

        this.setData({
            categories: this.data.categories
        })
    },

    onSelect(e) {
        if (e.detail.column !== 0) {
            return
        }
        this.getSubsFromRoot(e.detail.value + 1)
    },
})