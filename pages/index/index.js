
//获取应用实例
var app = getApp()
var requests = require('../../requests/request.js');
var api = require('../../requests/api.js')
Page({
  data: {
    typeList:[],
    bannerList:[
    ],
    joke:{},
    indicatorDots: true
  },
  onLoad: function () {
    getTopBanner.call(this);
    getWuLiuList.call(this);
    getJoke.call(this);
    
  },
  onShow(){
   
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
        typeList: res.data.data.slice(0,12)
      }) 
    }
  }).catch(error => {
    console.log(error)
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