// pages/speech/speech.js
const app = getApp();
var appUrl = app.globalData.appUrl;
var pingtai = app.globalData.pingtai;
var appImg = app.globalData.appImg;
var appVideo = app.globalData.appVideo;
var currentPage = 0;
var curVideoId = "";

function requestFun(url, pingtai, currentPage,that){
  wx.showLoading({
    title: '加载中',
  })
  wx.request({
    url: url,
    data: {
      "pingtai": pingtai,
      "currentPage": currentPage,
      "prevVideoId":""
    },
    header: {
      'content-type': 'application/json'
    },
    method: "POST",
    dataType: "json",
    success: function (res){
      console.log(res.data);
      wx.hideLoading();
      if (res.data.result == "01") {
        var length = res.data.list.length;
        that.setData({
          length: length
        })
        if (currentPage == "1") {
          for (var i = 0; i < length; i++) {
            res.data.list[i].url = appVideo + res.data.list[i].url;
            res.data.list[i].face = appImg + res.data.list[i].face;
          }
          that.setData({
            list: res.data.list
          })
        } else {
          if (length == "0"){
            return
          }
          var Member = res.data.list;
          var arr = that.data.list;
          for (var i = 0; i < length; i++) {
            Member[i].url = appVideo + Member[i].url;
            Member[i].face = appImg + Member[i].face;
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
}

Page({
  data: {
    length:0,
    
    playIndex:null,
  },
  // 播放
  // startPlay: function (e) {
  //   console.log("播放");
  //   curVideoId = e.currentTarget.id;
  //   console.log(this.data.prevVideoId);    //当前视频id

  //   if (this.data.prevVideoId) {
  //     var prevV = wx.createVideoContext(this.data.prevVideoId);
  //     prevV.pause();
  //   }
  //   var videoContext = wx.createVideoContext(curVideoId);
  //   videoContext.play();
  //   this.setData({
  //     prevVideoId: curVideoId
  //   });
  // },

  // add
  videoPlay: function (e) {
    var length = this.data.list.length
    var id = e.currentTarget.id
    console.log(this.data.playIndex, id) // 当前播放与当前点击
    if (!this.data.playIndex) { // 没有播放时播放视频
      this.setData({
        playIndex: id
      })
      var videoContext = wx.createVideoContext('index' + id)
      videoContext.play()
    } else {                    // 有播放时先将prev暂停到0s，再播放当前点击的current
      var videoContextPrev = wx.createVideoContext('index' + this.data.playIndex)
      videoContextPrev.seek(0)
      videoContextPrev.pause()
      this.setData({
        playIndex: id
      })
      var videoContextCurrent = wx.createVideoContext('index' + this.data.playIndex)
      videoContextCurrent.play()
    }
  },

  onLoad: function (options) {
    var that = this;
    currentPage = 1;
    requestFun('' + appUrl + 'speechlist', pingtai, currentPage, that);
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
    this.setData({
      prevVideoId:"",
    })
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
    var that = this;
    wx.showNavigationBarLoading() //在标题栏中显示加载
    currentPage = 1;
    requestFun('' + appUrl + 'speechlist', pingtai, currentPage, that);
    setTimeout(function () {
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    if (that.data.length == "10") {
      currentPage++;
      console.log('第' + currentPage + '页');
      requestFun('' + appUrl + 'speechlist', pingtai, currentPage, that);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})