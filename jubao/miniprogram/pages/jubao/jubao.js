// pages/form/form.js
var QQMapWX = require('../../libs/qqmap-wx-jssdk');
var qqmapsdk;
var app = getApp()  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // src:app.globalData.src,
    src:[],
    address:'',
    hidden:true,
    holder:'请对违法行为进行详细描述'
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
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
        key: 'JSVBZ-UYG3P-C3NDT-VQGO7-23DO7-4RB7R'
    })
    // console.log( app.globalData.address);
    this.setData({
      address:app.globalData.address,
      // src:getApp().globalData.src
    })
    // console.log( app.globalData.src);
    // var src=options.src 
  },

  // 弹出拍照层
  // takePhotoup(){
  //   // console.log(1)
  //   this.setData({
  //     hidden:false,
  //     holder:''
  //   })
  // },

  // 点击拍照按钮
  // takePhoto() {
  //   var that=this
  //   const ctx = wx.createCameraContext()
  //   ctx.takePhoto({
  //     quality: 'high',
  //     success: (res) => {
  //       app.globalData.src.push(res.tempImagePath)
  //       // console.log(app.globalData.src)
  //       this.setData({
  //         hidden:true,
  //         src:getApp().globalData.src,
  //         holder:'请对违法行为进行详细描述'
  //       })
  //     }
  //   })
  // },

  // 调取照片接口
  takePhotoup:function(e) {
    let that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#CED63A",
      success: function(res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage('album');
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera');
          }
        }
      }
    })
  },
 /*打开相册、相机 */
 chooseWxImage: function(type) {
  let that = this;
  wx.chooseImage({
    sizeType: ['original', 'compressed'],
    sourceType: [type],
    success: function(res) {
      console.log(res)
      if(res.tempFilePaths.length>1){
        var src=app.globalData.src.concat(res.tempFilePaths)
        that.setData({
          src:src,
        });
        app.globalData.src=app.globalData.src.concat(res.tempFilePaths)
      }else{
          app.globalData.src.push(res.tempFilePaths)
          // 选择图片后的完成确认操作
          that.setData({
            src:app.globalData.src,
          });
        }
      // console.log(that.data.src);
    }
  })
},

  // 删除对应图片
  del:function(e){
    var that=this
    var index = e.currentTarget.dataset.indexdel;  //获取自定义的内容下标值
    var src = this.data.src;                     //获取内容列表
    wx.showModal({        
      title: '是否确定删除内容？',
      success: function (res) {
        if (res.confirm) {                  //点击确定后
               src.splice(index, 1);       //截取指定的内容
               that.setData({               //重新渲染列表
                   src:src
                })
         }
       }
    })
  },

  //触发表单提交事件，调用接口
formSubmit(e) {
     //调用地址解析接口
   this.geocoder(e)
  
},

geocoder(e){
   //调用地址解析接口
   qqmapsdk.geocoder({
    //获取表单传入地址
    address: e.detail.value.geocoder, //地址参数，例：固定地址，address: '北京市海淀区彩和坊路海淀西大街74号'
    success: function(res) {//成功后的回调
      // console.log(res.result.location);
      var res = res.result;
      // var latitude = res.location.lat-0.02371;
      // var longitude = res.location.lng-0.00314;
      var latitude = res.location.lat;
      var longitude = res.location.lng;
      console.log(longitude,latitude,e.detail.value.geocoder,e.detail.value.descript)
    },
    fail: function(error) {
      wx.showModal({        
        title: '请尽量填写详细地址',
        success: function (res) {
          if (res.confirm) {                  //点击确定后
           }
         }
      })
    },
    // complete: function(res) {
    //   console.log(res);
    // }
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
    app.globalData.src=[]
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