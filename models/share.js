import { config } from "../config/config"
import { Http } from "../utils/http"

class Share {
    static async uploadStep(img, desc, index, id, finished = false) {
        wx.uploadFile({
            url: `${config.apiBaseUrl}product/step`,
            filePath: img,
            name: "step_img",
            header: {
                "Content-Type": "multipart/form-data"
            },
            formData: {
                "step_desc": desc,
                "step": index,
                "product_id": id,
                "finished": finished
            },
            success: (res) => {
                console.log(res.data + '作品步骤信息上传成功')
            },
            fail: (error) => {
                console.log(error)
            }
        })
    }

    static async uploadBasicInfo(info) {
        return await Http.request({
            url: 'product/publish',
            data: {
                title: info.title,
                subtitle: info.subtitle,
                author: info.author,
                contact: info.contact,
                category_id: info.category_id
            },
            method: 'POST',
            success: (res) => {
                console.log(res, '作品基本信息上传成功')
            }
        })
    }
}

export {
    Share
}