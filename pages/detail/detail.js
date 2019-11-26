
var app = getApp()
var api = require('../../requests/api.js')
var utils = require('../../utils/util.js')
var requests = require('../../requests/request.js')
let currentId,newInfo
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    currentId = options.id
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
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
  logistics_Input(e){
    newInfo = e.detail.value;
  },
  changeInfo(){
    if(newInfo==''){
      wx.showModal({
        title: '提示',
        content: '输入不能为空',
        confirmText: '确定',
        showCancel: false,
        success: function () {

        }
      })
      return
    }else{
      getOrderDetail.call(this)
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
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
/**
 * 
 * 获取物流列表
 */
function getOrderDetail(){
  wx.showLoading('正在查询')
  var url = api.API_GET_Detail;
  var params = {
    logistics_id:currentId,
    logistics_no:newInfo
  }
  requests.getRequest(url,params).then(res=>{
    console.log(res)
    console.log(res.data.data)
    if (res.data.code == 1){
      wx.hideLoading()
      console.log(res.data)
      this.setData({
        list: res.data.data.data
      })
    }else{
      wx.hideLoading()
    }
  }).catch(error => {
    console.log(error)
  })
}