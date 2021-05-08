import { Http } from "../utils/http"
import { DATA_COUNT } from "../core/enum"

let paging = 1

class List {

    async getListData(id) {
        if (!id) {
            return
        }
        
        return await Http.request({
            url: `product_by_category/id/page/count/${id}/1/${DATA_COUNT}`
        })
    }

    async getListMoreData(id) {
        if (getApp().globalData.reset) {
            paging = 1
        }
        getApp().globalData.reset = false
        if (!id) {
            return
        }
        paging++
        return await Http.request({
            url: `product_by_category/id/page/count/${id}/${paging}/${DATA_COUNT}`
        })
    }
}

export {
    List
}