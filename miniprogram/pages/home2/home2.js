// pages/home2/home2.js
const app = getApp()
var wxCharts = require("../../utils/wxcharts.js");//相对路径
var yuelineChart=null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageWidth:0,
    showModal: false,
    textV:'',
    readdatas:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that= this;
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
    const db = wx.cloud.database({
      env: 'cloud1-2g2jbgeta99c24cc'
    })
    db.collection('sugar').get({
      success: res => {
        console.log(res.data.length)
        for (let i=res.data.length-1,j=0; i >= 0;i--,j++) {
          console.log(res.data[j])
          var readdata = this.data.readdatas
          readdata[i] = res.data[i].v
          that.setData({
            readdatas:readdata
          })
        }
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
    // 图表模块开始
    var windowWidth = 320;
    try {
     var res = wx.getSystemInfoSync();
     windowWidth = res.windowWidth;
    } catch (e) {
     console.error('getSystemInfoSync failed!');
    }
    yuelineChart = new wxCharts({ //当月用电折线图配置
     canvasId: 'yueEle',
     type: 'line',
     categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'], //categories X轴
     animation: true,
     series: [{
      name: '血糖值',
      data:this.data.readdatas,
      format: function (val, name) {
       return val + '';
      }
      }, //{
    //   name: 'B',
    //   data: [0, 6, 2, 2, 7, 6, 2, 5, 8, 1, 8, 4, 0, 9, 7, 2, 5, 2, 8, 2, 5, 2, 9, 4, 4, 9, 8, 5, 5, 5, 6],
    //   format: function (val, name) {
    //    return val + '';
    //   }
    //  },
     ],
     xAxis: {
      disableGrid: true
     },
     yAxis: {
      title: '血糖单位 mmol/L',
      format: function (val) {
       return val;
      },
      /*max: 20,*/
      min: 0
     },
     width: windowWidth,
     height: 200,
     dataLabel: false,
     dataPointShape: true,
     extra: {
      lineStyle: 'curve'
     }
    });
    // 图表模块结束
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

  },
  eject:function(){
    this.setData({
      showModal:true
    })
  },

  /**
   * 点击返回按钮隐藏
   */
  back:function(){
    this.setData({
      showModal:false
    })
  },

  /**
   * 获取input输入值
   */
  wish_put:function(e){
    var that= this;
    this.setData({
      textV:e.detail.value
    })
  },

  /**
   * 点击确定按钮获取input值并且关闭弹窗
   */
  ok:function(){
    console.log(this.data.textV)
    this.setData({
      showModal:false
    })
  },

  submit: function (e) {
    if (this.data.textV) {  //talk不为空的时候
      const db = wx.cloud.database()
      db.collection('sugar').add({
        data: {
          name:this.data.user,
          v:this.data.textV
        },
        success: res => {
          // 在返回结果中会包含新创建的记录的 _id
          this.setData({
            'inputValue': ''
          })
          wx.showToast({
            title: '成功',
          })	//成功将评论数据写入小程序云开发数据库
          var that = this
          // db.collection('A').get({
          //   success: res => {
          //     console.log(res.data.length)
          //     for (let i = res.data.length - 1, j = 0; i >= 0; i-- , j++) {
          //       console.log(res.data[j])
          //       var talks = "talks[" + j + "]";
          //       that.setData({
          //         [talks]: res.data[i],
          //       })		//将评论区刷新，显示最新的留言
          //     }
          //   }
          // })
          db.collection('sugar').get({
            success: res => {
              console.log(res.data.length)
              for (let i=res.data.length-1,j=0; i >= 0;i--,j++) {
                console.log(res.data[j])
                var readdata = this.data.readdatas
                readdata[i] = res.data[i].v
                that.setData({
                  readdatas:readdata
                })
              }
              }
          })
          this.onShow()//刷新
        },
        fail: err => { //未成功写入数据库
          wx.showToast({
            icon: 'none',
            title: '请检查网络'
          })
          console.error('[数据库] [新增记录] 失败：', err)
        }
      })
    }
    else {// talk为0，输入框未输入数据
      wx.showModal({
        title: '提示',
        content: '评论不能为空',
        showCancel: false,
        confirmText: '我知道了',
      })
    }
    this.setData({
      showModal:false
    })
  },
})