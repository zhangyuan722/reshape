//滚动展示时的slogan最小长度
const ROLL_SLOGAN_LENGTH = 22

//首页和列表下拉触底加载更多数据的作品数量
const DATA_COUNT = 6

//分类页面加载默认分类id
const CATEGORY_SHOW_DEFAULT_ID = 4

//搜索页面加载默认热门搜索关键字数量
const HOT_SEARCH_COUNT = 20

//作品详情页面大图模式切换宽度阈值
const IMAGE_MODE_WIDTH = 500

//首页loadmore loading文本
const HOME_LOADING_TEXT = '😁客官请稍等'

//首页loadmore end文本
const HOME_END_TEXT = '😥这次真没了~'

//列表loadmore loading文本
const LIST_LOADING_TEXT = '🎅翻箱倒柜中...'

//列表loadmore end文本
const LIST_END_TEXT = '🙄俺是有底线的'

//点赞轻提示文本
const LIKE_TOAST = [
    '喜欢我就赞我吧！',
    '你的鼓励是最好的陪伴💖',
    '收到你的点赞啦😊',
    '你的在乎让我充满动力~',
    '谢谢你的认可 (๑•̀ㅂ•́)و✧',
    '你的赞是路过我的全世界',
]

const SHARE_NOTICE = {
    title: '分享须知',
    statement: [
        '为了给您带来更好的程序体验，分享功能无需登录或注册，可直接向后台提交作品。',
        '可根据喜好自行设置作者名称，无需真实姓名，联系方式仅用于后台人员发现作品信息需要调整时，与您进行沟通。',
        '发布政治、敏感、色情或其它违反法律法规的图文将无法通过审核，一经发现将立即删除。严重违反将追究法律责任。'
    ]
}

const PRODUCT_DESC = {
    title: '产品介绍'
}

const COPYRIGHT_NOTICE = {
    title: '版权声明',
    statement:
        '一、用户作品版权：\n\n'+
        '1. 用户在塑新发表的原创作品版权归用户本人所有。\n\n' +
        '2. 用户从其他渠道通过复制、截图等方式获取他人内容，并发布在塑新上的，相关内容的版权属于原作者。用户不得侵犯他人包括版权在内的知识产权及其他权利。因用户发布他人作品引发知识产权或其他法律纠纷的，用户须自行承担一切后果，与塑新无关。\n\n' +
        '二、现存作品版权：\n\n' +
        '3. 塑新初步上线的作品主要来源于网络，包括（某某网、某某网），作品来源已在详情页面标注，本项目意在推广废物二次利用，不作任何商业用途，如有侵权，我们深表歉意！望及时联系，我们会尽快删除。\n\n' +
        '三、塑新项目版权：\n\n'+
        '4. 塑新小程序是原创项目，提供的网络服务中包含的标识、版面设计、排版方式均受法律保护，我们热情提倡共同推广环保思想，但未经相关权利人同意，请勿改写、盗版、再发行，或被用于其他任何商业目的。\n\n'
        
}

export {
    ROLL_SLOGAN_LENGTH,
    DATA_COUNT,
    CATEGORY_SHOW_DEFAULT_ID,
    HOT_SEARCH_COUNT,
    IMAGE_MODE_WIDTH,
    HOME_LOADING_TEXT,
    HOME_END_TEXT,
    LIST_LOADING_TEXT,
    LIST_END_TEXT,
    LIKE_TOAST,
    SHARE_NOTICE,
    PRODUCT_DESC,
    COPYRIGHT_NOTICE
}