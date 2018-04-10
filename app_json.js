var express = require('express');
var app = express();

// API Authorization (Client ID & Secret)
var client_id = 'Bx3k9QA02ShYeDVyLQpf';
var client_secret = 'DvfCZekAZs';
var fs = require('fs');

// 분석 대상 이미지 파라미터 
var arvgStr = process.argv[2];

app.get('/faceAnalyzer', function (req, res) {

  console.log('::: Image : ' + arvgStr);
  
   var request = require('request');
   //var api_url = 'https://openapi.naver.com/v1/vision/celebrity'; // 유명인 인식
   var api_url = 'https://openapi.naver.com/v1/vision/face'; // 얼굴 감지

   var _formData = {
     image:'image',
     image: fs.createReadStream('/Users/naver/MyFaceAnalyzer/public/images/'+arvgStr)
     // FILE 이름
   };
    var _req = request.post({url:api_url, formData:_formData,
      headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}}).on('response', function(response) {
       console.log(response.data); // 200
       //console.log(response.headers['content-type'])
       //console.log(response);
      console.log('::: 성별 :::');
      // console.log(response.faces[0].gender.value);
      // console.log(response.faces[0].gender.confidence);
      // console.log('::: 감정 :::');
      // console.log(response.faces[0].emotion.value);
      // console.log(response.faces[0].emotion.confidence);
      // console.log('::: 얼굴방향 :::');
      // console.log(response.faces[0].pose.value);
      // console.log(response.faces[0].pose.confidence);

    });

    //console.log(_req);
    //console.log( request.head  );
    //console.log(_req);
    //console.log(res.info.faceCount);

    

    //res.write('<h1>Hello HTML~~</h1>');
   
    

    _req.pipe(res); // 브라우저로 출력

    //res.end();
 });

 app.listen(3000, function () {
   console.log('::: My FaceAnalyzer app listening on port 3000!');
   app.use(express.static('public'));
 });
