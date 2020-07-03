var app = getApp()  

Page({ 
    data:{
       latitude:'',
       longitude:'',
      //  time: (new Date()).toString()
     
    },
　　onLoad:function() {
      var that = this
      // 获取本地地址
      wx.getLocation({
        type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
        success: function(res){
          console.log(res)     
          that.setData({
                  longitude:res.longitude,
                  latitude:res.latitude        
          })
        }
　     })
    },
    tap:function(){
      // tap跳转页面
      wx.navigateTo({
        url: '../form/form',
        // url: '../camera/camera',
     })
      // wx.showToast({
      //   title:'已完成点击',
      //   icon:'success',
      //   duration:1500
      // })

      // wx.request({
      //   url: 'http://110.249.159.46:8087/zygd2/rurallandEditController/findRurallandEdit',//不能用ip地址和localhost
      //   method: 'POST',
      //   header: { 'content-type': 'application/json'},
      //   data:JSON.stringify(this.data.dat),
      //   success: function(res) {
      //     console.log(res)// 服务器回包信息
      //   }
      // })
    },
})