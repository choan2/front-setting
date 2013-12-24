var _options = {
	encoding : 'utf8',
	lang : "html", // html, asp, jsp, php 중 선택
	langInclude : {
		php : '<? include $_SERVER["DOCUMENT_ROOT"]."url.html"; ?>',
		asp : '<!-- #include virtual="url.html" -->',
		jsp : '<%@ include file="url.html" %>'
	},
	path : {
		source : "source",
		dist   : "dist"
	},
	dir : {
		"html"        : "html",
		"html-status" : "html-status",
		"html-guide"  : "html-guide",
		
		"include"    : "html/include",
		"images"      : "images",
		"less"        : "less",
		"js"          : "js"
	}
}

module.exports = function(grunt) {
	var path = require('path');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		path: _options.path,

		/* 파일,폴더 삭제
		 * https://github.com/gruntjs/grunt-contrib-copy
		 */
		clean: {
			dist: ['<%= path.dist %>/**/*'],
			
			git: {
				 // src: html/       html폴더 삭제
				 // src: html/**/*   html폴더안 모든 내용이 삭제됨 (html폴더는 유지)
				 
				src: ['.git/', '.gitignore', 'README.md'],
				filter: function(filepath) {
					// filter : true(삭제)
					// 빈폴더삭제 : return (grunt.file.isDir(filepath) && require('fs').readdirSync(filepath).length === 0);
					return true;
				}
			}
		},


		/* cmd 명령어 실행
		 * https://github.com/jharding/grunt-exec
		 */
		exec: {
			installBower: { cmd: "bower install" },
			
			createFolder: { 
				cmd: "cd " + __dirname,
				callback : function(){
					var dirs, i;

					dirs = _options.dir;

					// create dist Folder
					grunt.file.mkdir(path.normalize(__dirname + "/" + _options.path.dist));
					
					// create source Folder
					for(name in dirs){
						var dir = dirs[name];
						grunt.file.mkdir(path.normalize(__dirname + "/" + _options.path.source + "/" + dir));
					}
				}
			} // end - createFolder
		},


        /* 이미지복사 (컬리티 조정 옵션 포함)
         * https://github.com/gruntjs/grunt-contrib-imagemin#pngquant
         */
		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= path.source %>/images',
					src: '{,*/}*.{gif,jpeg,jpg,png}',
					dest: '<%= path.dist %>/images'
				}]
			}
        },


		/* 파일복사
		 * https://github.com/gruntjs/grunt-contrib-copy
		 */
		copy: {
			// config 초기에 scaffolding
			scaffolding: {
				files: [
					// index.html
					{expand:true, cwd:'<%= path.source %>/js/vender/front-setting-scaffolding/html/', src: ['**/*.*'], dest: '<%= path.source %>/'+_options.dir.html},
					
					// include
					{expand:true, cwd:'<%= path.source %>/js/vender/front-setting-scaffolding/include/', src: ['**/*.*'], dest: '<%= path.source %>/'+_options.dir.include},
					
					// scaffolding
					{expand:true, cwd:'<%= path.source %>/js/vender/front-setting-scaffolding/less/', src: ['**/*.*'], dest: '<%= path.source %>/' + _options.dir.less + '/ui'},
					{expand:true, cwd:'<%= path.source %>/js/vender/front-setting-scaffolding/js/',   src: ['**/*.*'],	  dest: '<%= path.source %>/' + _options.dir.js + '/ui'},
					
					// bootstrap
					{expand:true, cwd:'<%= path.source %>/js/vender/bootstrap/less/', src: ['*.less'], dest: '<%= path.source %>/less/bootstrap'},
					{expand:true, cwd:'<%= path.source %>/js/vender/bootstrap/js/',   src: ['*.js'],   dest: '<%= path.source %>/js/bootstrap'}
				]
			},
			
			vender: {
				expand: true,
				cwd: '<%= path.source %>/js/vender',
				src: [
					"html5shiv/dist/html5shiv.js",
					"modernizr/modernizr.js",
					
					"jquery/jquery.min.js",
					"jquery-migrate/jquery-migrate.min.js",
					
					"requirejs/require.js",
					"backbone/backbone-min.js",
					"underscore/underscore-min.js",
					"marionette/lib/backbone.marionette.js"
				],
				dest: '<%= path.dist %>/js/vender',
				flatten: true,
				filter: 'isFile'
			}
		},


		/* jshint - 자바스크립트 코드 검사도구
		 * http://blog.outsider.ne.kr/1007
		 */
		jshint: {},

		
		/*
		 * 파일 단위테스트
		 */
		qunit: {},
		mocha: {},


		/* 파일 합치기
		 * https://github.com/gruntjs/grunt-contrib-concat
		 */
		concat: {
			dist: {
				files: {
					'<%= path.dist %>/js/ui.js'        : ['<%= path.source %>/js/ui/*.js'],
					'<%= path.dist %>/js/bootstrap.js' : ['<%= path.source %>/js/bootstrap/*.js'] 
				}
			}
		},


		/* 자바스크립트 파일 압축하기
		 * https://github.com/gruntjs/grunt-contrib-uglify 
		 */ 
		uglify: {
			dist: {
				files: {
					'<%= path.dist %>/js/bootstrap.min.js': ['<%= path.dist %>/js/bootstrap.js'],
					'<%= path.dist %>/js/ui.min.js'       : ['<%= path.dist %>/js/ui.js']
				}
			}
		},


		// less파일 -> css파일로변환
		less: {
			dist: {
				files: {
					'<%= path.dist %>/css/ui.css'        : ['<%= path.source %>/less/ui/ui.less'],
					'<%= path.dist %>/css/bootstrap.css' : ['<%= path.source %>/less/bootstrap/bootstrap.less'] 
				}
			}
		},
		
		// .css파일 .min.css 파일로 압축하기
		cssmin: {
			dist: {
				expand: true,
				cwd: '<%= path.dist %>/css',
				src: ['*.css', '!*.min.css'],
				dest: '<%= path.dist %>/css',
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
					base: [
						'<%= path.dist %>/html/',
						'<%= path.dist %>'
					],
					open : "http://localhost:<%= connect.options.port %>/index.html"					
				} // end - option
			} // end - server
		},


		// 실시간 검사하기
		watch: {
            livereload: {
	            options: { livereload: true },
                files: [
					'<%= path.dist %>/html/**/*.*',
					'<%= path.dist %>/css/**/*.css',
					'<%= path.dist %>/js/**/*.js',
					'<%= path.dist %>/images/{,*/}*.{gif,jpeg,jpg,png,svg,webp}'
                ]
            },
            
            resource: {
                files: [
                	'<%= path.source %>/html/**/*.*',
                	'<%= path.source %>/images/{,*/}*.{gif,jpeg,jpg,png,svg,webp}'
                ]
            },

			vender:{
				files: ['<%= path.source %>/vender/**/*.js'],
				tasks: ['copy:vender']
			},
            
			less:{
				files: ['<%= path.source %>/**/*.less'],
				tasks: ['less', 'cssmin']
			},
			js:{
				files: ['<%= path.source %>/**/*.js'],
				tasks: ['concat', 'uglify']
			}
		}
	});


	/*
	 * html 생성 (include 처리)
	 */
	grunt.task.registerTask("copyHtml", includeAll)
	

	/* html 이미지 변경시 dist으로 수정된 파일 복사
	 * 복사되는 파일의 범위는 watch:resource 참조
	 *
	 * http://gruntjs.com/api/grunt.file
	 */ 
	grunt.event.on('watch', function(action, filepath) {
		var isIncludeFile = filepath.indexOf(path.normalize("/" + _options.dir.include + "/")) !== -1,
			isHTML        = filepath.indexOf("."  + _options.dir.html) !== -1,
			isImage       = filepath.indexOf(path.normalize("/" + _options.dir.images  + "/")) !== -1;

		console.log( '-----========-----', isIncludeFile, isHTML, isImage );

		if( isIncludeFile ){
			console.log( '----- includeAll -----' );
			includeAll();
			
		}else if( isHTML ){
			var srcAbsPath  = path.normalize(__dirname + "/" + filepath),
				destAbsPath = path.normalize(__dirname + "/" + filepath.replace(_options.path.source, _options.path.dist));
			
			include(srcAbsPath, destAbsPath);
			
		}else if( isImage ){
			grunt.file.copy(srcpath, destpath);
		}
	});
	

	// root밑에 모든파일 inlcude 처리해서 dist에 생성
	function includeAll(){
		var rootdir = path.normalize(__dirname + "/" + _options.path.source + "/" + _options.dir.html);
		
		grunt.file.recurse(rootdir, function(abspath, rootdir, subdir, filename){
			include(abspath, abspath.replace(_options.path.source, _options.path.dist));
		});		
	}


	// 1개 파일 inlcude 처리해서 dist에 생성
	function include(srcAbsPath, destAbsPath){
		var doc = grunt.file.read(srcAbsPath, {encoding : _options.encoding}),
			reg = new RegExp(/(?:<!--<%=include:)([^%]*)(?:%>-->)/),
			lang = _options.lang,
			langInclude = _options.langInclude[lang],
			
			filePath = "",    // source\html\index.html
			includeFileContents = ""; // 인클루드로 들어올 파일 내용

		/* __dirname : D:\Workspace\test1
		 *  filepath : source\html\index.html
		 */ 
		 
		while( reg.test(doc) ){
			filePath = RegExp.$1;

			if( !! langInclude ){
				// asp, jsp, php
				filePath = filePath.replace('.html', '.'+lang);
				doc = doc.replace(reg, langInclude.replace("url.html", filePath));
				
			}else{
				// html
				includeFileContents = grunt.file.read(__dirname + '/' + _options.path.source + '/' + _options.dir.html + '/' + filePath, {encoding : _options.encoding});	
				doc = doc.replace(reg, includeFileContents);
			}
		}
		destAbsPath = destAbsPath.replace('.html', '.'+lang);
		grunt.file.write(destAbsPath, doc, {encoding : _options.encoding});
	}


	/* 작업에 필요한 모듈 로드하기
	 * grunt.loadNpmTasks('grunt-ANY-PLUGIN');
	 */ 
	for (var key in grunt.file.readJSON("package.json").devDependencies) {
		if (key !== "grunt" && key.indexOf("grunt") === 0) grunt.loadNpmTasks(key);
	}


	// 작업목록
	grunt.registerTask('config',  ['clean:git', 'exec:createFolder', 'exec:installBower', 'copy:scaffolding']);
	
	grunt.registerTask('compile', ['concat:dist', 'less:dist', 'uglify:dist', 'cssmin:dist']);
	
	grunt.registerTask('dist',    ['clean:dist', 'compile', 'copy:vender', 'imagemin:dist', 'copyHtml']);
	grunt.registerTask('server',  ['connect:server', 'watch']);

	grunt.registerTask('default', ['dist', 'connect:server', 'watch']);
	
	grunt.registerTask('test', []);
};






