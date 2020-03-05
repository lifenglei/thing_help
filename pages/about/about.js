const app = getApp();
let self;
Page({
  data: {
    //这里是为页面显示准备数据，不建议直接写在页面里
    avatar:
      "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJLsunNmibxLnoYafZprP5goVfZkuPoPsNvianXgkJAlLuJbzX3pfWxz3S20CDsSOxLo2fAnfBMkB0Q/132",
    nickName: "",
    gender: null,
    isGetInfo: true,
    show: false,
    left:'800rpx',
    bg: "https://static.soyoung.com/sy-pre/header-1582183207870.png",
    qrcodeurl:
      "https://static.soyoung.com/sy-pre/5AD79CCF1F05DAA1784C309A68815F50-1583298600648.jpg",
    shareModel: {
      title: "何当共阅西窗文",
      path: "pages/index/index",
      imageUrl:
        "https://static.soyoung.com/sy-pre/WechatIMG349-1583140200641.jpeg",
      fromButton: "one"
    }
  },
  onLoad: function() {
    //页面加载初始化函数
    self = this;
    if (app.globalData.userInfo) {
      //获取微信账号登录。。。这里实际没用到相关的数据，纯粹为了加载下能看看装个逼。。。
      self.setData({
        userInfo: app.globalData.userInfo,
        isGetInfo: false
      });
    }
    wx.getSystemInfo({
      success: function(res) {
        self.setData({
          windowW: res.windowWidth,
          windowH: res.windowHeight
        });
      }
    });
  },
  makePic() {
    wx.showLoading({
      title:'生成中...'
    })
    var that = this;
    that.setData({
      show: true
    });
    that.getPicByCanvas();
  },
  async getPicByCanvas() {
    var that = this;
    var windowW = that.data.windowW;
    var windowH = that.data.windowH;
    //需要的图片
    const { templateFilePath: bg } = await this.downLoadFile(this.data.bg);
    const { templateFilePath: qrcode } = await this.downLoadFile(
      this.data.qrcodeurl
    );
    let avatarUrl = app.globalData.userInfo&&app.globalData.userInfo.avatarUrl||'https://static.soyoung.com/sy-pre/WX20200304-192810-1583320200630.png',
    name = app.globalData.userInfo&&app.globalData.userInfo.nickName||'',
    avatarurl_width = 40, //绘制的头像宽度
    avatarurl_heigth = 40, //绘制的头像高度
    avatarurl_x = 40, //绘制的头像在画布上的位置
    avatarurl_y = 35; //绘制的头像在画布上的位置
    const { templateFilePath: avatar } = await this.downLoadFile(
      avatarUrl
    );
    const ctx = wx.createCanvasContext("firstCanvas");
    // 填充背景色
    ctx.setFillStyle("#fff");
    ctx.fillRect(0, 0, 300, 400);
    ctx.fill();
    ctx.setFillStyle("#ffffff");
    ctx.fillRect(0, 400, 300, 100);
    ctx.fill();
    // 填充背景图
    ctx.drawImage(bg, 30, 20, 240, 290);
    ctx.save();
    ctx.beginPath()
    //绘制头像
    ctx.arc(avatarurl_width / 2 + avatarurl_x, avatarurl_heigth / 2 + avatarurl_y, avatarurl_width / 2, 0, Math.PI * 2, false);
    ctx.clip(); //画了圆 再剪切  原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内
    ctx.drawImage(avatarUrl, avatarurl_x, avatarurl_y, avatarurl_width, avatarurl_heigth); // 推进去图片 
    ctx.restore()
    // 写入名字
    ctx.setFontSize(18);
    ctx.setFillStyle("#FFF9F0");
    ctx.fillText(name, 88, 250);
    ctx.fillText('何当共阅西窗文', 130, 60);
    ctx.setFontSize(15);
    ctx.setFillStyle("#FFF9F0");
    ctx.fillText("邀请你一起赏析", 50, 270);
    ctx.fillText("精美的文章", 50, 290);
    // 写两行提示
    ctx.setFillStyle("#322F30");
    ctx.setFontSize(14);
    ctx.fillText("长按识别小程序码", 33, 345);
    ctx.fillText("精品美文等你赏析", 33, 370);
    // 填充小程序码
    ctx.drawImage(qrcode, 0, 0, 280, 280, 178, 320, 80, 80);
    // 把canvas图保存到临时目录
    ctx.draw();
    wx.hideLoading()
    that.setData({
      left:'0'
    })
  },
  close(){
    console.log('关闭')
    this.setData({
      show:false
    })
  },
  daochu() {
    var that = this;
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      canvasId: "firstCanvas",
      fileType: "jpg",
      quality: 1,
      success: function(res) {
        that.setData({
          shareImage: res.tempFilePath
        });
      }
    });
    setTimeout(function() {
      wx.showModal({
        title: "提示",
        content: "将生成的海报保存到手机相册，可以发送给微信好友或分享到朋友圈",
        success(res) {
          if (res.confirm) {
            that.eventSave();
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    }, 1000);
  },
  eventSave() {
    var that = this
    wx.saveImageToPhotosAlbum({
      filePath: this.data.shareImage,
      success(res) {
        wx.showToast({
          title: "保存图片成功",
          icon: "success",
          duration: 2000
        });
      },
      fail(err){
        console.log(err.errMsg)
        if (err.errMsg === "saveImageToPhotosAlbum:fail authorize no response") {
            that.openSetting()
        } else {
          wx.showModal({
            title:'请截屏保存分享'
          })
        }
      },
    });
  },
  //需要授权
  openSetting(){
    var that =this
    wx.showModal({
      title: '相册权限',
      content: '需要你提供保存相册权限',
      success: function (res) {
          if (res.confirm) {
              wx.openSetting({
                  success(settingdata) {
                      console.log(settingdata)
                      if (settingdata.authSetting['scope.writePhotosAlbum']) {
                        that.eventSave()
                      } else {
                        wx.showModal({
                          title:'获取 相册 权限失败'
                        })
                      }
                  }
              })
          }
      }
  })
  },
  downLoadFile(str) {
    return new Promise((resolve, reject) => {
      wx.downloadFile({
        url: str,
        success: function(res) {
          if (res.statusCode === 200) {
            resolve({
              templateFilePath: res.tempFilePath
            });
          }
        },
        fail: function(err) {
          reject(err);
        }
      });
    });
  },
  clearInfo() {
    wx.showModal({
      title: "是否清除缓存",
      confirmColor: "#2D6E7F",
      success: function(res) {
        if (res.confirm) {
          wx.showLoading();
          setTimeout(() => {
            wx.hideLoading();
            app.globalData.userInfo = null;
            wx.showToast({
              title: "清除成功",
              icon: "success"
            });
            self.setData({
              isGetInfo: true
            });
          }, 1000);
        } else {
        }
      },
      fail: function() {
        wx.showLoading();
        setTimeout(() => {
          wx.hideLoading();
          wx.showToast({
            title: "清除失败",
            icon: "fail"
          });
        }, 1000);
      }
    });
  },
  onShareAppMessage: function(res) {
    console.log(res);
    let shareInfo = self.data.shareModel;
    return {
      title: shareInfo.title,
      path: shareInfo.path,
      imageUrl: shareInfo.imageUrl
    };
  },
  onGotUserInfo: function(e) {
    console.log(e);
    app.globalData.userInfo = e.detail.userInfo;
    self.setData({
      avatar: app.globalData.userInfo.avatarUrl,
      nickName: app.globalData.userInfo.nickName,
      gender: app.globalData.userInfo.gender,
      isGetInfo: false
    });
  }
});
