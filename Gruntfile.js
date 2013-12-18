
module.exports = function(grunt) {
	var path = require('path');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		path: {
			source : "source",
			dist   : "dist"
		},
		meta: {
			
		},
		
		
		/* 파일,폴더 삭제
		 * https://github.com/gruntjs/grunt-contrib-copy
		 */
		clean: {
			build: ['<%= path.dist %>/**/*'],
			
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
			bower: { cmd: "bower install" },
			
			folder: { 
				cmd: "cd " + __dirname,
				callback : function(){
					var dirs, i;

					dirs = [
						'/dist', // (산출물)
						
						'/source/html',
						'/source/images',
			  			'/source/less',
			  			'/source/js',
			  			
						'/source/html-status',    // (현황판)
						'/source/html-guide'    // (가이드)
					];

					for(i=0; i<dirs.length; i++){
						var dir = dirs[i];
						grunt.file.mkdir(path.normalize(__dirname+dir));
					}
				}
			} // end - folderInstall
		},


		/* 파일복사
		 * https://github.com/gruntjs/grunt-contrib-copy
		 */
		copy: {
			// config 초기에 scaffolding
			scaffolding: {
				files: [
					// index.html
					{expand:true, cwd:'<%= path.source %>/js/vender/setting-scaffolding/', src: ['*.html'], dest: '<%= path.source %>/html/'},
					
					// scaffolding
					{expand:true, cwd:'<%= path.source %>/js/vender/setting-scaffolding/less/', src: ['*.less'], dest: '<%= path.source %>/less/ui'},
					{expand:true, cwd:'<%= path.source %>/js/vender/setting-scaffolding/js/',   src: ['*.js'],	 dest: '<%= path.source %>/js/ui'},
					
					// bootstrap
					{expand:true, cwd:'<%= path.source %>/js/vender/bootstrap/less/', src: ['*.less'], dest: '<%= path.source %>/less/bootstrap'},
					{expand:true, cwd:'<%= path.source %>/js/vender/bootstrap/js/',   src: ['*.js'],   dest: '<%= path.source %>/js/bootstrap'}
				]
			},
			
			build: {
				// dist 으로 source 파일 복사
				files: [
					{expand:true, cwd:'<%= path.source %>/html/',        src: ['**'], dest: '<%= path.dist %>/html/'},
					{expand:true, cwd:'<%= path.source %>/html-guide/',  src: ['**'], dest: '<%= path.dist %>/html-guide/'},
					{expand:true, cwd:'<%= path.source %>/html-status/', src: ['**'], dest: '<%= path.dist %>/html-status/'},
					{expand:true, cwd:'<%= path.source %>/images/',      src: ['**'], dest: '<%= path.dist %>/images/'}
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
			build: {
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
			build: {
				files: {
					'<%= path.dist %>/js/bootstrap.min.js': ['<%= path.dist %>/js/bootstrap.js'],
					'<%= path.dist %>/js/ui.min.js'       : ['<%= path.dist %>/js/ui.js']
				}
			}
		},


		// less파일 -> css파일로변환
		less: {
			build: {
				files: {
					'<%= path.dist %>/css/ui.css'        : ['<%= path.source %>/less/ui/*.less'],
					'<%= path.dist %>/css/bootstrap.css' : ['<%= path.source %>/less/bootstrap/bootstrap.less'] 
				}
			}
		},
		
		// .css파일 .min.css 파일로 압축하기
		cssmin : {
			build: {
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


	/* html 이미지 변경시 dist으로 수정된 파일 복사
	 * 복사되는 파일의 범위는 watch:resource 참조
	 *
	 * http://gruntjs.com/api/grunt.file
	 */ 
	grunt.event.on('watch', function(action, filepath) {
		var srcpath  = path.normalize(__dirname + "/" + filepath),
			destpath = path.normalize(__dirname + "/" + filepath.replace("source", "dist"));

		grunt.file.copy(srcpath, destpath);
	});


	/* 작업에 필요한 모듈 로드하기
	 * grunt.loadNpmTasks('grunt-ANY-PLUGIN');
	 */ 
	for (var key in grunt.file.readJSON("package.json").devDependencies) {
		if (key !== "grunt" && key.indexOf("grunt") === 0) grunt.loadNpmTasks(key);
	}

	// 작업목록
	grunt.registerTask('config',  ['clean:git', 'exec:folder', 'exec:bower', 'copy:scaffolding']);
	grunt.registerTask('build',   ['clean:build', 'concat', 'less', 'uglify', 'cssmin', 'copy:vender', 'copy:build']);
	
	grunt.registerTask('default', ['build', 'connect:server', 'watch']);
};



