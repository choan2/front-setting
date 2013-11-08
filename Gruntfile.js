module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		path: {
			js_src : "src/",
			js_dist : "js/",
			
			css_src : "src/",
			css_dist : "css/",
		},
		meta: {

		},
		
		jshint: {},
		lint: {},
		qunit: {},

		concat: {
			ui: {
				src: ['<%= path.js_src %>js/*.js'],
				dest: '<%= path.js_dist %><%= pkg.name %>.js'
			},
			bootstrapJS: {
				src: [
					'<%= path.js_src %>bootstrap/js/transition.js',
					'<%= path.js_src %>bootstrap/js/alert.js',
					'<%= path.js_src %>bootstrap/js/button.js',
					'<%= path.js_src %>bootstrap/js/carousel.js',
					'<%= path.js_src %>bootstrap/js/collapse.js',
					'<%= path.js_src %>bootstrap/js/dropdown.js',
					'<%= path.js_src %>bootstrap/js/modal.js',
					'<%= path.js_src %>bootstrap/js/tooltip.js',
					'<%= path.js_src %>bootstrap/js/popover.js',
					'<%= path.js_src %>bootstrap/js/scrollspy.js',
					'<%= path.js_src %>bootstrap/js/tab.js',
					'<%= path.js_src %>bootstrap/js/affix.js'
		        ],
				dest: '<%= path.js_dist %>bootstrap.js'
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
					"<%= path.css_dist %><%= pkg.name %>.css": "<%= path.css_src %>less/*.less"
				}
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
		  main: {
		    files: [
		      {expand:true, cwd:'js/vender/bootstrap/less/', src: ['*.less'],   dest: 'src/bootstrap/less/'},
		      {expand:true, cwd:'js/vender/bootstrap/js/',   src: ['*.js'],     dest: 'src/bootstrap/js/'}
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

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-less');

	grunt.registerTask('config', ['copy']);
	grunt.registerTask('default', ['concat', 'uglify', 'less', 'cssmin', 'watch']);
};





