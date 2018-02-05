var temp = {
  // 登录注册显示
  registtap: function (e) {
    var key = e.target.id;
    if (key == 1) {
      this.setData({
        loginText: "注册",
        registText: "立即登录",
        registShow: false,
        paddwordInp: false,
        key: 2,
      })
    } else {
      this.setData({
        loginText: "登录",
        registText: "立即注册",
        registShow: true,
        paddwordInp: false,
        key: 1,
      })
    }
  },
  paddwordTap: function (e) {
    var key = e.target.id;
    this.setData({
      loginText: "忘记密码",
      registText: "立即登录",
      registShow: false,
      paddwordInp: false,
      key: key
    })
  },
  loginBox: function () {
    this.setData({
      maskShow: false,
    })
  },
  maskHide: function () {
    this.setData({
      maskShow: true,
    })
  },
  // 跳转资料
  dataShow: function (e) {
    wx.navigateTo({
      url: '../center-data/center-data',
    })
  },
  // 复制
  copyBtn: function (e) {
    wx.setClipboardData({
      data: '这是要复制的文字',
      success: function (res) {
        wx.showToast({
          title: '复制成功',
          icon: "success",
          duration: 1500
        });
      }
    })
  },
  // 赋值
  phoneInp: function (e) {
    this.setData({
      phoneVal: e.detail.value
    });
  },
  passwordInp: function (e) {
    this.setData({
      passwordVal: e.detail.value
    });
  },
  codeInp: function (e) {
    this.setData({
      codeVal: e.detail.value
    });
  },
  // 登录
  loginBtn: function (e) {
    var that = this;
    getApp().validatemobile(that, that.data.item.phoneVal, function () {
      if (that.data.passwordVal == "") {
        getApp().msgShow(that, "请输入密码")
        return false
      }
      if (that.data.key == 1) {
        console.log("登录成功");
      } else {
        if (that.data.codeVal == "") {
          getApp().msgShow(that, "请输入验证码")
          return false
        }
        if (that.data.key == 2) {
          console.log("注册成功");
        } else {
          console.log("修改密码成功")
        }
      }

    })
  },
}
export default temp