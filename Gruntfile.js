/*
 * grunt-css-sprite
 * https://github.com/laoshu133
 *
 * Licensed under the MIT license.
 */

module.exports = function(grunt){
	grunt.initConfig({
		//Auto sprite
		sprite: {
			options: {
				// sprite背景图源文件夹，只有匹配此路径才会处理，默认 images/slice/
				imagepath: 'test/slice/',
				// 雪碧图输出目录，注意，会覆盖之前文件！默认 images/
				spritedest: 'test/publish/images/',
				// 替换后的背景路径，默认 ../images/
				spritepath: '../images/',
				// 各图片间间距，如果设置为奇数，会强制+1以保证生成的2x图片为偶数宽高，默认 0
				padding: 2,
				// 是否以时间戳为文件名生成新的雪碧图文件，如果启用请注意清理之前生成的文件，默认不生成新文件
				newsprite: false,
				// 给雪碧图追加时间戳，默认不追加
				spritestamp: true,
				// 在CSS文件末尾追加时间戳，默认不追加
				cssstamp: true,
				// 默认使用二叉树最优排列算法
				algorithm: 'binary-tree',
				// 默认使用`pngsmith`图像处理引擎
				engine: 'pngsmith'
			},
			autoSprite: {
				files: [{
					//启用动态扩展
					expand: true,
					// css文件源的文件夹
					cwd: 'test/css/',
					// 匹配规则
					src: '*.css',
					//导出css和sprite的路径地址
					dest: 'test/publish/css/',
					// 导出的css名
					ext: '.sprite.css'
				}]
			}
		},
		jshint: {
			all: [ 'Gruntfile.js', 'tasks/*.js' ]
		}
	});

	// 载入任务
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadTasks('tasks');

	// 声明别名
	grunt.registerTask('default', ['sprite']);
	grunt.registerTask('test', ['sprite']);
};