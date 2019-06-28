
var app = getApp();
var backgroundAudioManager = null
var songid = null
import { audioList } from '../../datas/song.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pic:'',
    title:'',
    pauseStatus:false,
    audioList: audioList,
    audioIndex: 0,
    currentPosition: 0,
    duration: 0,    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    songid = options.songid
    this.setData({
      audioIndex:options.index
    })
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setSong(this.data.audioIndex)
  },
  bindTapNext: function () {
    console.log('bindTapNext')
    let length = this.data.audioList.length
    let audioIndexPrev = this.data.audioIndex
    let audioIndexNow = audioIndexPrev
    if (audioIndexPrev === length - 1) {
      audioIndexNow = 0
    } else {
      audioIndexNow = ~~audioIndexPrev + 1
    }
    console.log(audioIndexNow)
    this.setSong(audioIndexNow)
    this.setData({
      audioIndex: audioIndexNow
    })
    wx.clearStorageSync()
    wx.setStorageSync('autoIndex', audioIndexNow)
  },
  bindTapPrev: function () {
    console.log('bindTapPrev')
    let length = this.data.audioList.length
    let audioIndexPrev = this.data.audioIndex
    let audioIndexNow = audioIndexPrev
    if (audioIndexPrev === 0) {
      audioIndexNow = length - 1
    } else {
      audioIndexNow = audioIndexPrev - 1
    }
    this.setSong(audioIndexNow)
    this.setData({
      audioIndex: audioIndexNow
    })
    console.log(audioIndexNow)
    wx.clearStorageSync()
    wx.setStorageSync('autoIndex', audioIndexNow)
  },
  bindTapPlay: function () {
    console.log('bindTapPlay')
    console.log(this.data.pauseStatus)
    if (this.data.pauseStatus === true) {
      backgroundAudioManager.play()
      this.setData({ pauseStatus: false })
    } else {
      console.log(backgroundAudioManager)
      backgroundAudioManager.pause()
      wx.pauseBackgroundAudio()
      this.setData({ pauseStatus: true })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },
  bindTapList(){
    wx.navigateTo({
      url: '../index/index',
    })
  },
  setSong(index){
    backgroundAudioManager = wx.getBackgroundAudioManager()
    backgroundAudioManager.title = this.data.audioList[index].title
    backgroundAudioManager.epname = this.data.audioList[index].title
    backgroundAudioManager.singer = this.data.audioList[index].author
    backgroundAudioManager.coverImgUrl = this.data.audioList[index].pic
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      pic: this.data.audioList[index].pic,
      title: this.data.audioList[index].title
    })
    // 设置了 src 之后会自动播放
    backgroundAudioManager.src = `http://ptgfot33a.bkt.clouddn.com/${this.data.audioList[index].songid}.mp3`
    backgroundAudioManager.onCanplay(()=>{
      wx.hideLoading()
    })
    this.setData({
      duration: backgroundAudioManager.duration||0
    })
    wx.clearStorageSync()
    wx.setStorageSync('autoIndex', ~~index)
    backgroundAudioManager.onEnded(()=>{
      if (~~index == this.data.audioList.length-1){
        index=-1
      }
      this.setSong(~~index+1)
      wx.clearStorageSync()
      wx.setStorageSync('autoIndex', ~~index+1)
    })
    // backgroundAudioManager.onPlay(()=>{
    //   console.log(backgroundAudioManager.duration)
    // })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('hide')
    this.bindTapPlay()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})