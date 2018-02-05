// pages/webpage/webpage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    path:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      path: options.id
    })
  },
})