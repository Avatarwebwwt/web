// pages/vipOpen/vipOpen.js
var app = getApp();
var appUrl = app.globalData.appUrl;
var pingtai = app.globalData.pingtai;
var appImg = app.globalData.appImg;

var paytype = "3";
var money = "365";

// 扫码
function getStr(string, str) {
  var str_after = string.split(str)[1];
  return str_after
} 

function openVipBtn(url, pingtai, money, paytype, that) {
  console.log(that.data.accreditCode)
  wx.showLoading({
    title: '加载中',
  })
  wx.request({
    url: url,
    data: {
      "pingtai": pingtai,
      "apptoken": wx.getStorageSync("token"),
      "money": money,
      "paytype": paytype,
      "code": that.data.accreditCode,
      "pcode":"",
      "vipcode": that.data.vipVal
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
        wx.navigateTo({
          url: '../success/success'
        })
        // wx.showToast({
        //   title: '开通成功',
        //   icon: "sueccess",
        //   duration: 1000
        // })
        // setTimeout(function () {
        //   var pages = getCurrentPages();
        //   var prevPage = pages[pages.length - 3];  //上一个页面
        //   prevPage.setData({
        //     Refresh: true
        //   })
        //   wx.navigateBack({
        //     delta: 2,
        //   })
        // }, 1000)
      } else {
        getApp().msgShow(that, res.data.msg);
        if (res.data.result == "04"){
          wx.navigateBack({
            delta: 1
          })
        }
      }
    },
    fail: function (res) { },
    complete: function (res) {
    },
  })
}

Page({
  data: {
    vipVal:"",
  },
  // 授权码
  accreditClick: function (e) {
    this.setData({
      accreditCode: e.detail.value,
    })
  },
  rqClick:function(e){
    var that = this;
    wx.scanCode({
      success: (res) => {
        console.log(res);
        var code;
        if (res.scanType =="QR_CODE"){
          code = res.result;
        }
        
        if (res.scanType == "WX_CODE"){
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
  onLoad: function (options) {
    var that = this;
    paytype = "3";
    money = "365";
    console.log(options.code);
    that.setData({
      accreditCode: options.code,
    })
  },
  vipInp:function(e){
    this.setData({
      vipVal: e.detail.value
    })
  },
  paymentBtn:function(e){
    var that = this;
    if (that.data.vipVal==""){
      app.msgShow(that, "请输入vip服务卡码");
      return false
    }
    openVipBtn('' + appUrl +'vbuyvip', pingtai, money, paytype, that);
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