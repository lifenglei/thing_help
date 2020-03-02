
//获取应用实例
var app = getApp()
var requests = require('../../requests/request.js');
var api = require('../../requests/api.js')
var WxParse = require('../wxParse/wxParse.js')
var count=0;
Page({
  data: {
    typeList:[],
    floorstatus:true,
    bannerList:[
    ],
    rotate:0,
    joke:{},
    indicatorDots: true,
    meiwen:null
  },
  onLoad: function () {
    getMeiWen.call(this)
    getTopBanner.call(this);
    // getWuLiuList.call(this);
    // getJoke.call(this);
    
  },
  onShow(){
   
  },
  change(){
    if(count==10){
      count=0
    }
    count++
    this.setData({
      rotate:180*count
    })
    getJoke.call(this);
  },
    /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  previewImg:function(e){
    console.log(e.currentTarget.dataset.index);
    var index = e.currentTarget.dataset.index;
    var imgArr = this.data.bannerList.map(item=>{
      return item.imageUrl
    })
    console.log(imgArr);
    wx.previewImage({
      current: imgArr[index],     //当前图片地址
      urls: imgArr,               //所有要预览的图片的地址集合 数组形式
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  goTodetial(e){
    console.log(e)
    var logisticsId = e.currentTarget.dataset.menuid
    wx.navigateTo({
      url: `../detail/detail?id=${logisticsId}`
    })
  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏
    
  },
   // 获取滚动条当前位置
   onPageScroll: function (e) {
    console.log(e)
    if (e.scrollTop > 100) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },

  //回到顶部
  goTop: function (e) {  // 一键回到顶部
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
    /**
   * 滚动到底部时加载下一页
   */
  onReachBottom: function () {
    let self = this
    wx.showModal({
      title:'是否欣赏下一篇美文',
      success(res){
        if(res.confirm){
          getMeiWen.call(self)
          self.goTop()
        }else{
          console.log('取消')
        }
      }
    })
  },

  onUnload: function () {
    // 生命周期函数--监听页面卸载
    
  }
})
/**
 * 
 * 获取物流列表
 */
function getWuLiuList(){
  var url = api.API_GET_TypeList;
  var params = {
    
  };
  requests.getRequest(url,params).then(res=>{
    console.log(res)
    console.log(res.data.data)
    if (res.data.code == 1){
      this.setData({
        typeList: res.data.data.slice(0,16)
      }) 
    }
  }).catch(error => {
    console.log(error)
  })
}
/**
 * 
 * 获取每日美文
 */
function getMeiWen(){
  wx.showLoading({
    title:'获取🔥中...'
  })
  var url = api.ALPI_GET_MEIWEN;
  var params = {
    
  };
  requests.getRequest(url,params).then(res=>{
    let data = res.data.data
    data.author = '文/'+ data.author
    let total_content = data.content
    let that = this
    WxParse.wxParse('article','html',total_content,that,5)
    if (res.data.code == 200){
      wx.hideLoading()
      that.setData({
        meiwen:data
      }) 
    }
  }).catch(error => {
    console.log(err)
    wx.hideLoading()
    getMeiWen()
  })
}
/**
 * 
 * 获取每日福利
 */
function getTopBanner(){
  var _this = this;
  var url = api.API_GET_FULI;
  var data = {
    
  }
  requests.getRequest(url,data).then(res=>{
    if(res.data.code==1){
      _this.setData({
        bannerList:res.data.data.map(item=>{
           if(item.imageUrl.indexOf('http')){
            item.imageUrl.replace('http','https')
           }
           return item
        })
      })
      if(res.data.data.length==1){
        _this.setData({
          indicatorDots:false
        })
      }
    }
  })
}
/**
 * 获取每日笑话
 */
function getJoke(){
  var _this = this;
  var url = api.API_GET_JOKE;
  var data = {
    
  }
  requests.getRequest(url,data).then(res=>{
    if(res.data.code==1){
      _this.setData({
        joke:res.data.data[0]
      })
    }
  })
}