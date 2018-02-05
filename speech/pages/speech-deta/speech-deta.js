// pages/speech-deta/speech-deta.js
var app = getApp();
var appUrl = app.globalData.appUrl;
var pingtai = app.globalData.pingtai;
var appImg = app.globalData.appImg;
var appVideo = app.globalData.appVideo;
var currentPage = 0;
var id = '';

var loginMask = require('../../utils/login.js');

Page({
  data: {
    commentShow: false,
    PublisVal: "",
    length:0,
  },
  // 评论
  commentBtn: function (e) {
    var that = this;
    console.log(wx.getStorageSync("token"))
    // 登录
    if (wx.getStorageSync("token")) {
      this.setData({
        commentShow: true
      })
    } else {
      that.setData({
        login_maskShow: true,
      })
    }
  },
  PublisBtn: function (e) {
    var that = this;
    console.log(id)
    if (that.data.PublisVal == "") {
      getApp().msgShow(that, "请输入评论内容");
      return
    }
    app.commentFun('' + appUrl + 'updiscuss', pingtai, id, that);
  },
  // 评论内容
  PublisInp: function (e) {
    this.setData({
      PublisVal: e.detail.value
    })
  },

  // 播放
  playClick:function(e){
    console.log(e);
    var that = this;
    var id = e.target.dataset.id;
    console.log(id)
    if (wx.getStorageSync("token")){
      app.upplaydata('' + appUrl + 'upplaydata', id, that, pingtai);
    }
  },
  onLoad: function (options){
    var that = this;
    loginMask.init.apply(this, []);
    
    if (options) {
      id = options.id;
      try {
        wx.setStorageSync('videoId', id);
      } catch (e) {
      }
    } else {
      id = wx.getStorageSync("videoId");
    }
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: '' + appUrl + 'speechinfo',
      data: {
        "pingtai": pingtai,
        "id": id
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
          res.data.pd.url = appVideo + res.data.pd.url;
          res.data.pd.uface = appImg + res.data.pd.uface;
          res.data.pd.face = appImg + res.data.pd.face;
          that.setData({
            crttm: res.data.pd.crttm,
            face: res.data.pd.face,
            id: res.data.pd.id,
            nickname: res.data.pd.nickname,
            position: res.data.pd.position,
            sign: res.data.pd.sign,
            title: res.data.pd.title,
            uface: res.data.pd.uface,
            uid: res.data.pd.uid,
            url: res.data.pd.url,
          })
        } else {
          getApp().msgShow(that, res.data.msg);
        }
      },
      fail: function (res) { },
      complete: function (res) {
      },
    })

    // 评论页
    currentPage = 1;
    app.commentPage('' + appUrl + 'discusslist', pingtai, id, currentPage, that, appImg);
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
  footerEvent:function(e){
    var that = this;
    if (that.data.length == "10") {
      currentPage++;
      console.log('第' + currentPage + '页');
      app.commentPage('' + appUrl + 'discusslist', pingtai, id, currentPage, that, appImg);
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