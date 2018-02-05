// pages/center-course/center-course.js
var app = getApp();
var appUrl = app.globalData.appUrl;
var pingtai = app.globalData.pingtai;
var appImg = app.globalData.appImg;
var title = "";

var currentPage = "0";
var pageSize = "0";
var types = "";
Page({
  data: {
    length:0,
  },

  onLoad: function (options) {
    var that = this;
    currentPage = 1;
    pageSize = 10;
    types = options.key;
    title = options.title;
    wx.setNavigationBarTitle({
      title: title
    })
    app.boutiqueFun('' + appUrl + 'courselist', pingtai, currentPage, pageSize, that, appImg, types);
  },
  /**
  * 生命周期函数--监听页面初次渲染完成
  */
  onReady: function () {
    console.log(10);
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
    console.log(2);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log(3);
    
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
    if (that.data.length == "10") {
      currentPage++;
      console.log('第' + currentPage + '页');
      if (types == 0) {
        app.mycourselist('' + appUrl + 'mycourselist', that, pingtai, currentPage, pageSize, appImg);
      } else {
        app.boutiqueFun('' + appUrl + 'courselist', pingtai, currentPage, pageSize, that, appImg, types);
      }
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})