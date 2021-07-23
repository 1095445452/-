//index.js
//获取应用实例
const app = getApp()
const AV = require('../../libs/av-core-min.js'); 

Page({
  data: {
  },
  toDoctor(){
    app.setUserRole('doctor');
    wx.redirectTo({
      url: '../index/lar',
    })
  },
  toPatient(){
    app.setUserRole('patient');
    wx.redirectTo({
      url: '../index/lar',
    })
  }
})
