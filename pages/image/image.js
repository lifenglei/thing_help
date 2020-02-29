var detail = '../content/content'
Page({
  data: {
    list: [],
    maxtime: '',
    loadingHidden: false,
    page:1,
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.requestData('list');

  },
  /**
   * 滚动到底部时加载下一页
   */
  onReachBottom: function () {
    console.log('到底部')
    this.setData({
      page:this.data.page+1
    })
    this.requestData('list');
  },
  /**
   * 加载数据
   */
  requestData: function (a) {
    var that = this;
    wx.request({
      url: 'https://api.budejie.com/api/api_open.php',
      data: {
        a: a,
        c: 'data',
        maxtime: this.data.maxtime,
        type: '10',
        page:this.data.page
      },
      method: 'GET',
      success: function (res) {
        that.setData({
          // 拼接数组
          list: [...that.data.list,...res.data.list].map(item=>{
                item.passtime = item.passtime.substring(0,10)
                return item
            }),
          loadingHidden: true,
          maxtime: res.data.info.maxtime
        })

      }
    })
  },
  /**
   * 点击详情
   */
  goContent: function (e) {
    var index = e.currentTarget.dataset.index;
    var imgArr = this.data.list.map(item=>{
      return item.cdn_img
    })
    wx.previewImage({
      current: imgArr[index],     //当前图片地址
      urls: imgArr,               //所有要预览的图片的地址集合 数组形式
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})