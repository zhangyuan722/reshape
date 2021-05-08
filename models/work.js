import { Http } from "../utils/http"

class Work {

    static async getWorkDetailData(id) {
        if (!id) {
            return
        }
        
        return await Http.request({
            url: `product/detail/${id}`
        })
    }
}

export {
    Work
}