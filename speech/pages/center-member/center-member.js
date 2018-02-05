// pages/center-member/center-member.js
var app = getApp();
var appUrl = app.globalData.appUrl;
var pingtai = app.globalData.pingtai;
var appImg = app.globalData.appImg;
var paytype = "1";
var money = "365";

var password = require('../../utils/password.js');
var encryption = require('../../utils/md5.js');
var loginMask = require('../../utils/login.js');

function openVipBtn(url, pingtai, money, paytype, that){
  wx.showLoading({
    title: '加载中',
  })
  wx.request({
    url: url,
    data: {
      "pingtai": pingtai,
      "apptoken": wx.getStorageSync("token"),
      "money":money,
      "paytype": paytype,
      "code": that.data.accreditCode,
      "pcode": encryption.hexMD5(that.data.wallets_password).toLowerCase(),
      "vipcode":""
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
        if (paytype=="1"){
          var info = res.data.pd;
          wx.requestPayment({
            'timeStamp': info.timeStamp,
            'nonceStr': info.nonceStr,
            'package': info.package,
            'signType': 'MD5',
            'paySign': info.paySign,
            'success': function (res) {
              wx.navigateTo({
                url: '../success/success'
              })
              // var pages = getCurrentPages();
              // var prevPage = pages[pages.length - 2];  //上一个页面
              // prevPage.setData({
              //   Refresh: true
              // })
              // wx.navigateBack({
              //   delta: 1,
              // })
            },
            'fail': function (res) {

            }
          })
        }else{
          wx.navigateTo({
            url: '../success/success'
          })

          // wx.showToast({
          //   title: '开通成功',
          //   icon: 'success',
          //   duration: 1000
          // })
          // setTimeout(function(){
          //   var pages = getCurrentPages();
          //   var prevPage = pages[pages.length - 2];  //上一个页面
          //   prevPage.setData({
          //     Refresh: true
          //   })
          //   wx.navigateBack({
          //     delta: 1,
          //   })
          // },1000)    
        }
      } else {
        getApp().msgShow(that, res.data.msg);
        if (res.data.result == "09" || res.data.result == "04"){
          that.setData({
            login_maskShow: true,
          })
        }
      }
    },
    fail: function (res) { },
    complete: function (res) {
    },
  })
}
// 扫码
function getStr(string, str) {
  var str_after = string.split(str)[1];
  return str_after
} 

Page({
  data: {
    is_Show:true,
    account:"0.00",
    paypwd:"",
    wallets_password:"",
    accreditCode:"",
  },
  // 支付方式
  activePayment:function(e){
    this.setData({
      is_Show: true,
    })
    paytype = "1";
  },
  wechatPayment:function(){
    var that = this;
    if (this.data.account>=365){
      this.setData({
        is_Show: false,
      })
      paytype = "0";
    }else{
      app.msgShow(that,"钱包余额不足");
    }
  },
  // 开通会员
  paymentBtn:function(){
    var that = this;
    console.log(that.data.accreditCode);
    if (paytype=="0"){
      if (!that.data.paypwd){
        getApp().msgShow(that,"请前往设置密码");
        setTimeout(function() {
          wx.navigateTo({
            url: '../wallet-password/wallet-password',
          })
        }, 1000);
      }else{ 
        that.setData({
          wallets_password_flag:true,
        })
      }
    }else{
      openVipBtn('' + appUrl + 'vbuyvip', pingtai, money, paytype, that);
    }

  },
  // 授权码
  accreditClick:function(e){
    this.setData({
      accreditCode: e.detail.value,
    })
  },
  //扫一扫
  rqClick: function (e) {
    var that = this;
    wx.scanCode({
      success: (res) => {
        console.log(res);
        var code;
        if (res.result){
          code = res.result;
        }else{
          code = getStr(res.path, "scene=");
        }
        that.setData({
          accreditCode: code
        })
        wx.showToast({
          title: '扫码成功',
          icon: 'success',
          duration: 1500
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '扫码失败',
          icon: 'success',
          duration: 2000
        })
      },
      complete: (res) => {
      }
    })
  },
  // 跳转登录
  hrefStop:function(e){
    this.setData({
      login_maskShow: true,
    })
  },
  onLoad: function (options) {
    var that = this;
    loginMask.init.apply(this, []);
    password.init.apply(this, []);
    paytype = "1";
    money = "365"
    if (scene!=="undefined"){
      console.log(options.scene);
      that.setData({
        accreditCode: scene,
      })
      var scene = decodeURIComponent(options.scene);
    }
    // 钱包
    app.myaccount('' + appUrl + 'myaccount', that, pingtai);
  },
  // 钱包支付
  wallet_pay:function(_this) {
    console.log('钱包支付');
    var that= this;
    openVipBtn('' + appUrl + 'vbuyvip', pingtai, money, paytype, that);
    that.setData({
      wallets_password_flag:false,
      wallets_password: "",
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
    var that= this;
    // 信息
    if (!wx.getStorageSync("token")) {
      that.setData({
        login_maskShow: true,
        hrefState: 0
      })
    } else {
      that.setData({
        hrefState: 1
      })
    }
    app.userData('' + appUrl + 'myinfo', that, pingtai, appImg);
   
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