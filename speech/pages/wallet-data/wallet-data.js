// pages/wallet-data/wallet-data.js
const app = getApp();
var appUrl = app.globalData.appUrl;
var pingtai = app.globalData.pingtai;
var appImg = app.globalData.appImg;

Page({
  data: {
    
  },
  onLoad: function (options) {
    var id = options.id;

    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: '' + appUrl + 'billinfo',
      data: {
        "pingtai": pingtai,
        "apptoken": wx.getStorageSync("token"),
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
          res.data.pd.face = appImg + res.data.pd.face;
          that.setData({
            face: res.data.pd.face,
            remark: res.data.pd.remark,
            no: res.data.pd.no,
            money: res.data.pd.money,
            crttm: res.data.pd.crttm,
            nickname: res.data.pd.nickname,
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