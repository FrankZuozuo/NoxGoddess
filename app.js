//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    this.wxLogin();

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    // doMain: 'https://www.wretchant.com/ptc/api/',
    doMain: 'http://192.168.1.114:2700/api/',
    sessionKey: '',
  },

  wxLogin: function() {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        this.get(
          'wx/getSessionByCode?code=' + res.code,
          res => {
            this.globalData.sessionKey = res.data.data
            wx.setStorageSync('sessionKey', res.data.data)
          },
          null
        )

      }
    })
  },

  login: function(sessionKey) {
    if (sessionKey == undefined || sessionKey == '' || sessionKey == null || sessionKey == 'null' || sessionKey.length < 10) {
      this.wxLogin();
      
    }
  },

  get: function(url, success, fail) {
    var sessionKey = this.globalData.sessionKey || wx.getStorageSync('sessionKey');
    this.login(sessionKey)
    wx.request({
      url: this.globalData.doMain + url,
      header: {
        session: sessionKey
      },
      success: success,
      fail: fail
    })
  },
  post: function(url, data, success, fail) {
    var sessionKey = this.globalData.sessionKey || wx.getStorageSync('sessionKey');
    this.login(sessionKey)
    wx.request({
      method: 'POST',
      data: data,
      url: this.globalData.doMain + url,
      header: {
        session: sessionKey,
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: success,
      fail: fail
    })
  }
})