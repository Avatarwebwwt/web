// pages/news/news.js
var app = getApp();
var appUrl = app.globalData.appUrl;
var pingtai = app.globalData.pingtai;
var appImg = app.globalData.appImg;

var currentPage = 0;
var pageSize = "15";

function newslist(url, pingtai, currentPage, pageSize, that, appImg) {
  wx.showLoading({
    title: '加载中',
  })
  wx.request({
    url: url,
    data: {
      "pingtai": pingtai,
      "apptoken": wx.getStorageSync("token"),
      "currentPage": currentPage,
      "pageSize": pageSize,
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
          for (var i = 0; i < length; i++) {
            res.data.list[i].face = appImg + res.data.list[i].face
          }
          that.setData({
            newsList: res.data.list
          })
        } else {
          if (length == "0") {
            return
          }
          var Member = res.data.list;
          var arr = that.data.newsList;
          for (var i = 0; i < length; i++) {
            Member[i].face = appImg + Member[i].face;
            arr.push(Member[i]);
          }
          that.setData({
            newsList: arr,
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
}

Page({
  data: {
    length:"",
  },
  onLoad: function (options) {
    var that = this;
    currentPage = 1;
    newslist('' + appUrl + 'newslist', pingtai, currentPage, pageSize, that, appImg);
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
      newslist('' + appUrl + 'newslist', pingtai, currentPage, pageSize, that, appImg);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})