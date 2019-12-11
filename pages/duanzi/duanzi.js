var detail = '../content/content'
Page({
  data: {
    list: [],
    maxtime: '',
    loadingHidden: false
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.requestData('newlist');

  },
  onReachBottom: function () {
    console.log('onLoad')
    var that = this
    that.requestData('list')
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
        // 上一页的maxtime作为加载下一页的条件，
        maxtime: this.data.maxtime,
        type: '29',
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
   * 查看大图
   */
  lookBigPicture: function (e) {
    console.log(e);
    console.log(e.currentTarget.id)
    //图片url 对应wxml中data-url="{{item.url}}"
    var url = e.currentTarget.dataset.url;
    //获取图片高度 对应wxml中data-height="{{item.height}}"
    var height = e.currentTarget.dataset.height;
    //获取图片高度 对应wxml中data-width="{{item.width}}"
    var width = e.currentTarget.dataset.width;
    // 传参方式向GET请求
    wx.navigateTo({
      url: detail + '?' + 'url=' + url + "&height=" + height + "&width=" + width,
      success: function (res) {
        console.log(res)
      },
      fail: function (err) {
        console.log(err)
      },
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