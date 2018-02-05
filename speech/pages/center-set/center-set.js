// pages/center-set/center-set.js
var app = getApp();
Page({
  data: {
  },
  // 清除缓存
  emptyCache:function(e){
    // var that = this;
    // wx.clearStorage(e);
    // wx.showToast({
    //   title: '清除成功',
    //   icon:"success",
    //   duration:200,
    // })
    // that.setData({
    //   size: 0 + "kb"
    // })
  },
  onLoad: function (options) {
    var that = this;
    // 获取缓存大小
    wx.getStorageInfo({
      success: function (res) {
        that.setData({
          size: res.currentSize+"kb"
        })
      }
    })
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