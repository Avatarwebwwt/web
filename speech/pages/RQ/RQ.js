// pages/RQ/RQ.js
var app = getApp();
var appUrl = app.globalData.appUrl;
var pingtai = app.globalData.pingtai;
var appImg = app.globalData.appImg;

// 画布
// function drawCanvas(that){
//   var size = (that.data.windowWidth)/ 750;
//   console.log(size);

//   const ctx = wx.createCanvasContext('RQcanvas');
//   var height = (that.data.height) * size;
//   var width = (that.data.width) * size;
//   // 背景
//   ctx.drawImage(that.data.bgImg, 0, 0, width, height);
//   // 框
//   // ctx.setFillStyle('#FFFFFF');
//   // ctx.setShadow(0 ,0 ,5 ,"#999999")
//   ctx.drawImage("../../images/btn_erweima@2x.png",width / 2 - (100 * size), height / 2 - (100 * size), 200 * size, 200*size);
//   // 二维码
//   ctx.drawImage(that.data.RQImg, width / 2 - (80 * size), height / 2 - (80 * size), 160 * size, 160 * size);
//   // 文本
//   ctx.setFontSize(26 * size);
//   ctx.setFillStyle("#333333");
//   ctx.setTextAlign("center");
//   ctx.setTextBaseline("middle");
//   ctx.fillText('我是 ' + that.data.nickname + '', width /2, 770 * size);

//   ctx.setFillStyle("#ef9603");
//   ctx.setTextBaseline("middle");
//   ctx.setFontSize(30 * size);
//   ctx.setTextAlign("center");
//   ctx.fillText('我为演说365代言', width /2, 815 * size);
//   ctx.draw();
// };
// 请求
function otherinfo(url, pingtai, userid, that, appImg) {
  wx.showLoading({
    title: '加载中',
  })
  wx.request({
    url: url,
    data: {
      "pingtai": pingtai,
      "userid": userid,
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
        // res.data.pd.face = appImg + res.data.pd.face;
        // res.data.pd.codeurl = appImg + res.data.pd.codeurl;
        // res.data.pd.vcode = appImg + res.data.pd.vcode;
        res.data.pd.gvcode = appImg + res.data.pd.gvcode;
        // that.setData({
          // nickname: res.data.pd.nickname,
          // face: res.data.pd.face,
          // phone: res.data.pd.phone,
          // code: res.data.pd.code,
          // codeurl: res.data.pd.codeurl,
          // vcode: res.data.pd.vcode,
          // sign: res.data.pd.sign,
          // position: res.data.pd.position,
          // vip: res.data.pd.vip,
          // rank: res.data.pd.rank,
          // member: res.data.pd.member,
          // gvcode: res.data.pd.gvcode,
        // })
        var gvcodeImg = res.data.pd.gvcode;
        if (wx.getStorageSync("isKeyImg")){
          console.log(1)
          that.setData({
            RQImg: wx.getStorageSync("isKeyImg"),
            gvcode: wx.getStorageSync("isKeyImg"),
          })
          if (wx.getStorageSync("keyImg") !== gvcodeImg){
            console.log(2);
            wx.downloadFile({
              url: gvcodeImg,
              success: function (res) {
                console.log(res.tempFilePath);
                that.setData({
                  RQImg: res.tempFilePath,
                })
                try {
                  wx.setStorageSync('keyImg', gvcodeImg);
                  wx.setStorageSync('isKeyImg', res.tempFilePath);
                } catch (e) {
                }
                // drawCanvas(that);
              },
              fail: function () {
                console.log('fail');
              }
            })
          }
        }else{
          console.log(3)
          wx.downloadFile({
            url: gvcodeImg,
            success: function (res) {
              console.log(res.tempFilePath);
              that.setData({
                RQImg: res.tempFilePath,
              })
              try {
                wx.setStorageSync('keyImg', gvcodeImg);
                wx.setStorageSync('isKeyImg', res.tempFilePath);
              } catch (e) {
              }
              // drawCanvas(that);
            },
            fail: function () {
              console.log('fail');
            }
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
};
Page({
  data: {
    RQImg:"",
    name:"",
    vcode:"",
    token: wx.getStorageSync("token"),
    actionSheetHidden: true,
    actionSheetItems: [
      { bindtap: 'Menu', txt: '保存图片到相册' },
    ],
    bgImg:"../../images/bg_dimensionalcode@2x.png",
    width: "",
    height:"",
  },
  // 底部弹框
  actionSheetTap: function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  actionSheetbindchange: function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  //保存到相册
  previewImage:function(e){
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  Menu:function(e){
    var that = this;
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    });
    // 授权
    wx.authorize({
      scope: 'scope.writePhotosAlbum',
      success(res) {
        // 用户已经同意
        console.log(res);
        wx.saveImageToPhotosAlbum({
          filePath: that.data.RQImg,
          success: function (res) {
            console.log(res);
          },
          fail: function (res) {
            console.log()
            console.log(res);
          }
        })
      },
      fail: function (res) {
        console.log("图片获取失败");
        wx.showModal({
          title: '提示',
          content: '若不微信授权,将无法保存图片,点击取消可重新获取授权',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定');
            } else if (res.cancel) {
              console.log('用户点击取消');
              wx.openSetting({
                success: function (res) {
                  if (!res.authSetting["scope.writePhotosAlbum"]) {
                    //这里是授权成功之后 填写你重新获取数据的js
                    that().Menu();
                  }
                }
              })
            }
          }
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var userid = options.id;
    otherinfo('' + appUrl + 'otherinfo', pingtai, userid, that, appImg);
    wx.getImageInfo({
      src:that.data.bgImg,
      success: function (res) {
        that.setData({
          width: res.width,
          height: res.height,
        })
      }
    })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowWidth: res.windowWidth,
        })
      }
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
})