# 웹퍼블리싱 작업환경 설정

xxxxxxxxxxx.col.kr

## 폴더구조
```
┌── dist/      (산출물폴더 : 자동생성)
│
├── source/    (작업폴더)
│   ├── js/
│   │   ├── ui
│   │   │    ├── test1.js
│   │   │    └── test2.js
│   │   │
│   │   ├── bootstrap
│   │   │    ├── test1.js
│   │   │    ├── test1.js
│   │   │    └── test2.js
│   │   │
│   │   └── vender/ (bower에 의해서 설치되는 파일(직접수정x))
│   │        ├── affix.js
│   │        ├── alert.js
│   │        ├── button.js
│   │        ├── collapse.js
│   │        ├── :
│   │        └── :
│   │
│   ├── less/
│   │   ├── ui
│   │   │    ├── test1.less
│   │   │    └── test2.less
│   │   │
│   │   └── bootstrap
│   │        ├── test1.less
│   │        ├── test1.less
│   │        └── test2.less
│   │
│   ├── images/
│   │
│   ├── html/ (html 페이지 작성)
│   │   └── index.html
│   │
│   ├── html-status/ (현황판)
│   │
│   └── html-guide/ (가이드)
│
└ node_modules (grunt로 자동화 하기 위해서 필요한 node 패키지들)
```

## 요구사항 설치
1. 버전관리 : [git설치](http://msysgit.github.io/)
2. [node.js](http://nodejs.org/)  : [http://nodejs.org/](http://nodejs.org/) 설치파일 다운후 설치
3. [bower](http://bower.io/)    : `윈도우키` ＞ `실행` ＞ `cmd` ＞ `npm install bower -g` 
4. [grunt](http://gruntjs.com/)    : `윈도우키` ＞ `실행` ＞ `cmd` ＞ `npm install grunt-cli -g`
5. front-setting    : `윈도우키` ＞ `실행` ＞ `cmd` ＞ `npm install front-setting -g`


## 적용하기

c:\project\test 이라는 프로젝트를 시작할 경우로 설명

1. `윈도우키` ＞ `실행` ＞ `cmd` ＞ 프로젝트 폴더로 이동 `cd c:\project\test`
3. `cd test` ＞ `npm install front-setting`
4. `grunt config` 코딩환경 구축
5. `grunt` (종료시 ctrl+C) 코딩 서버 실행



