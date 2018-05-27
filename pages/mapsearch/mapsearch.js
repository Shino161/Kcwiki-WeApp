const app = getApp();

Page({
  data: {
    animationData: {},
    pageData: [],
    areaIndex: 0,
    navTitle: []
  },
  showContent: function(event){
    this.setData({
      blockVisiable: event.target.id+''
    })
  },
  getData: function(){
    wx.request({
      url: 'https://exp.wx.kcwiki.org/query',
      data: {
        query: 'mapfast'
      },
      method: 'POST',
      header: {
        //'content-type': 'application/json', (GET模式才能用)
        "Content-Type": "application/x-www-form-urlencoded",
      },
      success: (res) => {
        if (res.data.status == "success") {
          console.log(res.data.data)
          // trans Object to Array
          var navTitle = []
          for (var i in res.data.data) {
            if (res.data.data.hasOwnProperty(i)) {
              navTitle.push(i)
            }
          }
          this.setData({
            pageData: res.data.data,
            navTitle: navTitle
          });
        }
        else if ( res.data.status == "error" ) {
          //获取接口数据出错
          console.log(res.errMsg);
          wx.showToast({
            title:'数据获取出错',
          })
        }
      },
    })
  },
  onLoad: function () {
    this.getData();
  },
})
