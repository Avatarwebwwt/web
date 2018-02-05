// pages/wallet-password/wallet-password.js
var app = getApp();
var appUrl = app.globalData.appUrl;
var pingtai = app.globalData.pingtai;
var appImg = app.globalData.appImg;
var countdown = 60;
var encryption = require('../../utils/md5.js');

// 点击按钮
function btnClass(that) {
  if (that.data.codeVal.length > 3 && that.data.passVal.length == 6) {
    that.setData({
      btnShow: false
    })
  } else {
    that.setData({
      btnShow: true
    })
  }
};
Page({
  data: {
    loginis_show: true,
    codeVal: "",
    passVal: "",
    msgShow: true,
    // 按钮
    btnShow: true
  },
  // 赋值
  codeEvent: function (e) {
    var that = this;
    this.setData({
      codeVal: e.detail.value
    });
    btnClass(that);
  },
  passEvent: function (e) {
    var that = this;
    this.setData({
      passVal: e.detail.value
    });
    btnClass(that);
  },
  // 获取验证码
  codeGet:function(e){
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: '' + appUrl +'getsmscode',
      data: {
        "pingtai": pingtai,
        "apptoken": wx.getStorageSync("token"),
        "phone": that.data.phone
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
          that.setData({
            loginis_show: false,
          })
          app.settime(that, countdown);
          wx.showToast({
            title: '验证码已发送',
            icon:"success",
            duration:2000
          })
        } else {
          getApp().msgShow(that, res.data.msg);
        }
      },
      fail: function (res) { },
      complete: function (res) {
      },
    })
    
  },
  // 设置密码
  passwordBtn:function(e){
    var that = this;
    console.log(encryption.hexMD5(that.data.passVal).toLowerCase());
    console.log(that.data.passVal);
    console.log(that.data.codeVal);
    wx.request({
      url: '' + appUrl + 'paypwd',
      data: {
        "pingtai": pingtai,
        "phone": that.data.phone,
        "apptoken": wx.getStorageSync("token"),
        "password": encryption.hexMD5(that.data.passVal).toLowerCase(),
        "code": that.data.codeVal
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
          wx.showToast({
            title: '设置成功',
            icon:"success",
            duration:1000
          })
          setTimeout(function(){
            wx.navigateBack({
              delta: 1
            })
          },1000)
        } else {
          getApp().msgShow(that, res.data.msg);
        }
      },
      fail: function (res) { },
      complete: function (res) {
      },
    })
  },
  // 加载
  onLoad: function (options) {
    var that = this;
    app.myaccount('' + appUrl + 'myaccount', that, pingtai);
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