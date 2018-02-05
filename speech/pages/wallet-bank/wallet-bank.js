// pages/wallet-bank/wallet-bank.js
var app = getApp();
var appUrl = app.globalData.appUrl;
var pingtai = app.globalData.pingtai;
var appImg = app.globalData.appImg;

Page({
  data: {
    is_show:true,
    emptyShow:true,
    msgShow:true,
    isId:"",
  },
  emptyShowBtn:function(e){
    this.setData({
      emptyShow: !this.data.is_show,
      is_show: !this.data.emptyShow,
    })
  },
  // 删除银行卡
  emptyBtn:function(e){
    console.log(e.currentTarget.id);
    var id = e.currentTarget.id;
    var that = this;
    wx.showModal({
      title: '删除银行卡',
      content: '确定删除银行卡',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定');
          wx.showLoading({
            title: '加载中',
          })
          wx.request({
            url: '' + appUrl + 'delbankcard',
            data: {
              "pingtai": pingtai,
              "apptoken": wx.getStorageSync("token"),
              "id": id,
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
                that.onLoad();
              } else {
                getApp().msgShow(that, res.data.msg);
              }
            },
            fail: function (res) { },
            complete: function (res) {
            },
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 确定
  btn:function(e){
    var that = this;
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];  //上一个页面
    prevPage.setData({
      isOid: that.data.isId,
    })
    wx.navigateBack({
      delta: 1
    })
  },
  activeBtn:function(e){
    console.log(e.currentTarget.id);
    var that = this;
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];  //上一个页面
    prevPage.setData({
      isOid: e.currentTarget.id,
    })
    wx.navigateBack({
      delta: 1
    })
  },

  onLoad: function (options) {
    var that = this;
    // 银行卡列表
    app.bankcardlist('' + appUrl + 'bankcardlist', pingtai,that,appImg);

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