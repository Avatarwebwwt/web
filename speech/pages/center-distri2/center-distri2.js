// pages/center-distri2/center-distri2.js

var app = getApp();
var appUrl = app.globalData.appUrl;
var pingtai = app.globalData.pingtai;
var appImg = app.globalData.appImg;
var currentPage = "";

var pid = "";

Page({
  data: {
    length: "",
  },
  onLoad: function (options) {
    var that = this;
    pid = options.uid;
    console.log(pid);
    currentPage = 1;
    app.memberlist('' + appUrl + 'memberlist', pingtai, currentPage, pid, that, appImg);
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
    var that = this;
    if (that.data.length == "15") {
      currentPage++;
      console.log('第' + currentPage + '页')
      app.memberlist('' + appUrl + 'memberlist', pingtai, currentPage, pid, that, appImg);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})