// pages/intro/intro.js
const app = getApp();
var appUrl = app.globalData.appUrl;
var pingtai = app.globalData.pingtai;
var appImg = app.globalData.appImg;
var appVideo = app.globalData.appVideo;
var paytype = 1;
var pcode = "";
var id = "";

var loginMask = require('../../utils/login.js');

Page({
  data: {
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0, 
  },
    //  滑动切换tab 
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  onLoad: function (options) {
    var that = this;
    loginMask.init.apply(this, []);
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }  
    })
    // 简介
    if (options){
      id = options.id;
      try {
        wx.setStorageSync('introId', id);
      } catch (e) {
      }
    } else {
      id = wx.getStorageSync("introId");
    }
    // 目录
    app.courseplay('' + appUrl + 'courseplay', pingtai, id, that, appImg,appVideo);
    
  },

  // 立即购买
  purchaseBtn:function(){
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    console.log(that.data.money);
    console.log(paytype);
    console.log(id);
    console.log(pcode);
    wx.request({
      url: '' + appUrl +'vbuycourse',
      data: {
        "pingtai": pingtai,
        "money": that.data.money,
        "paytype": paytype,
        "cid": id,
        "pcode": pcode,
        "apptoken": wx.getStorageSync("token"),
      },
      header: {
        'content-type': 'application/json'
      },
      method: "POST",
      dataType: "json",
      success: function (res) {
        console.log(res.data);
        wx.hideLoading();
        if (res.data.result == "01") {
          var info = res.data.pd;
          wx.requestPayment({
            'timeStamp': info.timeStamp,
            'nonceStr': info.nonceStr,
            'package': info.package,
            'signType': 'MD5',
            'paySign': info.paySign,
            'success': function (res) {
              // app.courseplay('' + appUrl + 'courseplay', pingtai, id, that, appImg);
              that.onLoad();
            },
            'fail': function (res) {
            }
          })
        } else {
          getApp().msgShow(that, res.data.msg);
          that.setData({
            login_maskShow: true,
          })
        }
      },
      fail: function (res) { },
      complete: function (res) {
      },
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