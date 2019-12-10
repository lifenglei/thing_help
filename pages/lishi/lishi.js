Page({
  data: {
    url: "",
    hidden: false,
    toastHidden: true,
    modalHidden: true,
    toastText: "数据异常",
    loadingText: "加载中..."
  },

  onLoad: function (options) {
    that = this;
    if (options == null || options.url == null) {
      this.setData({
        hidden: true,
        toastHidden: false
      });
      return;
    }

    this.setData({
      hidden: true,
      toastHidden: true,
      url: options.url
    })
  },
  //Toast信息改变
  onToastChanged: function (event) {
    this.setData({
      toastHidden: true
    });
  },
  // 长按
  onlongclick: function () {
    this.setData({
      modalHidden: false
    });
  },
  // 保存
  onSaveClick: function (event) {
    var mUrl = "";
    if (event.currentTarget.dataset.url != null)
      mUrl = event.currentTarget.dataset.url;
    console.log("download：" + mUrl);
    saveImage(mUrl);
  },
  // 取消
  onCancelClick: function (event) {
    this.setData({
      modalHidden: true
    });
  },
});

var that;
/**
 * 保存图片
 */
function saveImage(mUrl) {
  console.log(mUrl)
  that.setData({
    hidden: false,
    toastHidden: true,
    modalHidden: true,
    loadingText: "保存中..."
  });
  
  //判断用户是否授权"保存到相册"
  wx.getSetting({
    success(res) {
      console.log(res.authSetting)
      //没有权限，发起授权
      if (!res.authSetting['scope.writePhotosAlbum']) {
        wx.showModal({
          title: '检测到您没有打开保存到相册的权限，是否前往设置打开？',
          success: (res) => {
            if (res.confirm) {
              console.log('用户点击确定')
              onOpenSetting(mUrl) // 打开设置页面          
            } else if (res.cancel) {
              console.log('用户点击取消')
              that.setData({
                hidden:true
              })
            }
          }
        })
      } else { //用户已授权，保存到相册
        savePhoto(mUrl);
      }
    }
  })
}
function onOpenSetting(mUrl){
  wx.openSetting({
    success:(res) => {
      console.log(res.authSetting)
      if (!res.authSetting['scope.writePhotosAlbum']) {
        wx.showToast({
          title: '您未授权',
          icon: 'none',
          duration: 1500
        })
        that.setData({
          hidden:true
        })
      } else {// 接受授权
        savePhoto(mUrl) // 接受授权后保存图片
      }

    }
  })
}
function savePhoto(mUrl){
  wx.downloadFile({
    url: mUrl,
    type: 'image',
    success: function (res) {
      var tempFilePath = res.tempFilePath;
      wx.saveImageToPhotosAlbum({
        filePath: tempFilePath,
        success: function (res) {
          that.setData({
            hidden: true,
            toastHidden: false,
            toastText: "恭喜你,保存成功"
          });
        },
        fail: function (res) {
          console.log(res);
        }
      });
    },
    fail: function (res) {
      that.setData({
        hidden: true,
        toastHidden: false,
        toastText: "保存失败，请稍后再试"
      });
    },
    complete: function (res) {
      console.log("download complete");
    }
  })
}