// components/category-grid/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    bgImg: String,
    grid: Array
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
    gotoCategoryList(e) {
      const id = e.currentTarget.dataset.id
      const name = e.currentTarget.dataset.name

      wx.navigateTo({
        url:`/pages/list/list?id=${id}&name=${name}`
      })
    }
  }
})