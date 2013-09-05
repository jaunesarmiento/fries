module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['lib/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/* <%= pkg.name %>.min.js (v<%= pkg.version %>) <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    sass: {
      dist: {
        files: {
          'dist/<%= pkg.name %>.css': ['lib/**/*.scss'],
          'lib/css/holo-dark/base.css': [
            'lib/sass/holo-dark/_variables.scss',
            'lib/sass/holo-dark/_utilities.scss',
            'lib/sass/holo-dark/base.scss'
          ],
          'lib/css/holo-dark/action-bars.css': 'lib/sass/holo-dark/action-bars.scss',
          'lib/css/holo-dark/buttons.css': 'lib/sass/holo-dark/buttons.scss',
          'lib/css/holo-dark/content.css': 'lib/sass/holo-dark/content.scss',
          'lib/css/holo-dark/forms.css': 'lib/sass/holo-dark/forms.scss',
          'lib/css/holo-dark/icomoon.css': 'lib/sass/holo-dark/icomoon.scss',
          'lib/css/holo-dark/lists.css': 'lib/sass/holo-dark/lists.scss',
          'lib/css/holo-dark/sliders.css': 'lib/sass/holo-dark/sliders.scss',
          'lib/css/holo-dark/spinners.css': 'lib/sass/holo-dark/spinners.scss',
          'lib/css/holo-dark/stack.css': 'lib/sass/holo-dark/stack.scss',
          'lib/css/holo-dark/tabs.css': 'lib/sass/holo-dark/tabs.scss',
          'lib/css/holo-dark/dialogs.css': 'lib/sass/holo-dark/dialogs.scss',
          'lib/css/holo-dark/toasts.css': 'lib/sass/holo-dark/toasts.scss'
        }
      }
    },
    cssmin: {
      options: {
        banner: '/* <%= pkg.name %>.min.css (v<%= pkg.version %>) <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      minify: {
        expand: true,
        cwd: 'dist/',
        src: ['*.css', '!*.min.css'],
        dest: 'dist/',
        ext: '.min.css'
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'lib/**/*.js'],
      options: {
        globals: {
          jQuery: false,
          console: true,
          module: true,
          document: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'sass', 'cssmin']);

};