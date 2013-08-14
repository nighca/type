module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: '\n\n',
                banner: '/*! ' + 
                    '<%= pkg.name %> ' + 
                    'v<%= pkg.version %> ' + 
                    '[<%= pkg.author.email %>] ' + 
                    '[<%= grunt.template.today("dd-mm-yyyy") %>] ' + 
                    '*/\n'
            },
            dist: {
                src: [
                    'src/intro.js',

                    'src/type.js',
                    'src/judge.js',
                    'src/define.js',
                    'src/default-types.js',
                    
                    'src/outro.js'
                ],
                dest: 'tmp/<%= pkg.name %>.js'
            }
        },
        copy: {
            main: {
                files: [
                    {
                        src: ['tmp/<%= pkg.name %>.js'], 
                        dest: 'dist/<%= pkg.name %>-<%= pkg.version %>.js'
                    }
                ]
            }
        },
        uglify: {
            options: {
                banner: '/*! ' + 
                    '<%= pkg.name %> ' + 
                    'v<%= pkg.version %> ' + 
                    '[<%= pkg.author.email %>] ' + 
                    '[<%= grunt.template.today("dd-mm-yyyy") %>] ' + 
                    '*/\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>-<%= pkg.version %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        cafemocha: {
            tests: {
                    src: 'test/*_test.js',
                    options: {
                            ui: 'bdd',
                            require: [
                                    'should'
                            ],
                    },
            }
        },
        clean: {
            tests: ['tmp']
        },
    });

    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-cafe-mocha');

    grunt.registerTask('test', ['concat', 'cafemocha']);

    grunt.registerTask('default', ['test', 'copy', 'uglify', 'clean']);

};