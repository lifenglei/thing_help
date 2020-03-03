// var detail = '../content/content'
var api = require('../../requests/api.js')
var requests = require('../../requests/request.js')
var app = getApp()
let self;
Page({
  data: {
    list: [],
    maxtime: '',
    loadingHidden: true,
    page:1,
  },
  onLoad: function (options) {
    self = this
    // 页面初始化 options为页面跳转所带来的参数
    self.getYiLin();

  },
  goDetail(e){
    console.log(e)
    app.globalData.content = e.currentTarget.dataset.content
    wx.navigateTo({
      url: '../lishi/lishi'
    })
  },
  onReachBottom: function () {
    console.log('onLoad')
    self.data.page++
    self.getYiLin()
  },

  /**
 * 
 * 获取意林列表
 */
  getYiLin: function (a) {
  wx.showLoading({
    title:'获取🔥中...'
  })
  var url = api.ALPI_GET_YILIN;
  var params = {
    page:this.data.page,
    num:10,
    cate:'random'
  };
  requests.getRequest(url,params).then(res=>{
    if(res.data.code==200){
      wx.hideLoading()
      var getArray = res.data.data.map(item=>{
        item.color = self.getRandomColor()
        return item 
      })
      console.log(getArray)
      console.log(self.data.list)
      self.setData({
        list: [...self.data.list,...getArray]
      })
    }
    
  }).catch(error => {
    console.log(err)
    wx.hideLoading()
  })
  },
  /**
   * 获取随机颜色
   */
 getRandomColor:function(){
    var color = "#";
    for( var i = 0; i < 6; i++ ){
        color += ( Math.random()*16 | 0 ).toString(16);
    }
    return color;
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