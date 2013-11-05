# 웹퍼블리싱 작업환경 설정

웹퍼블리싱(html, css, js, less) 를 위한 환경설정을 위해서 작성된 페이지 입니다.

/publishing/src/ 밑으로 작성된 bootstrap(js, less), less, js 는 Gruntfile.js에 의해서

/publishing/js/,
 
/publishing/css/ 으로 자동으로 변환되어 css,js 형태로 삽입됩니다.


## 폴더구조
```
publishing/
├── js/
│   ├── ui.js
│   ├── ui.min.js
│   ├── bootstrap.js
│   ├── bootstrap.min.js
│   ├── plugin/
│   └── vender/ (bower에 의해서 설치되는 파일(수정x : 수정시 publishing/js/ 밑으로 이동))
│        ├── modernizr/
│        ├── requirejs/
│        ├── jquery/
│        ├── jquery.ui/
│        ├── bootstrap/
│        ├── underscore/
│        ├── backbone/
│        └── marionette/
│
├── css/
│   ├── app.css
│   ├── app.min.css
│   ├── bootstrap.css
│   └── bootstrap.min.css
│
├── src/ (src/파일은 Gruntfile.js 설정에 따라 publishing/js,css로 컴파일 됩니다.)
│   ├── bootstrap/
│   │    ├── less/
│   │    └── js/
│   ├── less/
│   └── js/
│
├── images/
│
├── html/ (html 페이지 작성)
│
├── status/ (현황판)
│
└── guide/ (가이드)
```

## 요구사항
1. node.js설치 : http://nodejs.org/
2. bower 설치  : cmd 창에서 설치 npm install -g bower 
3. grunt 설치  : cmd 창에서 설치 npm install -g grunt-cli

## 적용하기
1. git clone git@github.com:ace4gi/setting.git 실행
2. bower install 실행
3. npm install 실행
4. grunt 실행



