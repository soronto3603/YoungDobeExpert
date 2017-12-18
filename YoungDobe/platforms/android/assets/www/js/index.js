var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
      document.getElementById('iframe').src="http://202.31.147.197:7680/ColorPicker/";
      // KakaoTalk.share({
      //   text : 'Share Message',
      //   weblink :{
      //     text : 'web사이트로 이동'
      //   },
      //   applink :{
      //     text : '앱으로 이동',
      //   },
      //   params :{
      //     paramKey1 : 'paramVal',
      //     param1 : 'param1Value',
      //     cardId : '27',
      //     keyStr : 'hey'
      //   }
      // },
      // function (success) {
      //   console.log('kakao share success');
      // },
      // function (error) {
      //   console.log('kakao share error');
      // });
      window.onmessage=function(e){

      }
    }
};

app.initialize();
