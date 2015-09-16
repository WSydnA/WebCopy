module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    filename: '<%= pkg.name %>.<%= pkg.version %>',

    banner: '/*! <%= filename %>.js | <%= pkg.url %> | <%= pkg.license %>\n' +
            '*   <%= pkg.author %> | <%= pkg.contact %>\n' +
            '*   Built on <%= grunt.template.today("dd-mm-yyyy") %> */\n',

    s: 'src/',

    concat: {
      options: {
        banner: '<%= banner %>' +
                '\n;(function() {\n\n"use strict";\n\n',
        footer: '\n})();\n'
      },
      dist: {
        src: ['<%=s%>_mustard-cut.js', "<%=s%>lib/*.js", '<%= s %>_jsdoc.js', '<%=s%>main.js', '<%=s%>_footer.js'],
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

    /* TODO Configure Jasmine
    jasmine: {

    }, */

    jshint: {
      files: ['gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        browser: true,
        globals: {
          predef: ['jQuery']
        }
      }
    },

    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'concat', 'uglify'] // TODO add Jasmine
    }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  //grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('test', ['jshint']); // TODO add Jasmine
  grunt.registerTask('default', ['jshint', 'concat', 'uglify']); // TODO add Jasmine

};