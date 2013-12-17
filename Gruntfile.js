
module.exports = function(grunt) {
	var path = require('path');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		path: {
			js_src  : "source",
			js_dist : "js",
			
			css_src  : "source",
			css_dist : "css"
		},
		meta: {

		},
		
		// 파일,폴더 삭제
		clean: {
			install: {
				 // src: html/	  html폴더 삭제
				 // src: html/**/*  html폴더안 모든 내용이 삭제됨 (html폴더는 유지)
				src: [
					'.git/',
					'.gitignore',
					'README.md'
				],
				filter: function(filepath) {
					// filter : true(삭제)
					// return (grunt.file.isDir(filepath) && require('fs').readdirSync(filepath).length === 0);
					return true;
				}
			}
		},

		// cmd 명령어 실행
		exec: {
			bowerInstall: {
				cmd: "bower install"
			},
			
			folderInstall: { 
				cmd: "cd " + __dirname,
				callback : function(){
					var dirs, i;
			  	
					dirs = [
						'/css',
			  		
						'/js/plugin',
						'/js/vender',
			  		
						'/source',
						'/source/bootstrap/less',
						'/source/bootstrap/js',
						'/source/ui/less',
						'/source/ui/js',
			  		
						'/images/',
						'/images/common',
						'/images/layout',
						'/images/icon',
						'/images/btn',
	
						'/images/main',
						'/images/sub01',
			  		
						'/html',	       // (html 페이지 작성)
						// '/html/sub01',  // (서브페이지 폴더 세팅)
			  		
						'/html-status',    // (현황판)
			  		
						'/html-guide'      // (가이드)
					];
	
					for(i=0; i<dirs.length; i++){
						var dir = dirs[i];
						grunt.file.mkdir(path.normalize(__dirname+dir));
					}
				}
			} // end - initMakeDir
		},
		
		// 파일복사
		copy: {
			html: {
				files: [
					{expand:true, cwd:'js/vender/setting-scaffolding/', src: ['*.html'],   dest: 'html/'}
				]
			},
			bootstrap: {
				files: [
					{expand:true, cwd:'js/vender/bootstrap/less/', src: ['*.less'],   dest: '<%= path.css_src %>/bootstrap/less/'},
					{expand:true, cwd:'js/vender/bootstrap/js/',   src: ['*.js'],	 dest: '<%= path.js_src %>/bootstrap/js/'}
				]
			}
		},
		
		// jshint - 자바스크립트 코드 검사도구
		// http://blog.outsider.ne.kr/1007
		jshint: {},
		
		qunit: {},
		mocha: {},

		// 파일 합치기
		concat: {
			ui: {
				src: ['<%= path.js_src %>/ui/js/*.js'],
				dest: '<%= path.js_dist %>/ui.js'
			},
			bootstrap: {
				src: ['<%= path.js_src %>/bootstrap/js/*.js'],
				dest: '<%= path.js_dist %>/bootstrap.js'
			}
		},

		// 자바스크립트 파일 압축하기
		uglify: {
			dist: {
				files: {
					'<%= path.js_dist %>/bootstrap.min.js': ['<%= path.js_dist %>/bootstrap.js'],
					'<%= path.js_dist %>/ui.min.js'       : ['<%= path.js_dist %>/ui.js']
				}
			}
		},

		// less파일 -> css파일로변환
		less: {
			bootstrap: {
				files: {
					"<%= path.css_dist %>/bootstrap.css": "<%= path.css_src %>/bootstrap/less/bootstrap.less"
				}
			},
			ui: {
				files: {
					"<%= path.css_dist %>/ui.css": "<%= path.css_src %>/ui/less/*.less"
				}
			}
		},
		
		// .css파일 .min.css 파일로 압축하기
		cssmin : {
			minify: {
				expand: true,
				cwd: '<%= path.css_dist %>/',
				src: ['*.css', '!*.min.css'],
				dest: '<%= path.css_dist %>/',
				ext: '.min.css'
			}
		},

		// 서버 실행
		// grunt connect:server:keepalive
		// http://localhost:9000/index.html
		connect: {
            options: {
            	livereload: true,
            	hostname : 'localhost',
                port: 9002
            },
			server: {
				options: {
					base: ['.', 'html'],
					open : "http://localhost:<%= connect.options.port %>/index.html"					
				} // end - option
			} // end - server
		},

		// 실시간 검사하기
		watch: {
            livereload: {
	            options: { livereload: true },
                files: [
                    'html/**/*.html',
                    '<%= path.css_dist %>/**/*.css',
                    '<%= path.js_dist %>/**/*.js',
                    'images/{,*/}*.{gif,jpeg,jpg,png,svg,webp}'
                ]
            },
			less:{
				files: ['<%= path.css_src %>/**/*.less'],
				tasks: ['less', 'cssmin']
			},
			js:{
				files: ['<%= path.js_src %>/**/*.js'],
				tasks: ['concat', 'uglify']
			}
		}
	});

	// 작업에 필요한 모듈 로드하기
	// grunt.loadNpmTasks('grunt-ANY-PLUGIN');
	for (var key in grunt.file.readJSON("package.json").devDependencies) {
		if (key !== "grunt" && key.indexOf("grunt") === 0) grunt.loadNpmTasks(key);
	}
	
	// 작업목록
	grunt.registerTask('config',  ['clean:install', 'exec:folderInstall', 'exec:bowerInstall', 'copy']);
	grunt.registerTask('default', ['concat', 'uglify', 'less', 'cssmin', 'connect:server', 'watch']);
};


