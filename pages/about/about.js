const app = getApp()

Page({
  data: {//这里是为页面显示准备数据，不建议直接写在页面里
      img: '../../images/basicprofile.jpeg',
      title: "端端",
      intro: "介绍：一个帮你查询快递 品段子的小程序",
      phone:"个人博客：1314you.top",
      email:"邮箱：1125911451@qq.com",//欢迎大家一起讨论,
      comment: "意见反馈: 欢迎大家一起讨论"
     },

  onLoad: function () {//页面加载初始化函数
    if (app.globalData.userInfo) {//获取微信账号登录。。。这里实际没用到相关的数据，纯粹为了加载下能看看装个逼。。。
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } 
  }
})