module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		path: {
			js_src  : "source/",
			js_dist : "js/",
			
			css_src  : "source/",
			css_dist : "css/",
		},
		meta: {

		},
		
		exec: {
			initMakeDir: {
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
		      		
						'/html',       // (html 페이지 작성)
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
		
		jshint: {},
		lint: {},
		qunit: {},

		concat: {
			ui: {
				src: ['<%= path.js_src %>ui/js/*.js'],
				dest: '<%= path.js_dist %>ui.js'
			},
			bootstrap: {
				src: ['<%= path.js_src %>bootstrap/js/*.js'],
				dest: '<%= path.js_dist %>bootstrap.js'
			}
		},

		uglify: {
			dist: {
				files: {
					'<%= path.js_dist %>bootstrap.min.js': ['<%= path.js_dist %>bootstrap.js'],
					'<%= path.js_dist %><%= pkg.name %>.min.js': ['<%= concat.ui.dest %>']
				}
			}
		},

		less: {
			bootstrap: {
				files: {
					"<%= path.css_dist %>bootstrap.css": "<%= path.css_src %>bootstrap/less/bootstrap.less"
				}
			},
			ui: {
				files: {
					"<%= path.css_dist %>ui.css": "<%= path.css_src %>ui/less/*.less"
				}
			}
		},
		
		cssmin : {
			minify: {
				expand: true,
				cwd: '<%= path.css_dist %>',
				src: ['*.css', '!*.min.css'],
				dest: '<%= path.css_dist %>',
				ext: '.min.css'
			}
		},
		
		copy: {
		  bootstrap: {
		    files: [
		      {expand:true, cwd:'js/vender/bootstrap/less/', src: ['*.less'],   dest: '<%= path.css_src %>/bootstrap/less/'},
		      {expand:true, cwd:'js/vender/bootstrap/js/',   src: ['*.js'],     dest: '<%= path.js_src %>/bootstrap/js/'}
		    ]
		  }
		},
				
		watch: {
			less:{
				files: ['<%= path.css_src %>**/*.less'],
				tasks: ['less', 'cssmin']
			},
			js:{
				files: ['<%= path.js_src %>/**/*.js'],
				tasks: ['concat', 'uglify']
			}
		}
	});

	// grunt-contrib
	grunt.loadNpmTasks('grunt-contrib-copy');
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
	grunt.registerTask('config', ['exec:initMakeDir', 'copy:bootstrap']);
	grunt.registerTask('default', ['concat', 'uglify', 'less', 'cssmin', 'watch']);
};





