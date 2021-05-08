import { Http } from "../utils/http"

class HomeData {
    static async getHomeData() {
        return await Http.request({
            url: 'home'
        })
    }
}

export {
    HomeData
}