const app = getApp();

Page({


  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var mark = e.detail.value;
    if (mark.sportName == '') {
      wx.showToast({
        title: '请填写运动名称',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    if (mark.sportTime == '') {
      wx.showToast({
        title: '请填写运动时间',
        icon: 'none',
        duration: 1000
      })
      return;
    }

    mark.ptcId = 4;

    app.post(
      'mark',
      mark,
      res => {
        wx.showToast({
          title: res.data,
          icon: 'none',
          duration: 1000
        })
      },
      null
    )
  },
  formReset: function (e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value)

  },




  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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