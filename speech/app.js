//app.js
App({
  onLaunch: function () {
   
  },
  globalData: {
    userInfo: null,
    apptoken:null,
    appUrl:"https://www.shidiankan.com/speech/appuser/",
    appImg: "https://www.shidiankan.com/speech/appdownload/download/",
    appVideo:"http://www.shidiankan.com:9999/",
    pingtai:"2",
    userId:null,
  },
  // 验证码倒计时
  settime: function (that, countdown) {
    if (countdown == 0) {
      that.setData({
        loginis_show: true,
      })
      countdown = 60;
      return;
    } else {
      countdown--;
      that.setData({
        loginis_show: false,
        numbers: countdown
      })
      
    }
    setTimeout(function () {
      getApp().settime(that, countdown)
    }, 1000)
  },
  // 获取用户信息
  userInfoFn: function (){
    wx.authorize({
      scope: 'scope.userInfo',
      success() {
        // 用户已经同意小程序
        wx.getUserInfo({
          success: res => {
            console.log(res);
            try {
              wx.setStorageSync('newnickname', res.userInfo.nickName)
            } catch (e) {
            }
            try {
              wx.setStorageSync('newface', res.userInfo.avatarUrl)
            } catch (e) {
            }
            // var newface,newnickname;
            // var isedit = false;
            // if (!returnInfo.face){
            //    isedit = true;
            //    newface = res.userInfo.avatarUrl;
            // }
            // if (!returnInfo.nickname){
            //    isedit = true;
            //    newnickname = res.userInfo.nickName;
            // }
            // if (isedit){
            //   wx.request({
            //     url: "https://www.shidiankan.com/speech/appuser/modifyData",
            //     data: {
            //       "pingtai": "2",
            //       "apptoken": wx.getStorageSync("token"),
            //       "nickname": newnickname,
            //       "face": newface
            //     },
            //     header: {
            //       'content-type': 'application/json'
            //     },
            //     method: "POST",
            //     dataType: "json",
            //     success: function (res) {
            //       console.log(res.data);
            //       if (res.data.result == "01") {
            //         that.onLoad();
            //       } else {
            //         getApp().msgShow(that, res.data.msg);
            //       }
            //     }
            //   })
            // }
          }
        })
      },
      fail: function (res) {
        console.log("用户信息获取失败");
        wx.showModal({
          title: '提示',
          content: '若不微信授权,将无法注册账号,点击取消可重新获取授权',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定');
            } else if (res.cancel) {
              console.log('用户点击取消');
              wx.openSetting({
                success: function (res) {
                  if (!res.authSetting["scope.userInfo"]) {
                    //这里是授权成功之后 填写你重新获取数据的js
                    getApp().userInfoFn();
                  }
                }
              })
            }
          }
        })
      },
    })
  },
  // 修改资料
  modify: function (url, that, pingtai, faceImg){
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: url,
      data: {
        "pingtai": pingtai,
        "apptoken": wx.getStorageSync("token"),
        "nickname": that.data.name,
        "position": that.data.position,
        "face": faceImg,
        "sign": that.data.sign,
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
          wx.showToast({
            title: '修改成功',
            icon: "sueccess",
            duration: 1500
          })
          setTimeout(function () {
            var pages = getCurrentPages();
            var prevPage = pages[pages.length - 2];  //上一个页面
            prevPage.setData({
              Refresh: true
            })
            wx.navigateBack({
              delta: 1,
            })
          }, 1500)
        } else {
          getApp().msgShow(that, res.data.msg);
        }
      },
      fail: function (res) { },
      complete: function (res) {
      },
    })
  },
  // 别人的信息
  otherinfo: function (url, pingtai, userid, that, appImg){
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url:url,
      data: {
        "pingtai": pingtai,
        "userid": userid
      },
      header: {
        'content-type': 'application/json'
      },
      method: "POST",
      dataType: "json",
      success: function (res) {
        console.log(res.data);
        wx.hideLoading();
        if (res.data.result == "01"){
          res.data.pd.face = appImg + res.data.pd.face;
          res.data.pd.codeurl = appImg + res.data.pd.codeurl;
          res.data.pd.vcode = appImg + res.data.pd.vcode;
          that.setData({
            nickname: res.data.pd.nickname,
            face: res.data.pd.face,
            phone: res.data.pd.phone,
            code: res.data.pd.code,
            codeurl: res.data.pd.codeurl,
            vcode: res.data.pd.vcode,
            sign: res.data.pd.sign,
            position: res.data.pd.position,
            vip: res.data.pd.vip,
            rank: res.data.pd.rank,
            member: res.data.pd.member,
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
  // 会员列表
  memberlist: function (url, pingtai, currentPage, pid, that, appImg){
    console.log(currentPage);
    console.log(pid)
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: url,
      data: {
        "pingtai": pingtai,
        "apptoken": wx.getStorageSync("token"),
        "currentPage": currentPage,
        "pid": pid,
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
          var length = res.data.list.length;
          that.setData({
            length: length
          })
          if (currentPage=="1"){
            for (var i = 0; i < length; i++) {
              res.data.list[i].face = appImg + res.data.list[i].face
            }
            that.setData({
              memberlist: res.data.list,
            })
          }else{
            if (length == "0") {
              return
            }
            var Member = res.data.list;
            var arr = that.data.memberlist;
            for (var i = 0; i < length; i++) {
              Member[i].face = appImg + Member[i].face;
              arr.push(Member[i]);
            }
            that.setData({
              memberlist: arr,
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
  },
  // 首页
  indexHtml: function (appUrl, that, pingtai, appImg) {
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: '' + appUrl + 'firstpage',
      data: {
        "pingtai": pingtai,
        "apptoken": wx.getStorageSync("token"),
      },
      header: {
        'content-type': 'application/json'
      },
      method: "POST",
      dataType: "json",
      success: function (res) {
        console.log(res.data);
        wx.hideLoading();
        if (res.data.result=="01"){
          for (var i = 0; i < res.data.bannerlist.length; i++) {
            res.data.bannerlist[i].url = appImg + res.data.bannerlist[i].url;
          }
          // for (var i = 0; i < res.data.mycourselist.length; i++) {
          //   res.data.mycourselist[i].face = appImg + res.data.mycourselist[i].face;
          // }
          for (var i = 0; i < res.data.jpcourselist.length; i++) {
            res.data.jpcourselist[i].face = appImg + res.data.jpcourselist[i].face;
          }
          that.setData({
            imgUrls: res.data.bannerlist,
            // mycourselist: res.data.mycourselist,
            jpcourselist: res.data.jpcourselist,
            // myLength: res.data.mycourselist.length
          })
        }else{
          getApp().msgShow(that, res.data.msg);
        }
        
      },
      fail: function (res) { },
      complete: function (res) {
      },
    })
  },
  // 个人资料
  userData: function (url, that, pingtai, appImg){
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: url,
      data: {
        "pingtai": pingtai,
        "apptoken": wx.getStorageSync("token"),
      },
      header: {
        'content-type': 'application/json'
      },
      method: "POST",
      dataType: "json",
      success: function (res) {
        console.log(res.data);
        wx.hideLoading();
        if (res.data.result=="01" ){
          var returnInfo = res.data.pd;
          getApp().globalData.userId = returnInfo.userid;
          var sign = returnInfo.sign;
          if (!sign){
            sign="";
          }
          var face = returnInfo.face;
          if (!face) {
            face = "";
          }else{
            face =appImg+returnInfo.face;
          }
          that.setData({
            name: returnInfo.nickname,
            face:face,
            code: returnInfo.code,
            rqImg: appImg + returnInfo.codeurl,
            position: returnInfo.position,
            member: returnInfo.member,
            allcount: returnInfo.allcount,
            todaycount: returnInfo.todaycount,
            vip: returnInfo.vip,
            viptm: returnInfo.viptm,
            phone: returnInfo.phone,
            sign: returnInfo.sign,
            isNumber:50-sign.length,
            userid: res.data.pd.userid,
            rankone: res.data.pd.rankone,
            ranktwo: res.data.pd.ranktwo,
          })
          // 获取用户信息
          // getApp().userInfoFn(returnInfo,that);
        }else{
          getApp().msgShow(that, res.data.msg);
          if (res.data.result == "09"){
            that.setData({
              login_maskShow: true
            })
          }
        }
      },
      fail: function (res) { },
      complete: function (res) {
      },
    })
  },
  // 钱包
  myaccount: function (url, that, pingtai){
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: url,
      data: {
        "pingtai": pingtai,
        "apptoken": wx.getStorageSync("token"),
      },
      header: {
        'content-type': 'application/json'
      },
      method: "POST",
      dataType: "json",
      success: function (res) {
        console.log(res.data);
        wx.hideLoading();
        var returnInfo = res.data.pd;
        that.setData({
          account: returnInfo.account,
          phone: returnInfo.phone,
          paypwd: returnInfo.paypwd,
        })
      },
      fail: function (res) { },
      complete: function (res) {
      },
    })
  },
  // 银行卡列表
  bankcardlist: function (url, pingtai,that,appImg) {
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: url,
      data: {
        "pingtai": pingtai,
        "apptoken": wx.getStorageSync("token"),
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
          for(var i=0;i<res.data.list.length;i++){
            res.data.list[i].logo =appImg+res.data.list[i].logo;
          }
          that.setData({
            list: res.data.list,
          })
          if (res.data.list.length > 0) {
            if (that.data.isOid){
              that.setData({
                length: 2
              })
            }else{
              that.setData({
                length: 1
              })
            }
            for (var i = 0; i < res.data.list.length; i++) {
              if (res.data.list[i].status == 1) {
                that.setData({
                  isId: res.data.list[i].id,
                })
              }
            }
            console.log(that.data.length)
            console.log(that.data.isId)
            console.log(that.data.isOid)
          } else {
            that.setData({
              length:0
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
  },
  // 验证手机号码
  validatemobile: function (that, mobile, fn) {
    console.log(mobile)
    if (mobile.length == 0) {
      getApp().msgShow(that, "请输入手机号！");
      return false;
    }
    if (mobile.length != 11) {
      getApp().msgShow(that, "手机号长度有误！");
      return false;
    }
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(mobile)) {
      getApp().msgShow(that, "手机号有误！");
      return false;
    }
    fn();
  },
  // 我的课程列表
  mycourselist: function (url, that, pingtai, currentPage, pageSize, appImg){
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: url,
      data: {
        "pingtai": pingtai,
        "apptoken": wx.getStorageSync("token"),
        "currentPage": currentPage,
        "pageSize": pageSize,
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
          var length = res.data.list.length;
          that.setData({
            length:length,
          })
          if (currentPage == "1") {
            for (var i = 0; i < length; i++) {
              res.data.list[i].face = appImg + res.data.list[i].face
            }
            that.setData({
              list: res.data.list
            })
          } else {
            if (length == "0") {
              return
            }
            var Member = res.data.list;
            var arr = that.data.list;
            for (var i = 0; i < length; i++) {
              Member[i].face = appImg + Member[i].face;
              arr.push(Member[i]);
            }
            that.setData({
              list: arr,
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
  },
  // 精品课程
  boutiqueFun: function (url, pingtai, currentPage, pageSize, that, appImg, types){
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: url,
      data: {
        "pingtai": pingtai,
        "currentPage": currentPage,
        "pageSize": pageSize,
        "type": types
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
          var length = res.data.list.length;
          that.setData({
            length: length
          })
          if (currentPage == "1") {
            for (var i = 0; i < length; i++) {
              res.data.list[i].face = appImg + res.data.list[i].face;
              // var arrListFace  = [];
              // wx.getImageInfo({
              //   src: appImg + res.data.list[i].face,
              //   success: function (res) {
              //     console.log(res.path);
              //     arrListFace = res.path;
              //     // res.data.list[i].face = appImg + res.data.list[i].face;
              //   }
              // })
            }
            that.setData({
              list: res.data.list
            })
          } else {
            if (length == "0") {
              return
            }
            var Member = res.data.list;
            var arr = that.data.list;
            for (var i = 0; i < length; i++) {
              Member[i].face = appImg + Member[i].face;
              arr.push(Member[i]);
            }
            that.setData({
              list: arr,
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
  },
  // 播放数据上次
  upplaydata: function (url, id, that, pingtai) {
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: url,
      data: {
        "pingtai": pingtai,
        "id": id,
        "apptoken": wx.getStorageSync("token")
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
    
        } else {
          // getApp().msgShow(that, res.data.msg);
        }
      },
      fail: function (res) { },
      complete: function (res) {
      },
    })
  },
  // 课程播放
  courseplay: function (url, pingtai, id, that, appImg, appVideo){
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: url,
      data: {
        "pingtai": pingtai,
        "id": id,
        "apptoken": wx.getStorageSync("token")
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
          res.data.pd.uface = appImg + res.data.pd.uface;
          if (res.data.pd.classlist.length>0){
            for (var i = 0; i < res.data.pd.classlist.length; i++) {
              res.data.pd.classlist[i].url = appVideo + res.data.pd.classlist[i].url;
            }
          }
          that.setData({
            title: res.data.pd.title,
            uface: res.data.pd.uface,
            face: res.data.pd.face,
            introduce: res.data.pd.introduce,
            money: res.data.pd.money,
            remark: res.data.pd.remark,
            position: res.data.pd.position,
            sign: res.data.pd.sign,
            nickname: res.data.pd.nickname,
            classcount: res.data.pd.classcount,
            buycount: res.data.pd.buycount,
            vip: res.data.pd.vip,
            kcId: res.data.pd.id,
            classlist: res.data.pd.classlist,
            uid: res.data.pd.uid,
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
  // 发表评论
  commentFun: function (url, pingtai,id,that){
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: url,
      data: {
        "pingtai": pingtai,
        "sid": id,
        "apptoken": wx.getStorageSync("token"),
        "content": that.data.PublisVal
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
            commentShow: false
          })
          that.onLoad();
        } else {
          getApp().msgShow(that, res.data.msg);
          that.setData({
            login_maskShow: true,
          })
        }
      },
      fail: function (res) { },
      complete: function (res) {
      },
    })
  },
  // 评论页
  commentPage: function (url, pingtai, id, currentPage, that, appImg){
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: url,
      data: {
        "pingtai": pingtai,
        "id": id,
        "currentPage": currentPage,
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
          var length = res.data.list.length;
          that.setData({
            length: length
          })
          if (currentPage == "1") {
            for (var i = 0; i < length; i++) {
              res.data.list[i].face = appImg + res.data.list[i].face;
            }
            that.setData({
              list: res.data.list
            })
          } else {
            if (length == "0") {
              return
            }
            var Member = res.data.list;
            var arr = that.data.list;
            for (var i = 0; i < length; i++) {
              Member[i].face = appImg + Member[i].face;
              arr.push(Member[i]);
            }
            that.setData({
              list: arr,
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
  },

  // 弹窗提示
  msgShow:function(that,text){
    that.setData({
      msgShow: false,
      resultMsg: text
    })
    clearTimeout(timer);
    var timer = setTimeout(function () {
      that.setData({
        msgShow: true
      })
    }, 2000);
  },
  // 获取网络状态
  network:function(){
    wx.getNetworkType({
      success: function (res) {
        if (res.networkType == "none") {
          wx.showToast({
            title: '网络连接不可用',
            icon: "success",
            duration: 4000
          })
          return false
        }
      }
    })
  },
})
