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
		
		clean: {
			init: {
				 // src: html/	  html폴더 삭제
				 // src: html/**/*  html폴더안 모든 내용이 삭제됨 (html폴더는 유지)
				src: [
					'<%= path.css_dist %>/**/*',
					'<%= path.js_dist %>/**/*',
					'.git/'
				],
				filter: function(filepath) {
					// filter : true(삭제)
					// return (grunt.file.isDir(filepath) && require('fs').readdirSync(filepath).length === 0);
					return true;
				}
			}
		},
		
		exec: {
			init: { 
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
			  		
						'/html',	   // (html 페이지 작성)
						'/html/main',
						'/html/sub01',
			  		
						'/html-status', // (현황판)
			  		
						'/html-guide'  // (가이드)
					];
	
					for(i=0; i<dirs.length; i++){
						var dir = dirs[i];
						grunt.file.mkdir(path.normalize(__dirname+dir));
					}
				}
			} // end - initMakeDir
		},
		
		// grunt connect:server:keepalive
		// http://localhost:9001/index.html
		connect: {
			options: {
				livereload: true
			},
			server: {
				options: {
					Default: '.', // Defaults to the project Gruntfile's directory.
					hostname: 'localhost',
					port: 9001,
					livereload: true,
					open: "/html/sample.html"
				}
			}
		},
		
		jshint: {},
		lint: {},
		qunit: {},

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

		uglify: {
			dist: {
				files: {
					'<%= path.js_dist %>/bootstrap.min.js': ['<%= path.js_dist %>/bootstrap.js'],
					'<%= path.js_dist %>/ui.min.js'       : ['<%= path.js_dist %>/ui.js']
				}
			}
		},

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
		
		cssmin : {
			minify: {
				expand: true,
				cwd: '<%= path.css_dist %>/',
				src: ['*.css', '!*.min.css'],
				dest: '<%= path.css_dist %>/',
				ext: '.min.css'
			}
		},
		
		copy: {
		  bootstrap: {
			files: [
			  {expand:true, cwd:'js/vender/bootstrap/less/', src: ['*.less'],   dest: '<%= path.css_src %>/bootstrap/less/'},
			  {expand:true, cwd:'js/vender/bootstrap/js/',   src: ['*.js'],	 dest: '<%= path.js_src %>/bootstrap/js/'}
			]
		  }
		},
				
		watch: {
            livereload: {
                // options: { livereload: '<%= connect.options.livereload %>' },
                files: [
                    'html/**/*.html',
                    '<%= path.css_src %>/**/*.less',
                    '<%= path.js_src %>/**/*.js',
                    '/images/{,*/}*.{gif,jpeg,jpg,png,svg,webp}'
                ],
                tasks: ['connect:server:keepalive']
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

	// grunt-contrib
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-connect');
	
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-less');

	// grunt-other
	grunt.loadNpmTasks('grunt-exec');
	
	// Task
	// Task - 'clean:init', 
	
	grunt.registerTask('config',  ['exec:init', 'copy:bootstrap']);
	grunt.registerTask('default', ['concat', 'uglify', 'less', 'cssmin', 'connect:server:keepalive', 'watch']);
};




