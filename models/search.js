import { Http } from "../utils/http"
import { HOT_SEARCH_COUNT } from "../core/enum"

class Search {

    static async getHotKeyword() {
        return await Http.request({
            url: `hot/search/${HOT_SEARCH_COUNT}`
        })
    }

    static async searchKeyword(keyword) {
        return await Http.request({
            url: `product/search/${keyword}`
        })
    }
}

export {
    Search
}