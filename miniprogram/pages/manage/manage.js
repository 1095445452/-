// pages/manage/manage.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:'',
    selected: 0,
    list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const username = app.getUserName()
    this.setData({
      user: username,
    })
    const role = app.getUserRole()
    if(role == 'doctor') {
      app.editTabBar(); 
    } else {
      app.editTabBar1(); 
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },

  // switchTab(e) {
  //   const data = e.currentTarget.dataset
  //   const url = "../../" + data.path
  //   wx.switchTab({ url })
  //   this.setData({
  //     selected: data.index
  //    })
  // },
})