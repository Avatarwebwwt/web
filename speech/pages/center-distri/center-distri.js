// pages/center-distri/center-distri.js

var app = getApp();
var appUrl = app.globalData.appUrl;
var pingtai = app.globalData.pingtai;
var appImg = app.globalData.appImg;
var pid = "";
var currentPage = "";
Page({
  data: { 
    length:"",
  },
  subordinate:function(e){
    var uid = e.target.id;
    wx.navigateTo({
      url: '../center-distri2/center-distri2?uid='+uid+'',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    currentPage = 1;
    pid = app.globalData.userId;
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
      console.log('第' + currentPage + '页');
      pid = app.globalData.userId;
      app.memberlist('' + appUrl + 'memberlist', pingtai, currentPage, pid, that, appImg);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})