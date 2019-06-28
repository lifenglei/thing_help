//index.js
//获取应用实例
import {audioList} from '../../datas/song.js'
var PageEvent =require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    audioList: [],
    pauseStatus: true,
    listShow: true,
    timer: '',
    page:1,
    pageSize:20,
    searchValue:''
  },
  onLoad: function () {
    console.log(PageEvent)
    this.setData({
      audioList: PageEvent.pagination(this.data.page, this.data.pageSize, audioList)
    })
   
  },
  bindKeyInput(e){
    console.log(e)
    this.setData({
      searchValue:e.detail.value
    })
  },
  search(){
    this.setData({
      audioList:this.data.audioList.filter(item=>item.title==this.data.searchValue)
    })
    app.globalData.audioList = this.data.audioList
  },
  del(){
    this.setData({
      searchValue:'',
      page:1
    })

    this.setData({
      audioList: PageEvent.pagination(this.data.page, this.data.pageSize, audioList)
    })

  },
  onShow(){
    this.setData({
      audioIndex: wx.getStorageSync('autoIndex')||0
    })
    app.globalData.audioList = this.data.audioList
  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏
    console.log("test1 onHide");

  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载
    console.log("test1 onUnload");
  },
  lower: function() {
    console.log('到底')
    wx.showLoading({
      title: '杰伦奔跑...',
    })
    console.log(this.data.page + 1)
    this.setData({
      page:this.data.page+1,
      audioList: [...this.data.audioList, ...PageEvent.pagination(this.data.page, this.data.pageSize, audioList)]
    })
    app.globalData.audioList = this.data.audioList
    console.log(this.data.audioList)
    wx.hideLoading()
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
