"use strict";

module.exports = function (grunt) {

  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    less: {
      style: {
        files: {
          "build/css/style.css": "less/style.less"
        }
      }
    },

    postcss: {
      style: {
        options: {
          processors: [require("autoprefixer")({browsers: ["last 2 versions"]})]
        },
        src: "build/css/*.css"
      }
    },

    browserSync: {
      server: {
        bsFiles: {
          src: ["build/*.html", "build/css/*.css"]
        },
        options: {
          server: "build",
          watchTask: true,
          notify: false,
          open: true,
          cors: true,
          ui: false
        }
      }
    },

    watch: {
      html: {
        files: ["*.html"],
        tasks: ["copy:html"] },

      style: {
        files: ["less/**/*.less"],
        tasks: ["less", "postcss", "csso"]
      }
    },

    csso: {
      style: {
        options: {
          report: "gzip"
        },
        files: {
          "build/css/style.min.css": ["build/css/style.css"]
        }
      }
    },

    imagemin: {
      images: {
        options: {
          opitimizationLabel: 3
        },
        files: [
          {
            expand: true,
            src: ["build/img/**/*{png,jpg,gif}"]
          }
        ]
      }
    },

    svgmin: {
      symbols: {
        files: [
          {
            expand: true,
            src: ["build/img/icons/*.svg"]
          }
        ]
      }
    },

    svgstore: {
      options: {
        svg: {
          style: "display: none"
        }
      },
      symbols: {
        files: {
          "build/img/symbols.svg": ["img/icons/*.svg"]
        }
      }
    },

    copy: {
      build: {
        files: [
          {
            expand: true,
            src: [
              "fonts/**/*.{woff, woff2}", "img/**", "js/**", "*.html"
            ],
            dest: "build"
          }
        ]
      }
    },

    html: {
      files: [{
        expand: true,
        src: ["*.html"],
        dest: "build"
      }] },


    clean: {
      build: ["build"]
    }
  });

  grunt.registerTask("serve", ["browserSync", "watch"]);
  grunt.registerTask("symbols", ["svgmin", "svgstore"]);
  grunt.registerTask("build", [
    "clean",
    "copy",
    "less",
    "postcss",
    "csso",
    "symbols",
    "imagemin"
  ]);
};
