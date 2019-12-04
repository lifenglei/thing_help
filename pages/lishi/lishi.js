// pages/chatroom/chatroom.js
//引入页面依赖的js
var api = require('../../requests/api.js');
var requests = require('../../requests/request.js');
//获取app实例以及定义所需数据
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chatRoomList:[],
    scrollTop: 0,
    srollHeight: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this= this;
    getLIst.call(_this)
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
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          scrollHeight: res.windowHeight
        });
      }
    })
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
  
  },
  goToChatRoom:function(e){
    var roomId = e.currentTarget.dataset.roomid;
    wx.navigateTo({
      url: `../appeal/appeal?detail=${roomId}`
    })
  }
})
/**
 * 获取每日笑话
 */
function getLIst(){
    var self = this;
    var url = api.API_GET_LISHI;
    var data = {
        type:1
    }
    requests.getRequest(url,data).then(res=>{
        if(res.data.code==1){
            self.setData({
                chatRoomList:[...res.data.data].map(item=>{
                    item.date = `${item.year}年${item.month}月${item.day}日`
                    return item
                }).filter(i=>{
                    if(i.picUrl!='')
                    return i
                })
            })
        }
    })
}