module.exports = function(grunt) {

    grunt.initConfig({

        // Import package manifest
        pkg: grunt.file.readJSON("flagstrap.jquery.json"),

        // Banner definitions
        meta: {
            banner: "/*\n" +
            " *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
            " *  <%= pkg.description %>\n" +
            " *  <%= pkg.homepage %>\n" +
            " *\n" +
            " *  Made by <%= pkg.author.name %>\n" +
            " *  Under <%= pkg.licenses[0].type %> License\n" +
            " */\n"
        },

        // Concat definitions
        concat: {
            dist: {
                src: ["src/jquery.flagstrap.js"],
                dest: "dist/js/jquery.flagstrap.js"
            },
            options: {
                banner: "<%= meta.banner %>"
            }
        },

        // Lint definitions
        jshint: {
            files: ["src/jquery.flagstrap.js"],
            path: "src/jquery.flagstrap.js",
            options: {
                jshintrc: ".jshintrc",
                reporterOutput: ""
            }
        },

        // Minify definitions
        uglify: {
            my_target: {
                src: ["dist/js/jquery.flagstrap.js"],
                dest: "dist/js/jquery.flagstrap.min.js"
            },
            options: {
                banner: "<%= meta.banner %>"
            }
        },

        // watch for changes to source
        // Better than calling grunt a million times
        // (call 'grunt watch')
        watch: {
            files: ['src/*'],
            tasks: ['default']
        }

    });

    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-watch");

    grunt.registerTask("default", ["jshint", "concat", "uglify"]);

};
