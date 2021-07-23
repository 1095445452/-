//app.js
// app.js
const AV = require('./libs/av-core-min');
const adapters = require('./libs/leancloud-adapters-weapp.js');

AV.setAdapters(adapters);
AV.init({
  appId: 'QN3WQqQHADYAVlkG76uorlAO-gzGzoHsz',
  appKey: 'qUzRczkwIODYfTykJvAiB3sL',
  // 请将 xxx.example.com 替换为你的应用绑定的自定义 API 域名
  serverURLs: "https://qn3wqqqh.lc-cn-n1-shared.com",
});
let userMsg = {
  name: '',
  role: ''
}
App({
  onLaunch: function () {
      // 展示本地存储能力
      const logs = wx.getStorageSync('logs') || []
      logs.unshift(Date.now())
      wx.setStorageSync('logs', logs)
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }
    wx.login({
      success: res => {
        this.globalData.userInfo = res.userInfo
       // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
       // 所以此处加入 callback 以防止这种情况
        if (this.userInfoReadyCallback) {
          this.userInfoReadyCallback(res)
        }
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    let menuButtonObject = wx.getMenuButtonBoundingClientRect();
    wx.getSystemInfo({
      success: res => {
        let statusBarHeight = res.statusBarHeight,
          navTop = menuButtonObject.top,//胶囊按钮与顶部的距离
          navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight)*2;//导航高度
        this.globalData.navHeight = navHeight;
        this.globalData.navTop = navTop;
        this.globalData.windowHeight = res.windowHeight;
      },
      fail(err) {
        console.log(err);
      }
    })
    // this.globalData = {}
  },
  getUserRole(){
    return userMsg.role;
  },

  getUserName(){
    return userMsg.name;
  },

  setUserRole(obj){
    userMsg.role = obj;
  },

  setUserName(obj){
    userMsg.name = obj;
  },

 //底部导航版本1  
  editTabBar: function() {
  //使用getCurrentPages可以获取当前加载中所有的页面对象的一个数组，数组最后一个就是当前页面。
    var curPageArr = getCurrentPages(); //获取加载的页面
    var curPage = curPageArr[curPageArr.length - 1]; //获取当前页面的对象
    var pagePath = curPage.route; //当前页面url
    if (pagePath.indexOf('/') != 0) {
      pagePath = '/' + pagePath;
    }

    var tabBar = this.globalData.tabBar;
    for (var i = 0; i < tabBar.list.length; i++) {
      tabBar.list[i].active = false;
      if (tabBar.list[i].pagePath == pagePath) {
        tabBar.list[i].active = true; //根据页面地址设置当前页面状态    
      }
    }
    curPage.setData({
      tabBar: tabBar
    });
  },
//底部导航版本2
  editTabBar1: function() {
    var curPageArr = getCurrentPages();
    var curPage = curPageArr[curPageArr.length - 1];
    var pagePath = curPage.route;
    if (pagePath.indexOf('/') != 0) {
      pagePath = '/' + pagePath;
    }
    var tabBar = this.globalData.tabBar1;
    for (var i = 0; i < tabBar.list.length; i++) {
      tabBar.list[i].active = false;
      if (tabBar.list[i].pagePath == pagePath) {
        tabBar.list[i].active = true;
      }
    }
    curPage.setData({
      tabBar: tabBar
   });
  },

  globalData: {
  //版本1底部导航栏显示
  tabBar: {
    "color": "#9E9E9E",
    "list": [
      {   
        "pagePath": "/pages/home/home",
        "text": "首页",
        "iconPath": "/images/icon_API_HL.png",
        "selectedIconPath": "/images/icon_API_HL.png",
        "clas": "tab-item",
        "selectedColor": "#66cc66",
        active: true
      },
      {
        "pagePath": "/pages/message/message",
        "text": "消息",
        "iconPath": "/images/icon_component_HL.png",
        "selectedIconPath": "/images/icon_component_HL.png",
        "selectedColor": "#66cc66",
        "clas": "tab-item",
        active: false
      },
      {
        "pagePath": "/pages/mine/mine",
        "text": "我的",
        "iconPath": "/images/icon_API_HL.png",
        "selectedIconPath": "/images/icon_API_HL.png",
        "selectedColor": "#66cc66",
        "clas": "tab-item",
        active: false
      }
    ],
    "position": "bottom"
  },
  //版本2底部导航栏显示
  tabBar1: {
    "color": "#9E9E9E",
    "list": [   
      {
        "selectedIconPath": "/images/icon_API_HL.png",
        "iconPath": "/images/icon_API_HL.png",
        "pagePath": "/pages/home2/home2",
        "text": "首页",
        "clas": "tab-item",
        "selectedColor": "#66cc66",
        active: true
      },
      {
        "selectedIconPath": "/images/icon_component_HL.png",
        "iconPath": "/images/icon_component_HL.png",
        "pagePath": "/pages/message/message",
        "text": "消息",
        "selectedColor": "#66cc66",
        "clas": "tab-item",
        active: false
      },
      {
        "selectedIconPath": "/images/icon_component_HL.png",
        "iconPath": "/images/icon_component_HL.png",
        "pagePath": "/pages/manage/manage",
        "text": "管理",
        "selectedColor": "#66cc66",
        "clas": "tab-item",
        active: false
      },
      {
        "selectedIconPath": "/images/icon_API_HL.png",
        "iconPath": "/images/icon_API_HL.png",
        "pagePath": "/pages/mine2/mine2",
        "text": "我的",
        "selectedColor": "#66cc66",
        "clas": "tab-item",
        active: false
      }
    ],
    "position": "bottom"
  }
}
})
