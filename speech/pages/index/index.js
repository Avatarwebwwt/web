//index.js
//获取应用实例
const app = getApp();
var appUrl = app.globalData.appUrl;
var pingtai = app.globalData.pingtai;
var appImg = app.globalData.appImg;
var currentPage = 0;
var pageSize = 0;

var loginMask = require('../../utils/login.js');

function houClass(url,that){
  wx.showLoading({
    title: '加载中',
  })
  wx.request({
    url: url,
    data: {
      "pingtai": pingtai,
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
        for (var i = 0; i < res.data.list.length;i++){
          res.data.list[i].url = appImg+res.data.list[i].url
        }
        that.setData({
          list: res.data.list
        })
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
    path:"",
    jpcourselist:[],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000 ,
    msgShow:true,
    myLength:0,
    length:0,
  },
  // banner
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  // 点击轮播图
  bannerClick:function(e){
    console.log(e);
    console.log(e.target.id)
    var flag = e.target.id;
    var that = this;
    var uid = e.target.dataset.uid;
    if (flag==1){
      wx.navigateTo({
        url: '../intro/intro?id='+uid+'',
      })
    } else if (flag ==2){
      wx.navigateTo({
        url: '../speech-deta/speech-deta?id='+uid+'',
      })
    } else if (flag == 0) {
      wx.navigateTo({
        url: '../webpage/webpage?id=' + uid + '',
      })
    }
  },
  onLoad: function () {
    var that = this;
    console.log(wx.getStorageSync("token"));
    wx.showShareMenu({
      withShareTicket: true
    })
    loginMask.init.apply(this, []);
    // 获取用户信息
    // app.userInfoFn();
    // 获取网络状态
    app.network();
    // 是否登录
    if (wx.getStorageSync("token")) {
      that.setData({
        token: wx.getStorageSync("token"),
      })
      app.indexHtml(appUrl, that, pingtai,appImg);
    }else{
      app.indexHtml(appUrl, that, pingtai, appImg);
      that.setData({
        login_maskShow: true,
      })
    }
    // 热门分类
    houClass('' + appUrl +'coursetypelist',that);
    // 精品课程
    // currentPage = 1;
    // pageSize = 10;
    // app.boutiqueFun('' + appUrl + 'courselist', pingtai, currentPage, pageSize, that,appImg);
  },
  onShow: function () {
    
  },
  // 下拉
  onPullDownRefresh: function () {
    var that = this;
    wx.showNavigationBarLoading() //在标题栏中显示加载
    if (wx.getStorageSync("token")) {
      that.setData({
        token: wx.getStorageSync("token"),
      })
      app.indexHtml(appUrl, that, pingtai, appImg);
    } else {
      that.setData({
        login_maskShow: true,
      })
    }
    setTimeout(function () {
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },
  // 滑到底部
  onReachBottom: function () {
    var that = this;
    if (that.data.length == "10") {
      currentPage++;
      console.log('第' + currentPage + '页');
      // app.boutiqueFun('' + appUrl + 'courselist', pingtai, currentPage, pageSize, that, appImg);
    }
  },
})
