const app = getApp()
let self;
Page({
  data: {//这里是为页面显示准备数据，不建议直接写在页面里
    avrtar:'',
    nickName:'',
    gender:null,
    isGetInfo:true,
    shareModel:{
      title:'何当共阅西窗文',
      path:'pages/index/index',
      imageUrl:'https://static.soyoung.com/sy-pre/WechatIMG349-1583140200641.jpeg',
      fromButton:'one'
    }
  },

  onLoad: function () {//页面加载初始化函数
    self = this
    console.log(self)
    console.log(app.globalData.userInfo)
    if (app.globalData.userInfo) {//获取微信账号登录。。。这里实际没用到相关的数据，纯粹为了加载下能看看装个逼。。。
      self.setData({
        userInfo: app.globalData.userInfo,
        isGetInfo: false
      })
    } 
  },
  clearInfo(){
    wx.showModal({
      title:'是否清除缓存',
      confirmColor:'#2D6E7F',
      success:function(res){
        if(res.confirm){
          wx.showLoading()
          setTimeout(()=>{
            wx.hideLoading()
            app.globalData.userInfo =null
            wx.showToast({
              title:'清除成功',
              icon:'success'
            })
            self.setData({
              isGetInfo: true
            })
          },1000)
        }else{

        }
      },
      fail:function(){
        wx.showLoading()
        setTimeout(()=>{
          wx.hideLoading()
          wx.showToast({
            title:'清除失败',
            icon:'fail'
          })
        },1000)
      }
    })
  },
  onShareAppMessage:function(res){
    console.log(res)
    let shareInfo = self.data.shareModel
    return {
      title:shareInfo.title,
      path:shareInfo.path,
      imageUrl:shareInfo.imageUrl
    }
  },
  onGotUserInfo:function(e){
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    self.setData({
      avrtar:app.globalData.userInfo.avatarUrl,
      nickName:app.globalData.userInfo.nickName,
      gender:app.globalData.userInfo.gender,
      isGetInfo:false
    })
  }
})