module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    cssmin: {
     target: {
        files: {
          'css/jquery.mmenu.min.css': 'css/jquery.mmenu.css',
          'css/default.min.css': 'css/default.css'
        }
      }
    },
     uglify: {
        my_target: {
          files: {
            'js/menuviajson.min.js': 'js/menuviajson.js'
          }
        }
      },
    compress: {
      main: {
        options: {
          archive: 'mod_menujson.zip'
        },
        files: [
        { src: ['css/*.css']}, 
          {src: ['js/*.js']},
          {src: ['json/']},
          {src: ['tmpl/*.php']},
          {src: ['*.xml']},  
          {src: ['*.php']}
        ]
      }
    },
    concat: {
      basic: {
        src: ['css/default.min.css','css/default.min.css'],
        dest: 'css/modmenu.min.css',
      }
    }
     
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-compress');


  // Default task(s).
  grunt.registerTask('default', ['uglify', 'cssmin', 'concat','compress']);

};