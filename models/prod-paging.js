import { Http } from "../utils/http"
import { DATA_COUNT } from "../core/enum"

class ProdPaging {
    static async getLatestPaging(paging) {
        console.log(paging);
        paging++
        return await Http.request({
            url: `more/page/${paging}/count/${DATA_COUNT}`
        })
    }
}

export {
    ProdPaging
}