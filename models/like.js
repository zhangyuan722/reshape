import { Http } from "../utils/http"

class Like{
    static async bindLike(id,like) {
        await Http.request({
            url:`product/praise/${id}/${like}`
        })
    }
}

export {
    Like
}