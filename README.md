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
│        ├── html5shiv/
│        ├── modernizr/
│        ├── requirejs/
│        ├── jquery/
│        ├── jquery-migrate/
│        ├── jquery.ui/
│        ├── bootstrap/
│        ├── underscore/
│        ├── backbone/
│        ├── marionette/
│        ├── :
│        └── :
│
├── css/
│   ├── ui.css
│   ├── ui.min.css
│   ├── bootstrap.css
│   └── bootstrap.min.css
│
├── src/ (src/파일은 Gruntfile.js 설정에 따라 publishing/js,css로 컴파일 됩니다.)
│   ├── bootstrap/
│   │    ├── less/
│   │    └── js/
│   └── ui/
│        ├── less/
│        └── js/
│
├── images/
│   ├── common/
│   ├── layout/
│   ├── icon/
│   └── btn/
│
├── html/ (html 페이지 작성)
│   ├── index.html
│   └── sub01/
│
├── html-status/ (현황판)
│
└── html-guide/ (가이드)
```

## 요구사항 설치
1. 버전관리 : [git설치](http://msysgit.github.io/)
	git ---s s=s=s=s= 

2. [node.js](http://nodejs.org/)  : [http://nodejs.org/](http://nodejs.org/) 설치파일 다운후 설치
3. [bower](http://bower.io/)    : `윈도우키` ＞ `실행` ＞ `cmd` ＞ `npm install -g bower` 
4. [grunt](http://gruntjs.com/)    : `윈도우키` ＞ `실행` ＞ `cmd` ＞ `npm install -g grunt-cli`


## 적용하기

c:\project\test 이라는 프로젝트를 시작할 경우로 설명

1. `윈도우키` ＞ `실행` ＞ `cmd` ＞ `cd c:\project` 
2. `git clone https://github.com/ace4gi/setting.git test`
3. `프로젝트 폴더로 이동` ＞ `npm install`
4. `grunt config`
5. `grunt`



