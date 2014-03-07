## grunt-css-sprite

### About

This tool helps front-end developers to combine images, used in CSS file, into single sprite.
It is inspired by `grunt-sprite`, without its limitations.
The following features are supported:

1. Binary packing algorithm is used for arrangement of images in a sprite
2. The original CSS code is processed with adding `background-position` rule
3. High resolution sprites are generated for HD devices. The corresponding media queries are added to the CSS file
4. A timestamp is added to the sprite URL referenced from the CSS file.
5. A timestamp is appended at the end of the CSS file.

  
### Configuration instructions

    // Automatic sprite generation
    sprite: {
        options: {
            // source images path. Default: `images/slice`
            imagepath: 'test/slice/',
            // sprite image output directory. Note taht the file will be overwritten! Default: `images/`
            spritedest: 'test/publish/images/',
            // Background image path as it will be replaced in the resulting CSS. Default: ../images/
            spritepath: '../images/',
            // Padding between the images in the sprite, in pixels. Default: 0
            padding: 2,
            // whether to generate new sprite file with timestamp in its file name. Default is false, that means that the old file will be cleaned
            newsprite: false,
            // Append timestamp to sprite URL, referenced from the CSS. Default: false
            spritestamp: true,
            // Append a timestamp in the end of the CSS file. Default: false
            cssstamp: true,
            // Alignment algorithm. Default: 'binary-tree'
            algorithm: 'binary-tree',
            // Image processing engine. Default: `pngsmith`
            engine: 'pngsmith'
        },
        autoSprite: {
            files: [{
                //Enable dynamic expansion
                expand: true,
                // CSS source folder
                cwd: 'test/css/',
                // file mask for CSS sources
                src: '*.css',
                //the path where new CSS file and the sprite will be exported
                dest: 'test/publish/css/',
                // new CSS file extension
                ext: '.sprite.css'
            }]
        }
    }

* **files**

    使用标准的动态文件对象
    
* **options**

    * `imagepath` 
        必选项，sprite背景图源文件夹，只有匹配此路径才会处理，默认 images/slice/
        
    * `spritedest` 
        必选项，雪碧图输出目录，注意，会覆盖之前文件！默认 images/
        
    * `spritepath` 
        必选项，替换后的背景路径，默认 ../images/

    * `padding` 
        可选项，指定各图片间间距，默认 0

    * `newsprite` 
        可选项，是否以时间戳为文件名生成新的雪碧图文件，如果启用请注意清理之前生成的文件，默认不生成新文件

    * `spritestamp` 
        可选项，是否给雪碧图追加时间戳，默认不追加

    * `cssstamp` 
        可选项，是否在CSS文件末尾追加时间戳，默认不追加
        
    * `engine` 
        可选项，指定图像处理引擎，默认选择`pngsmith`

    * `algorithm` 
        可选项，指定排列方式，有`top-down` （从上至下）, `left-right`（从左至右）, `diagonal`（从左上至右下）, `alt-diagonal` （从左下至右上）和 `binary-tree`（二叉树排列） 五种供选择，默认binary-tree

### 载入插件

请不要忘了载入插件

    grunt.loadNpmTasks('grunt-css-sprite');    
    
### 打个比方

有一个类似这样的目录结构：
        
        ├── test/                
            ├── css/    
                └── icon.css        
            ├── images/    
                ├── slice/    
                    ├── icon-a.png
                    ├── icon-a@2x.png        
                    ├── icon-b.png
                    └── icon-b@2x.png
            └── publish/
                ├── css/
                    └── icon.sprite.css
                └── images/    
                    ├── icon.png
                    └── icon@2x.png
        
`css/icon.css` 调用`images/slice/`目录下的切片，`grunt-css-sprite` 会将 `css/icon.css` 进行处理。

`publish/css/` 目录下是处理完成的样式 `icon.sprite.css` ，而 `publish/images/` 目录下是合并完成的雪碧图。

### 特别注意

1. 生成后的雪碧图将以源css文件名来命名
2. 仅当CSS中定义`url(xxxx)`的路径匹配参数`imagepath`才进行处理，和具体`background`，`background-image`CSS无关，这里有区别于`grunt-sprite`
3. 理论上高清切片都应该是源切片尺寸的2倍，所以所有高清切片的尺寸宽和高都必须是偶数
4. 理论上所有的切片都应该是`.png`格式，`png8` `png24` 和 `png32`不限

### 可选依赖

`grunt-css-sprite` 使用 [spritesmith](https://github.com/Ensighten/spritesmith) 作为内部核心实现

经 [Mark](https://github.com/jsmarkus) 提醒，之前对于`gm` 的依赖纯属多余；如果你需要将图片处理引擎切换为`gm`或者其他引擎，请手动安装对应的依赖包。
举例 [Graphics Magick(gm)](http://www.graphicsmagick.org/) 依赖的安装流程：
    
* **Graphics Magick(gm)**

    * Mac
        // 安装GM图形库    
        ```
        brew install GraphicsMagick    
        npm install gmsmith
        ```

    * Windows
        前往官方网站[下载安装GM图形库](http://www.graphicsmagick.org/download.html)    
        然后命令行执行：
        ```
        npm install gmsmith
        ```

### 版本记录

`0.0.1` 从 `grunt-sprite` 迁移改进

`0.0.2` 完善部分处理流程，优化图片重复，规避 `a[href*='}{']::after{ content:'}{';}` 这类奇葩CSS

`0.0.5` 修改 `spritesmith` 依赖为 `0.18.0`，实现`padding`参数；优化Retina处理流程，拼合选择器，减小CSS文件体积 `.a,.b,.c{ background-image:url(icon.png); background-size:95px auto;}`

`0.0.6` 修正生成Retina CSS部分一个严重的逻辑错误，去除重复选择器生成；完善测试用例；添加`grunt jshint`任务

`0.0.7` 修正`backgroun[-image]`之后缺少分号时造成新生成的CSS出错，修改默认处理引擎为`pngsmith`，取消对`gm`的依赖

### 致谢

感谢 [spritesmith](https://github.com/Ensighten/spritesmith)

感谢 [Meters](https://github.com/hellometers)

感谢 [Mark](https://github.com/jsmarkus) 修正 [#1](https://github.com/laoshu133/grunt-css-sprite/pull/1)，提出 [#2](https://github.com/laoshu133/grunt-css-sprite/pull/2) 
