//index.js
//获取应用实例
var app = getApp()
var api = require('../../requests/api.js')
var utils = require('../../utils/util.js')
var requests = require('../../requests/request.js')
Page({
  data: {
    items: [],
    hidden: false,
    loading: false,
    // loadmorehidden:true,
    plain: false
  },

  onItemClick: function (event) {
    var targetUrl = "/pages/lishi/lishi";
    if (event.currentTarget.dataset.url != null)
      targetUrl = targetUrl + "?url=" + event.currentTarget.dataset.url;
    wx.navigateTo({
      url: targetUrl
    });
  },


  onReachBottom: function () {
    console.log('onLoad')
    var that = this
    that.setData({
      hidden: false,
    });
    requestData(that, mCurrentPage + 1);
  },

  onLoad: function () {
    console.log('onLoad')
    var that = this
    requestData(that, mCurrentPage + 1);
  }

})

/**
 * 定义几个数组用来存取item中的数据
 */

var mCurrentPage = 0;
/**
 * 请求数据
 * @param that Page的对象，用来setData更新数据
 * @param targetPage 请求的目标页码
 */
function requestData(that, targetPage) {
  wx.showToast({
    title: '加载中',
    icon: 'loading'
  });
  wx.request({
    url: api.API_GET_MEIZI + targetPage,
    header: {
      "Content-Type": "application/json"
    },
    success: function (res) {
      console.log(res)
      if (res == null ||
        res.data == null ||
        res.data.data.list == null ||
        res.data.data.list.length <= 0) {
        console.error("god bless you...");
        return;
      }

      that.setData({
        items: [...that.data.items,...res.data.data.list],
        hidden: true,
      });

      mCurrentPage = targetPage;

      wx.hideToast();
    }
  });
}