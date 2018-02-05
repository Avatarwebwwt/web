// pages/wallet-with/wallet-With.js
var app = getApp();
var appUrl = app.globalData.appUrl;
var pingtai = app.globalData.pingtai;
var appImg = app.globalData.appImg;
var id= '';

var password = require('../../utils/password.js');
var encryption = require('../../utils/md5.js');

// 申请提现
function withdrawals(url, pingtai, that, id){
  wx.showLoading({
    title: '加载中',
  })
  wx.request({
    url: url,
    data: {
      "pingtai": pingtai,
      "apptoken": wx.getStorageSync("token"),
      "type": that.data.types,
      "money": that.data.balanceVal,
      "cardno": that.data.cardno,
      "id":id,
      "pcode": encryption.hexMD5(that.data.wallets_password).toLowerCase(),
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
          title: '申请提现成功',
          icon:'success',
          duration:2000
        })
        setTimeout(function(){
          wx.navigateBack({
            delta: 1
          })
        },2000)
      } else {
        getApp().msgShow(that, res.data.msg);
      }
    },
    fail: function (res) { },
    complete: function (res) {
    },
  })
};

Page({
  data: {
    types:"",
    btnShow:true,
    balanceVal:"",
    cardno:"",
  },
  // 输入金额
  balanceInp: function (e) {
    this.setData({
      balanceVal: e.detail.value
    })
    if (this.data.balanceVal == "") {
      this.setData({
        btnShow: true,
      })
    } else {
      this.setData({
        btnShow: false,
      })
    }
  },
  cardnoInp:function(e){
    this.setData({
      cardno: e.detail.value
    })
  },
  
  // 全部提现
  withClick:function(e){
    this.setData({
      balanceVal: this.data.account
    })
    if (this.data.balanceVal == "") {
      this.setData({
        btnShow: true,
      })
    } else {
      this.setData({
        btnShow: false,
      })
    }
  },
   // 申请提现
  passwordBtn:function(){
    var that = this;
    if(that.data.length==0){
      id="";
    } else if (that.data.length == 1){
      id = that.data.isId;
    } else if (that.data.length == 2){
      id = that.data.isOid;
    }
    
    if (that.data.types==0){
      console.log(id);
      if(id==""){
        app.msgShow(that,"请选择银行卡");
        return
      }
      that.setData({
        wallets_password_flag: true
      })
    }else{
      if (that.data.cardno=="") {
        app.msgShow(that, "请输入支付宝账号");
        return
      }
      that.setData({
        wallets_password_flag: true
      })
    }
  },
  wallet_pay: function () {
    var that = this;
    console.log(that.data.wallets_password);
    withdrawals('' + appUrl + 'defund', pingtai, that, id);
    that.setData({
      wallets_password_flag: false,
      wallets_password: "",
    })
  },

  onLoad: function (options) {
    var that = this;
    password.init.apply(this, []);
    that.setData({
      types: options.key,
    })
    app.myaccount('' + appUrl +'myaccount', that, pingtai);
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
    app.bankcardlist('' + appUrl + 'bankcardlist', pingtai, that);
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