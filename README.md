#### 安装教程

1.  安装环境

    可以参照 https://reactnative.cn/docs/next/environment-setup 进行搭建环境

2.  打开package.json所在目录，执行npm install或者yarn install

3.  运行

    1）、连接模拟器
    首先打开模拟器，我用的mumu，打开后运行cmd，执行连接命令——adb connect 127.0.0.1:7555，不同的模拟器只是端口号不同，具体端口可百度。
    接着在项目代码的package.json里运行“scripts”的“android”，等待运行完就可以在模拟器上看到。

    2）、连接真机
    首先用数据线连接手机，然后打开手机的开发者模式，
    我的手机是VIVO，打开设置-更多设置-关于手机，在软件版本号一栏点击7次就打开了，回到更多设置，底部就有开发者选项，进入打开USE调试
    然后在项目代码的package.json里运行“scripts”的“start”，紧接着在编译器(webStorm)下面的Terminal一栏输入 react-native run-android 命令。
    最后就会如同在模拟器上一样调试。    

4.  打包
​    
    进入andriod目录，在该目录下打开git，执行 ./gradlew assembleRelease 命令，等待命令执行完后进入 /android/app/build/outputs/apk/release，即可看见apk包。

5.  修改app名称

    到android/app/src/main/res/values/strings.xml目录下，找到app_name，修改string标签里的值为——你想替换的名

6.  修改图标

    到android/app/src/main/res目录下，除了最后一个values文件外的4个就是对应不同尺寸型号的机型的图标，图标分为48x48,72x72,96x96,144x144。适配安卓不同机型，替换你想要换的图标即可。
