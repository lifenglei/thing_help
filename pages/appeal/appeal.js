var detail = '../content/content'
Page({
  data: {
    videoDataList: [],
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
        type: '41',
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
        that.setData({
          // 拼接数组
          videoDataList: [...that.data.videoDataList,...res.data.list].map(item=>{
              item.passtime = item.passtime.substring(0,10)
              return item
          }),
          loadingHidden: true,
          maxtime: res.data.info.maxtime
        })

      }
    })
  },
  // 点击cover播放，其它视频结束
  videoPlay: function (e) {
    var _index = e.currentTarget.dataset.id
    this.setData({
      _index: _index
    })
    //停止正在播放的视频
    console.log(_index)
    // var videoContextPrev = wx.createVideoContext(_index+"")
    // videoContextPrev.stop();

    setTimeout(function () {
      console.log('播放')
      //将点击视频进行播放
      var videoContext = wx.createVideoContext(_index + "")
      videoContext.play();
    }, 500)
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