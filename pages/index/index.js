//index.js
//获取应用实例
var app = getApp()
import { songList} from '../../datas/song.js'
Page({
  data: {
    duration: 1000,
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    plain: false,
    scrollTop: 0,
    girlList: [],
    arr: [],
    src: '',
    srollHeight: 0,
    banner: [],
    songPic:'http://y.gtimg.cn/music/photo_new/T002R300x300M000003RMaRI1iFoYd.jpg',
    songVideo:'http://ptgfot33a.bkt.clouddn.com/003OUlho2HcRHC.mp3',
    poster:'http://y.gtimg.cn/music/photo_new/T002R300x300M000003RMaRI1iFoYd.jpg',
    name:'告白气球',
    author:'周杰伦',
    flag:false

  },
  //事件处理函数
  onLoad() {
    this.setData({
      girlList: songList
    })
    this.audioCtx = wx.createAudioContext('myAudio')
  },
  onUnload() {

  },
  onHide() {

  },
  gotoSong(e){
    console.log(e)
    var songInfo = e.currentTarget.dataset.index
    this.setData({
      songPic:songInfo.pic,
      songVideo:`http://ptgfot33a.bkt.clouddn.com/${songInfo.songid}.mp3`,
      poster:songInfo.pic,
      name:songInfo.title,
      author:songInfo.author
    })
    if(!this.flag){
      this.audioCtx.play()
      this.flag=true
    }else{
      this.audioCtx.pause()
      this.flag=false
    }
  },
  //页面显示获取设备屏幕高度，以适配scroll-view组件高度
  onShow: function () {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          scrollHeight: res.windowHeight
        });
      }
    })
    if (app.globalData.zhubo != null) {
      app.globalData.zhubo = {}
    }
    console.log(app.globalData)
  },
  scroll: function (event) {
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },
  /**
* 用户点击右上角分享
*/
  onShareAppMessage: function () {
    // return {
    //   title: '月猫约玩微信小程序',
    //   desc: '主播最多的交友平台!',
    //   path: '/page/index'
    // }
  }
})