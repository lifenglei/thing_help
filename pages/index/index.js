//index.js
//获取应用实例
import {audioList} from '../../datas/song.js'
var app = getApp()
Page({
  data: {
    audioList: audioList,
    pauseStatus: true,
    listShow: true,
    timer: ''
  },
  onLoad: function () {
    console.log('onLoad')
   
  },
  onReady: function (e) {
    console.log('onReady')

  },
  onShow(){
    this.setData({
      audioIndex: wx.getStorageSync('autoIndex')||0
    })
  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏
    console.log("test1 onHide");

  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载
    console.log("test1 onUnload");
  },
  bindSliderchange: function(e) {

  },
  bindTapChoose: function(e) {
    console.log(e)
    app.globalData.userInfo = e.currentTarget.dataset.obj
    app.globalData.index = e.currentTarget.dataset.index
    console.log(app.globalData.userInfo)
    wx.navigateTo({
      url: `/pages/detail/detail?songid=${e.currentTarget.dataset.obj.songid}&index=${e.currentTarget.dataset.index}`,
    })
    wx.setStorageSync('autoIndex', e.currentTarget.dataset.index)
  },
  onShareAppMessage: function () {
    let that = this
    return {
      title: '我是杰伦fans：' + that.data.audioList[that.data.audioIndex].title,
      success: function(res) {
        wx.showToast({
          title: '分享成功',
          icon: 'success',
          duration: 2000
        })

      },
      fail: function(res) {
        wx.showToast({
          title: '分享失败',
          icon: 'cancel',
          duration: 2000
        })
      }
    }
  }
})
