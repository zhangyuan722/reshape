import { Http } from "../utils/http"

class Category {
    roots = []
    subs = []

    async getAll() {
        const data = await Http.request({
            url: 'category/all'
        })
        this.roots = data.data.filter(r => r.is_root === 'true')
        this.subs = data.data.filter(r => r.is_root === 'false')
    }

    getRoots() {
        return this.roots
    }

    getSubs(parentId) {
        return this.subs.filter(sub => sub.parent_id == parentId)
    }

    getRoot(rootId) {
        return this.roots.find(r => r.id == rootId)
    }
}

export {
    Category
}