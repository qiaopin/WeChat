// pages/form/form.js
var app = getApp()  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // src:app.globalData.src,
    src:[]
  },

  

  error(e) {
    console.log(e.detail)
  },
  // tapCarm:function(){
  //   wx.createCameraContext()
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    this.setData({
      src:getApp().globalData.src
    })
    // var src=options.src 
  },

  
  takePhotoup(){
    wx.navigateTo({
      url: '../camera/camera',
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
    console.log(getApp().globalData.src)
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