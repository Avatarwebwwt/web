// pages/wallet-recharg/wallet-recharg.js
var app = getApp();
var appUrl = app.globalData.appUrl;
var pingtai = app.globalData.pingtai;
var appImg = app.globalData.appImg;

var paytype = "1";

Page({
  data: {
    btnShow:true,
    balanceVal:"",
  },
  balanceInp:function(e){
    this.setData({
      balanceVal: e.detail.value
    })
    if (this.data.balanceVal==""){
      this.setData({
        btnShow: true,
      })
    }else{
      this.setData({
        btnShow: false,
      })
    }
  },
  passwordBtn:function(e){ 
    var that = this;

    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: '' + appUrl + 'vrecharg',
      data: {
        "pingtai": pingtai,
        "apptoken": wx.getStorageSync("token"),
        "money": that.data.balanceVal,
        "paytype": paytype,
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
              var pages = getCurrentPages();
              var prevPage = pages[pages.length - 2];  //上一个页面
              prevPage.setData({
                Refresh: true
              })
              wx.navigateBack({
                delta: 1,
              })
            },
            'fail': function (res) {
            }
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 钱包
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
  
  },
  
})