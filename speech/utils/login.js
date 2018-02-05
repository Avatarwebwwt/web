var encryption = require('md5.js');
function init() {
  var that = this;
  var appUrl = getApp().globalData.appUrl;
  var pingtai = getApp().globalData.pingtai;
  //login中相应的数据
  that.setData({
    loginis_show:true,
    login_maskShow: false,
    login_loginText:"登录",
    login_registText: "立即注册",
    login_registShow: true,
    login_paddwordInp: false,
    login_key: 1,
    login_phoneVal: '',
    login_passwordVal: '',
    login_codeVal: '',
  })
  
  //login中相应的 操作
  that.login_registtap=function(e) {
    var key = e.target.id;
    if (key == 1) {
      this.setData({
        login_loginText: "注册",
        login_registText: "立即登录",
        login_registShow: false,
        login_paddwordInp: false,
        login_key: 2,
      })
    } else{
      this.setData({
        login_loginText: "登录",
        login_registText: "立即注册",
        login_registShow: true,
        login_paddwordInp: false,
        login_key: 1,
      })
    }
  },
  that.login_paddwordTap= function(e) {
    var key = e.target.id;
    this.setData({
      login_loginText: "忘记密码",
      login_registText: "立即登录",
      login_registShow: false,
      login_paddwordInp: false,
      login_key: key
    })
  },
  // 关闭窗口
  that.login_maskHide = function () {
    this.setData({
      login_maskShow: false,
    })
  },
  // 赋值
  that.login_phoneInp= function(e) {
    this.setData({
      login_phoneVal: e.detail.value
    });
  },
  that.login_passwordInp= function (e) {
    this.setData({
      login_passwordVal: e.detail.value
    });
  },
  that.login_codeInp= function (e) {
    this.setData({
      login_codeVal: e.detail.value
    });
  },
  // 登录
  that.login_loginBtn= function(e) {
    var that = this;
    getApp().validatemobile(that, that.data.login_phoneVal, function () {
      if (that.data.login_passwordVal == "") {
        getApp().msgShow(that, "请输入密码")
        return false
      }
      if (that.data.login_key == 1) {
        login(appUrl, that, pingtai,function(){
          that.onLoad();
        });
        console.log("登录成功");
      } else {
        if (that.data.login_codeVal == "") {
          getApp().msgShow(that, "请输入验证码")
          return false
        }
        if (that.data.login_key == 2) {
          regist(appUrl, that, pingtai);
          console.log("注册成功");
        } else {
          loginpwd(appUrl,that, pingtai);
          console.log("修改密码成功")
        }
      }

    })
  }
  // 获取验证码
  that.login_codeBtn=function(e){
    getApp().validatemobile(that, that.data.login_phoneVal, function () {
      sendsmscode(appUrl, that, pingtai);
    })
  }
};
module.exports = {
  init: init
};

// 登录
function login(appUrl, that, pingtai,fn){
  wx.login({
    success: function (res) {
      if (res.code) {
        //发起网络请求
        console.log(res.code)
        wx.showLoading({
          title: '加载中',
        })
        wx.request({
          url: '' + appUrl + 'login',
          data: {
            "pingtai": pingtai,
            "phone": that.data.login_phoneVal,
            "password": encryption.hexMD5(that.data.login_passwordVal).toLowerCase(),
            "code": res.code
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
              that.setData({
                login_maskShow: false,
                token: res.data.pd.apptoken
              })
              // 存数据
              getApp().globalData.apptoken = res.data.pd.apptoken;
              try {
                wx.setStorageSync('token', res.data.pd.apptoken)
              } catch (e) {
              }
              fn();
            } else {
              getApp().msgShow(that, res.data.msg);
            }
          },
          fail: function (res) { 
            
          },
          complete: function (res) {
          },
        })
      } else {
        getApp().msgShow(that, "获取用户登录态失败！");
        console.log('获取用户登录态失败！' + res.errMsg);
      }
    }
  });
  
}

// 注册
function regist(appUrl, that, pingtai) {
  if (!wx.getStorageSync("newnickname") && !wx.getStorageSync("newface")){
    getApp().msgShow(that,"注册需要微信授权");
    getApp().userInfoFn();
    return false
  }
  wx.showLoading({
    title: '加载中',
  })
  wx.request({
    url: '' + appUrl + 'regist',
    data: {
      "pingtai": pingtai,
      "phone": that.data.login_phoneVal,
      "password": encryption.hexMD5(that.data.login_passwordVal).toLowerCase(),
      "code": that.data.login_codeVal,
      "nickname": wx.getStorageSync("newnickname"),
      "face": wx.getStorageSync("newface"),
    },
    header: {
      'content-type': 'application/json'
    },
    method: "POST",
    dataType: "json",
    success: function (res) {
      wx.hideLoading();
      console.log(res.data);
      if (res.data.result=="01"){
        login(appUrl, that, pingtai, function () {
          that.onLoad();
        });
        // getApp().msgShow(that, "注册成功,请前往登录");
      }else{
        getApp().msgShow(that, res.data.msg);
      }
    },
    fail: function (res) { },
    complete: function (res) { },
  })
}

// 修改登录密码
function loginpwd(appUrl, that, pingtai){
  wx.showLoading({
    title: '加载中',
  })
  console.log(that.data.login_phoneVal)
  wx.request({
    url: '' + appUrl + 'loginpwd',
    data: {
      "pingtai": pingtai,
      "phone": that.data.login_phoneVal,
      "password": encryption.hexMD5(that.data.login_passwordVal).toLowerCase(),
      "code": that.data.login_codeVal
    },
    header: {
      'content-type': 'application/json'
    },
    method: "POST",
    dataType: "json",
    success: function (res) {
      wx.hideLoading();
      console.log(res.data);
      if (res.data.result == "01") {
        getApp().msgShow(that, "修改成功,请前往登录");
      } else {
        getApp().msgShow(that, res.data.msg);
      }
    },
    fail: function (res) { },
    complete: function (res) { },
  })
}

// 获取验证码
function sendsmscode(appUrl, that, pingtai) {
  var countdown = 60;
  wx.showLoading({
    title: '加载中',
  })
  console.log('' + appUrl + 'sendsmscode')
  wx.request({
    url: '' + appUrl + 'sendsmscode',
    method: "POST",
    header: {
      'content-type': 'application/json'
    },
    data: {
      "pingtai": pingtai,
      "phone": that.data.login_phoneVal,
    },
    success: function (res) {
      wx.hideLoading();
      console.log(res.data);
      if (res.data.result == "01") {
        that.setData({
          loginis_show: false,
        })
        getApp().settime(that, countdown);
        wx.showToast({
          title: '验证码已发送',
          icon: "success",
          duration: 2000
        })
      } else {
        getApp().msgShow(that, res.data.msg);
      }
    },
    fail: function (res) { },
    complete: function (res) { },
  })
}