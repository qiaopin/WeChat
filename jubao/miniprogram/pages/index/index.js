var QQMapWX = require('../../libs/qqmap-wx-jssdk');
var qqmapsdk;
var app = getApp()  

Page({ 
    data:{
      latitude: '',
      longitude:'',
      //  time: (new Date()).toString()
      markers:[{
        iconPath: "./timg.png",
        id: 0,
        latitude:'39.95933,',
        longitude:'116.29845',
        width: 50,
        height: 50
      }],
      
    },
　　onLoad:function() {
      // 实例化API核心类
      qqmapsdk = new QQMapWX({
          key: 'JSVBZ-UYG3P-C3NDT-VQGO7-23DO7-4RB7R'
      })
      this.back()
      // var that = this
      // 获取本地地址
//       wx.getLocation({
//         type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
//         success: function(res){
//           console.log(res)     
//           that.setData({
//                   longitude:res.longitude,
//                   latitude:res.latitude        
//           })
//         }
// 　     })

       


    },
    back:function(){
      var that = this
       //1、获取当前位置坐标
       wx.getLocation({
        type: 'gcj02',
        success: function (res) {
          var markers= {
            iconPath: "./timg.png",
            id: 0,
            latitude:res.latitude,
            longitude:res.longitude,
            width: 50,
            height: 50
          }
          that.setData({
                  longitude:res.longitude,
                  latitude:res.latitude,   
                  markers:markers
          })
          // console.log(markers)
          that.data.markers.longitude=that.data.longitude,
          that.data.markers.latitude=that.data.latitude,
          //2、根据坐标获取当前位置名称，显示在顶部:腾讯地图逆地址解析
          qqmapsdk.reverseGeocoder({
            location: {
              latitude: res.latitude,
              longitude: res.longitude
            },
            success: function (addressRes) {
              // console.log(addressRes);
              app.globalData.address = addressRes.result.formatted_addresses.recommend;
              that.setData({
                address:addressRes.result.formatted_addresses.recommend
              }) 
            }
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

