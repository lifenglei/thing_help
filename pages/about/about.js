const app = getApp()

Page({
  data: {//这里是为页面显示准备数据，不建议直接写在页面里
    img: '../../images/basicprofile.jpeg',
    title: "端端 -前端小学僧",
    intro: " 热爱编程，有实战项目经历，熟练掌握vue react 开发专业知识,有良好的沟通表达能力、理解能力及逻辑思维，能快速学习,有团队精神和集体荣誉感，能快速融入团队",
    connecttion: "联系方式",
    address:"地址：北京市朝阳区",
    phone:"联系电话：xxxxxxxxx",
    email:"邮箱：1125911451@qq.com"//欢迎大家一起讨论
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