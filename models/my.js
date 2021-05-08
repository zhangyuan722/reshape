import { Http } from "../utils/http";

class My {
    static async getTeamData() {
        return await Http.request({
            url: 'team/detail'
        })
    }
}

export {
    My
}