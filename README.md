# 웹퍼블리싱 작업환경 설정

웹퍼블리싱(html, css, js, less) 를 위한 환경설정을 위해서 작성된 페이지 입니다.
적용시 폴더 구조는 아래와 같이 생성 됩니다.

```
publishing/
├── js/
│   ├── app.js
│   ├── app.min.js
│   ├── bootstrap.js
│   ├── bootstrap.min.js
│   ├── plugin/
│   └── vender/ (bower에 의해서 설치되는 파일(수정x))
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
└── status/ (현황판)
```

## 요구사항
* node.js설치
* bower 설치
* grunt 설치

## 적용하기
1. git clone git@github.com:ace4gi/setting.git 실행
2. bower install 실행
3. npm install 실행
4. grunt 실행



