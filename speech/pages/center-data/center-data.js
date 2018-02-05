// pages/center-data/center-data.js
var app = getApp();
var appUrl = app.globalData.appUrl;
var pingtai = app.globalData.pingtai;
var appImg = app.globalData.appImg;
var faceImg = "";

// 上传文件
function uploadFile(url, filePath, name, formData, cb) {
  wx.uploadFile({
    url: url,
    filePath: filePath,
    name: name,
    header: {
      'content-type': 'multipart/form-data'
    }, // 设置请求的 header
    formData: formData, // HTTP 请求中其他额外的 form data
    success: function (res) {
      if (res.statusCode == 200 && !res.data.result_code) {
        return typeof cb == "function" && cb(res.data)
      } else {
        return typeof cb == "function" && cb(false)
      }
    },
    fail: function () {
      return typeof cb == "function" && cb(false)
    }
  })
}

Page({
  data: {
    face:"../../images/icon_individual_head_@2x.png",
    // 更换头像
    actionSheetHidden: true, // 是否显示底部可选菜单
    actionSheetItems: [
      { bindtap: 'changeImage', txt: '修改头像' },
      { bindtap: 'viewImage', txt: '查看头像' }
    ], // 底部可选菜单
    isNumber:"",
  },
  changeImage: function () {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var tempFilePaths = res.tempFilePaths[0];
        that.setData({
          actionSheetHidden: !that.data.actionSheetHidden,
          face: tempFilePaths
        });
        uploadFile('https://www.shidiankan.com/speech/appupload/upload', that.data.face, 'img', {}, function (res) {
          if (null != res) {
            var obj = JSON.parse(res);
            if (obj) {
              faceImg = obj.pd.files[0];
              if (faceImg) {
                that.setData({
                  face: appImg + faceImg
                })
              }
            }
          } else {
            // 显示消息提示框  
            wx.showToast({
              title: '上传失败',
              icon: 'error',
              duration: 2000
            })
          }
        });
        // 图片截取
        // wx.navigateTo({
        //   url: '../upload/upload?src=' + tempFilePaths + ''
        // })
      }
    })
  },
  // 查看原图
  viewImage: function () {
    var that = this;
    wx.previewImage({
      current: '', // 当前显示图片的http链接
      urls: [that.data.face] // 需要预览的图片http链接列表
    })
  },
  // 点击头像 显示底部菜单
  setUpFace: function () {
    var that = this;
    that.setData({
      actionSheetHidden: !that.data.actionSheetHidden
    })
  },
  // 点击其他区域 隐藏底部菜单
  actionSheetbindchange: function () {
    var that = this;
    that.setData({
      actionSheetHidden: !that.data.actionSheetHidden
    })
  },

  //修改资料
  nameInp:function(e){
    this.setData({
      name: e.detail.value
    })
  },
  jobInp: function (e) {
    this.setData({
      position: e.detail.value
    })
  },
  briefInp: function (e) {
    // console.log(this.data.sign);
    // var num = 50 - this.data.sign.length;

    var value = e.detail.value, len = parseInt(value.length);
    if (len > 50) return;
    this.setData({
      sign: e.detail.value, 
      isNumber: 50-len,
    })

  },
  infoBtn:function(){
    var that = this;
    console.log(that.data.name)
    console.log(that.data.position)
    console.log(that.data.face)
    console.log(that.data.sign)
    app.modify('' + appUrl + 'modifyData', that, pingtai, faceImg);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app.userData('' + appUrl + 'myinfo', that, pingtai, appImg);
   
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