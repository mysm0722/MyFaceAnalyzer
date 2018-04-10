var express = require('express');
var app = express();

// import 'axios' module
const axios = require('axios');

// API Authorization (Client ID & Secret)
var client_id = 'TjPxrzlW6S5QKX940hev';
var client_secret = 'KdSht6CYrC';
var fs = require('fs');

// 분석 대상 이미지 파라미터 
var arvgStr = process.argv[2];

// for Browser Print
var htmlStr = '<p><b><font color="orange">[ 변환 대상 이미지 ]</font></b></p>'+
              '/Users/naver/MyFaceAnalyzer/public/images/' + arvgStr + '<br><br>' +
              '<p><b><font color="blue">[ 사진 기본 정보 ]</font></b></p>';

app.get('/faceAnalyzer', function (req, res) {

  console.log('::: Image Parameter : ' + arvgStr);
  
  var request = require('request');
  // Clova Face Recognition API URL(얼굴 감지)
  var api_url = 'https://openapi.naver.com/v1/vision/face'; 

  // 입력 받은 이미지를 파라미터로 전달
  var _formData = {
    image:'image',
    image: fs.createReadStream('/Users/naver/MyFaceAnalyzer/public/images/'+arvgStr)
    // FILE 이름
  };

  // Authorization Information
  var config = {
    headers: {
      'X-Naver-Client-Id' : client_id,
      'X-Naver-Client-Secret' : client_secret
    }
  }

  // Photo Infomation Variables
  var faceCounts = 0;
  var photoSize = 0;

  request({
    method:'post',
    url:api_url, 
    formData: _formData, 
    headers:{'X-Naver-Client-Id' : client_id, 'X-Naver-Client-Secret' : client_secret},
    json: true,
  }, function (error, response, body) {  

    res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' });

    // Photo Infomation Objects
    faceCounts = body.info.faceCount;
    photoSize = body.info.size;

    // 사진 기본 정보
    htmlStr += '<b>사진 크기 : '+ body.info.size.width + 'x' + body.info.size.height + '</b><br/>';
    htmlStr += '<b>사진 포함 인원 : '+ faceCounts + '</b><br/><br/>';

    // 사진 분석 상세 정보
    htmlStr += '<p><b><font color="blue">[ 사진 분석 상세  정보 ]</font></b></p>';

    for (var i=0; i < faceCounts; i++) {
      //htmlStr += '---------------------------------<br>';
      htmlStr += '<b>[ Person #' + i + ' 정보 '+' ]</b><br/><br/>';
      htmlStr += '성별 : ' + body.faces[i].gender.value +'<br/>';
      htmlStr += '성별 신뢰도 : ' + body.faces[i].gender.confidence +'<br/><br/>';
      htmlStr += '나이 : ' + body.faces[i].age.value +'<br/>';
      htmlStr += '나이 신뢰도 : ' + body.faces[i].age.confidence +'<br/><br/>';
      htmlStr += '감정 : ' + body.faces[i].emotion.value +'<br/>';
      htmlStr += '감정 신뢰도 : ' + body.faces[i].emotion.confidence +'<br/><br/>';
      htmlStr += '얼굴 방향 : ' + body.faces[i].pose.value +'<br/>';
      htmlStr += '얼굴 방향 신뢰도 : ' + body.faces[i].pose.confidence +'<br/><br/><br/>';
    }

    // String to HTML 출력
    res.write(htmlStr);

    // Response 종료
    res.end();
  }); 

});

app.listen(3000, function () {
  console.log('::: My FaceAnalyzer app listening on port 3000!');
  app.use(express.static('public'));
});
