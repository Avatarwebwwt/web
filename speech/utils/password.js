// 支付弹框
function passwordMask() {
  var that = this;

  that.setData({
    isFocus: true,//控制input 聚焦
    wallets_password_flag: false//密码输入遮罩
  })

  that.set_wallets_password=function(e) {//获取钱包密码
    this.setData({
      wallets_password: e.detail.value
    });
    if (this.data.wallets_password.length == 6) {//密码长度6位时，自动验证钱包支付结果
      this.wallet_pay(this);
    }
  };
  that.set_Focus=function() {//聚焦input
    console.log('isFocus', this.data.isFocus)
    this.setData({
      isFocus: true
    })
  };
  that.set_notFocus=function() {//失去焦点
    this.setData({
      isFocus: false
    })
  },
  that.close_wallets_password=function() {//关闭钱包输入密码遮罩
    this.setData({
      isFocus: false,//失去焦点
      wallets_password_flag: false,
    })
  }
};
module.exports = {
  init: passwordMask
};


