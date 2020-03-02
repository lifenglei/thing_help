import { log, promiseHandle } from 'utils/util';

App({
    getUserInfo(cb) {
        if (typeof cb !== "function") return;
        let that = this;
        if (that.globalData.userInfo) {
            cb(that.globalData.userInfo);
        } else {
            promiseHandle(wx.login).then(() => promiseHandle(wx.getUserInfo)).then(res => {
                that.globalData.userInfo = res.userInfo;
                cb(that.globalData.userInfo);
            }).catch(err => {
                log(err);
            });
        }
    },

    globalData: {
        userInfo: null,
        index:0
    },
    onLaunch:function(){
        this.getNewVersion()
    },
  getNewVersion(){
    // 获取小程序更新机制兼容
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否马上重启小程序？',
              success: function (res) {
                if (res.confirm) {
                  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function () {
            // 新的版本下载失败
            wx.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
            })
          })
        }
      })
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      // wx.showModal({
      //   title: '提示',
      //   content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      // })
    }
  },

    //自定义配置
    settings: {
        debug: true, //是否调试模式
        moreLink: 'http://github.com/lifenglei'
    }
});  