// pages/wallet-add/wallet-add.js
var app = getApp();
function btnClass(that) {
  if (that.data.arrId && that.data.nameVal !== "" && that.data.phoneVal !== "" && that.data.numberVal !== "" ) {
    that.setData({
      btnShow: false
    })
  } else {
    that.setData({
      btnShow: true
    })
  }
};
var arrId = [];
var appUrl = app.globalData.appUrl;
var pingtai = app.globalData.pingtai;
var appImg = app.globalData.appImg;

// 银行卡正则
function isBankCard(str) {
  var reg = /^(\d{16}|\d{19})$/;
  if (reg.test(str)) {
    return true;
  }
  return false;
}

function banklist(url, that) {
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
        var arr = [];
        for(var i=0;i<res.data.list.length;i++){
          arr.push(res.data.list[i].name);
          arrId.push(res.data.list[i].id);
        }
        that.setData({
          array: arr,
          arrId: arrId[0],
        })
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
    btnShow: true,
    // bankVal: "",
    numberVal: "",
    phoneVal: "",
    nameVal: "",

    array: [],
    index: 0,
  },
  // 赋值
  // bankInp: function (e) {
  //   var that = this;
  //   this.setData({
  //     bankVal: e.detail.value
  //   });
  //   btnClass(that);
  // },
  numberInp: function (e) {
    var that = this;
    this.setData({
      numberVal: e.detail.value
    });
    btnClass(that);
  },
  phoneInp: function (e) {
    var that = this;
    this.setData({
      phoneVal: e.detail.value
    });
    btnClass(that);
  },
  nameInp: function (e) {
    var that = this;
    this.setData({
      nameVal: e.detail.value
    });
    btnClass(that);
  },

  // 选择银行
  bindPickerChange: function (e) {
    console.log(e);
    this.setData({
      index: e.detail.value,
      arrId: arrId[e.detail.value],
    })
    console.log(e.detail.value);
    console.log(this.data.arrId);
  },

  // 添加银行卡
  passwordBtn:function(e){
    var that = this;
    console.log(that.data.nameVal)
    console.log(that.data.numberVal)
    console.log(that.data.phoneVal);
    // 判断
    console.log(isBankCard(that.data.numberVal));
    if (isBankCard(that.data.numberVal)==false){
      app.msgShow(that, "银行卡号不正确");
      return
    }
    app.validatemobile(that, that.data.phoneVal,function(){
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: '' + appUrl + 'addbankcard',
        data: {
          "pingtai": pingtai,
          "apptoken": wx.getStorageSync("token"),
          "bid": that.data.arrId,
          "name": that.data.nameVal,
          "cardno": that.data.numberVal,
          "phone": that.data.phoneVal
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
            wx.navigateBack({
              delta: 1
            })
          } else {
            getApp().msgShow(that, res.data.msg);
          }
        },
        fail: function (res) { },
        complete: function (res) {
        },
      })
    })
  },
  onLoad: function (options) {
     var that = this;
     arrId = [];
     banklist('' + appUrl +'banklist', that);
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