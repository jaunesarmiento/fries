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
        files: [
          {
            expand: true,
            cwd: 'lib/sass/',
            src: ['**/*.scss'],
            dest: 'dist/css/',
            ext: '.css',
            filter: function (filepath) {
              // Don't include variables and utilities
              var filename = filepath.slice((filepath.lastIndexOf('/') + 1), filepath.length);
              if (filename == '_variables.scss' || filename == '_utilities.scss') return false;
              return true;
            }
          }
        ]
      }
    },
    cssmin: {
      options: {
        banner: '/* <%= pkg.name %>.min.css (v<%= pkg.version %>) <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      combine: {
        files: [
          { src: ['dist/css/holo-dark/*.css'], dest: 'dist/themes/holo-dark/holo-dark.min.css' },
          { src: ['dist/css/holo-light/*.css'], dest: 'dist/themes/holo-light/holo-light.min.css' }
          /* Add your other themes here */
        ]
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
    },
    copy: {
      fonts: {
        files: [
          {
            expand: true,
            cwd: 'lib/',
            src: ['fonts/*'],
            dest: 'dist/',
            filter: 'isFile'
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'sass', 'cssmin', 'copy']);

  grunt.registerTask('dist-js', ['jshint', 'concat', 'uglify']);

  grunt.registerTask('dist-css', ['sass', 'cssmin', 'copy']);

};