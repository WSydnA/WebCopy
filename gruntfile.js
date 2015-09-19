module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    filename: '<%= pkg.name %>.<%= pkg.version %>',

    timestamp: new Date().toUTCString(),

    banner: '/*! <%= filename %>.js | <%= pkg.url %> | <%= pkg.license %>\n' +
            '*   <%= pkg.author %> | <%= pkg.contact %>\n' +
            '*   Built on <%= timestamp %> */\n',

    s: 'src/',
    t: 'test/',

    concat: {
      options: {
        banner: '<%= banner %>' +
                '\n;(function() {\n\n"use strict";\n\n',
        footer: '\n})();\n'
      },
      dist: {
        src: ['<%=s%>lib/cuts-the-mustard.js', '<%=s%>_mustard-cut.js', '<%=s%>lib/defaults.js', '<%=s%>lib/*.js',
              '<%= s %>_jsdoc.js', '<%=s%>main.js', '<%=s%>_footer.js'],
        dest: 'dist/<%= filename %>.js'
      }
    },

    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        files: {
          'dist/<%= filename %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },

    jasmine: {
      coverage: {
        src: ['<%=s%>lib/*.js', '<%=s%>main.js'],
        options: {
          specs: '<%=t%>/*.js',
          template: require('grunt-template-jasmine-istanbul'),
          templateOptions: {
            coverage: 'coverage/coverage.json',
            report: 'coverage/report',
            thresholds: {
              lines: 40, // 75
              statements: 40, // 75
              branches: 35, // 75
              functions: 50 // 75
            }
          }
        }
      }
    },

    jshint: {
      files: ['gruntfile.js', '<%=s%>**/*.js', '<%=t%>**/*.js'],
      options: {
        browser: true,
        globals: {
          predef: ['jQuery']
        }
      }
    },

    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'jasmine']
    }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('test', ['jshint', 'jasmine']);
  grunt.registerTask('build', ['jshint', 'jasmine', 'concat', 'uglify']);

};