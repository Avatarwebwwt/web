// pages/center/center.js
var app = getApp();
var appUrl = app.globalData.appUrl;
var pingtai = app.globalData.pingtai;
var appImg = app.globalData.appImg;

var currentPage = "1";
var pageSize = "10";

var loginMask = require('../../utils/login.js');

Page({
  data: {
    token: "",
    userid:'',
    Refresh:false,
    face:"",
  },
  // 跳转资料
  dataShow:function(e){
    wx.navigateTo({
      url: '../center-data/center-data',
    })
  },
  // 复制
  copyBtn:function(e){
    var that = this;
    wx.setClipboardData({
      data: that.data.code,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
          icon: "success",
          duration: 1500
        });
      }
    })
  },
  // 跳转
  loginShowClick:function(){
    var that = this;
    that.setData({
      login_maskShow: true,
    })
  },
  vipClick:function(e){
    wx.navigateTo({
      url: '../vip/vip',
    })
  },
  // 加载
  onLoad: function (options) {
    var that = this;
    loginMask.init.apply(this, []);//使login.js中的数据和函数注入到这个模块
    if (app.globalData.userInfo){
      that.setData({
        avatarUrl: app.globalData.userInfo.avatarUrl,
        nickName: app.globalData.userInfo.nickName,
      })
    }
    
    if (wx.getStorageSync("token")) {
      that.setData({
        token: wx.getStorageSync("token"),
      })
      app.userData('' + appUrl + 'myinfo', that, pingtai, appImg);
    } else {
      that.setData({
        login_maskShow: true,
      })
    }
    // 我的课程列表
    app.mycourselist('' + appUrl + 'mycourselist', that, pingtai, currentPage, pageSize, appImg);
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
    var that = this;
    if (this.data.Refresh){
      app.userData('' + appUrl + 'myinfo', that, pingtai, appImg);
    }
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
    var that = this;
    wx.showNavigationBarLoading() //在标题栏中显示加载
    that.onLoad();
    setTimeout(function () {
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
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