import { Http } from "../utils/http"
import { DATA_COUNT } from "../core/enum"

let paging = 0

class ProdPaging {
    static async getLatestPaging() {
        paging++
        return await Http.request({
            url: `more/page/${paging}/count/${DATA_COUNT}`
        })
    }
}

export {
    ProdPaging
}