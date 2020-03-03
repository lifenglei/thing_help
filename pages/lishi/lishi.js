
var app = getApp()
var WxParse = require('../wxParse/wxParse.js')
Page({
  data:{
    yilin:{

    }
  },
  onLoad(){
    this.setData({
      yilin:app.globalData.content
    })
    wx.setNavigationBarTitle({
      title: app.globalData.content.title
    })
    WxParse.wxParse('article','html',app.globalData.content.content,this,5)
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