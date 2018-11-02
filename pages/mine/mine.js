//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    list: null,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  saveUser: function() {
    // 保存或者更新用户信息
    var user = app.globalData.userInfo;
    user.sessionKey = app.globalData.sessionKey;
    app.post(
      'wx/saveUser',
      user,
      res => {
        // wx.showToast({
        //   title: '用户信息更新成功',
        //   icon: 'none',
        //   duration: 1000
        // })
      },
      null
    )
  },

  getUserInfo: function(e) {
    console.log(e)
    if (e.detail.userInfo) {
      // 同意授权
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      this.saveUser();
      wx.showToast({
        title: '授权通过，欢迎你使用',
        icon: 'none',
        duration: 1000
      })


    } else {
      // 拒绝授权
      this.setData({
        hasUserInfo: false
      })
      wx.showToast({
        title: '你拒绝了授权请求，请重新授权',
        icon: 'none',
        duration: 1000
      })

    }





  },

  onShow: function() {

    if (app.globalData.userInfo && app.globalData.sessionKey) {

      // 更新用户信息
      this.saveUser();

      // 获取当前用户的今日打卡记录
      app.get(
        'list',
        res => {
          if (res.data.data) {
            this.setData({
              list: res.data.data
            })
          }
        },
        null
      )
    }
  },
  /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function () {

  }

})