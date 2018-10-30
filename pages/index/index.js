// pages/index/index.js

const app = getApp()

Page({

  read: function() {
    wx.navigateTo({
      url: 'read/read',
    })
  },
  sport: function () {
    wx.navigateTo({
      url: 'sport/sport',
    })
  },
  text: function () {
    wx.navigateTo({
      url: 'text/text',
    })
  },

  mark: function(e) {
    var id = e.target.dataset.id
    console.log(e)
    console.log(id)

    var mark = {
      ptcId: id,
      startTime: '',
      overTime: '',
      remark: ''
    };

    app.post(
      'mark',
      mark,
      res => {
        this.onShow()
        wx.showToast({
          title: res.data,
          icon: 'none',
          duration: 1000
        })
      },
      null
    )



  },

  /**
   * 页面的初始数据
   */
  data: {
    ptc: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    app.get(
      'ptc',
      res => {
        this.setData({
          ptc: res.data.data
        })
        console.log(res.data.data)
      },
      null
    );
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})