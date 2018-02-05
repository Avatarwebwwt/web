// pages/video/video.js
const app = getApp();
var appUrl = app.globalData.appUrl;
var pingtai = app.globalData.pingtai;
var appImg = app.globalData.appImg;
var appVideo = app.globalData.appVideo;
var currentPage = "";
var id = "";
var videoUrl = "";
var vid = "";

var loginMask = require('../../utils/login.js');

Page({
  data: {
    commentShow:false,
    PublisVal:"",
    length:0,
  },
  // 评论
  commentBtn:function(e){
    var that= this;
    // 登录
    if(wx.getStorageSync("token")){
      this.setData({
        commentShow: true
      })
    }else{
      that.setData({
        login_maskShow: true,
      })
    }
  },
  PublisBtn:function(e){
    var that = this;
    if (that.data.PublisVal==""){
      getApp().msgShow(that,"请输入评论内容");
      return 
    }
    app.commentFun('' + appUrl + 'updiscuss', pingtai, id, that);
    
  },
  // 评论内容
  PublisInp:function(e){
    this.setData({
      PublisVal: e.detail.value
    })
  },

  // 课时
  videoBar:function(e){
    console.log(e);
    console.log(e.currentTarget.dataset.id);
    this.setData({
      classlistUrl: e.currentTarget.id,
      videoId: e.currentTarget.dataset.id
    })
  },
  videoBarVip:function(e){ 
    var that = this;
    console.log(2);
    getApp().msgShow(that,"您还不是会员暂不能观看");
  },
  // 播放
  playClick: function (event){
    console.log(event);
    console.log(this.data.videoId);
    var that = this;
    console.log("视频播放记录");
    var id = event.currentTarget.id;
    console.log(id);
    if (wx.getStorageSync("token")){
      app.upplaydata('' + appUrl + 'upplaydata', id, that, pingtai);
    }
  },
  onLoad: function (options) {
    var that = this;
    loginMask.init.apply(this, []);
    currentPage = 1;
    // 课程播放
    console.log(options);

    if (options){
      id = options.id;
      videoUrl = options.url;
      vid = options.vid
      try {
        wx.setStorageSync('videoId', id);
        wx.setStorageSync('videoUrl', videoUrl);
        wx.setStorageSync('vid', vid);        
      } catch (e) {
      }
      this.setData({
        classlistUrl: videoUrl,
        videoId: vid,
      })
    }else{
      id = wx.getStorageSync("videoId");
      console.log(id);
      this.setData({
        classlistUrl: wx.getStorageSync("videoUrl"),
        videoId: wx.getStorageSync("vid"),
      })
    }
    app.courseplay('' + appUrl + 'courseplay', pingtai, id, that,appImg,appVideo);

    // 评论页
    app.commentPage('' + appUrl + 'discusslist', pingtai, id, currentPage, that, appImg);
    console.log(that.data.classlistUrl)
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