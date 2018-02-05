// pages/vip/vip.js
var app = getApp();
var appUrl = app.globalData.appUrl;
var pingtai = app.globalData.pingtai;
var appImg = app.globalData.appImg;

var currentPage = "1";
var pageSize = "10";
var status= 0;
var requestStatus1 = true;
var requestStatus2 = true;

function vipList(url, pageSize, currentPage, status, that) {
  wx.showLoading({
    title: '加载中',
  })
  wx.request({
    url: url,
    data: {
      "pingtai": pingtai,
      "apptoken": wx.getStorageSync("token"),
      "pageSize": pageSize,
      "currentPage": currentPage,
      "status": status,
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
        var length = res.data.list.length;
        that.setData({
          length: length
        })
        if (currentPage == "1") {
          that.setData({
            list: res.data.list
          })
        } else {
          if (length == "0") {
            return
          }
          var Member = res.data.list;
          var arr = that.data.list;
          for (var i = 0; i < length; i++) {
            arr.push(Member[i]);
          }
          that.setData({
            list: arr,
          })
        }
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
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    length:0,
  },
  //  滑动切换tab 
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
    console.log(that.data.currentTab);
    if (that.data.currentTab==1){
      status = "1";
      currentPage = "1";
      vipList('' + appUrl + 'vipcodelist', pageSize, currentPage, status, that);
    }else{
      status = "0";
      currentPage = "1";
      vipList('' + appUrl + 'vipcodelist', pageSize, currentPage, status, that);
    }
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
  // 赋值
  copyBtn:function(e){
    var that = this;
    var code = e.currentTarget.id;
    wx.setClipboardData({
      data: code,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
          icon: "success",
          duration: 1500
        });
      }
    })
  },
  onLoad: function (options) {
    var that = this;
    currentPage = "1";
    status = "0";
    requestStatus1 = true;
    requestStatus2 = true;
    // 获取屏幕宽高
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    })
    // vip码列表
    vipList('' + appUrl + 'vipcodelist', pageSize, currentPage, status, that);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  addVip:function(e){
    var that = this;
    if (that.data.length == "10") {
      currentPage++;
      console.log('第' + currentPage + '页');
      vipList('' + appUrl + 'vipcodelist', pageSize, currentPage, status, that);
    }
  },
  onReachBottom: function () {
    
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})