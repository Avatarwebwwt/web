// pages/wallet-forget/wallet-forget.js
var app = getApp();
// 验证码判断
var countdown = 60;
var settime = function (that) {
  if (countdown == 0) {
    that.setData({
      is_show: true
    })
    countdown = 60;
    return;
  } else {
    that.setData({
      is_show: false,
      numbers: countdown
    })
    countdown--;
  }
  setTimeout(function () {
    settime(that)
  }
    , 1000)
};
// 点击按钮
function btnClass(that){
  if ( that.data.codeVal.length == 4 && that.data.passVal.length == 6) {
    that.setData({
      btnShow: false
    })
  } else {
    that.setData({
      btnShow: true
    })
  }
};
Page({
  data: {
    is_show:true,
    codeVal: "",
    passVal:"",
    msgShow:true,
    // 按钮
    btnShow:true
  },
  // 获取验证码
  codeGet:function(e){
    var that = this;
    app.validatemobile(that,that.data.phoneVal,function(){
      settime(that);
    });
  },
  // 赋值
  // phoneEvent:function(e){
  //   var that= this;
  //   this.setData({
  //     phoneVal: e.detail.value
  //   });
  //   btnClass(that);
  // },
  codeEvent: function (e) {
    var that = this;
    this.setData({
      codeVal: e.detail.value
    });
    btnClass(that);
  },
  passEvent: function (e) {
    var that = this;
    this.setData({
      passVal: e.detail.value
    });
    btnClass(that);
  },
  // 加载
  onLoad: function (options) {
  
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