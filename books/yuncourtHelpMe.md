
# 从网上下载的builder-alinw是存在问题的,需要手动替换sea.js文件
```
        '!'+sourcePath+"/assets/**/*.js",
        '!'+sourcePath+"/hephaistos/**/*.js",
        // sourcePath + "/**/*.jsx", 把这个暂时限制掉
```

# mock也无法登入
```
需要修改
D:\alibaba-web\20170518_859341_offlinepay_1\commonservice\src\main\resources\META-INF\autoconf下的component-lava.xml.vm文件,在54行加一句
<value><![CDATA[^/login/mock.json[p]?$]]></value>
```


持久使用淘宝npm镜像
npm config set registry https://registry.npm.taobao.org

通过cnpm使用
npm install -g cnpm --registry=https://registry.npm.taobao.org

华理学生平台 账号：26182994

重装系统之后，

JAVA jdk 1.8.152
环境变量路径要设置
系统变量：
JAVA_HOME	C:\Program Files\Java\jdk1.8.0_152

CLASSPATH	%JAVA_HOME%\bin\dt.jar;%JAVA_HOME%\jre\bin\tools.jar

MAVEN_HOME	D:\apache-maven-3.0.5

Path 	%JAVA_HOME%\bin;%JAVA_HOME%\jre\bin;%MAVEN_HOME%\bin;

还要修改一下maven的setting文件

transition过度动画
```
.page-gongdao-head-fixed{
	transition:all .2s ease-out 0s;
	position: fixed;
	background-color: #006bad;
	opacity: 1;
	top: -66px;
	.gongdao-head-container{
		.gongdao-head-logo{
			background: url('../../../../imgs/gongdao/main.png') no-repeat 0 0;
		}
	}

}
.page-gongdao-head-show{
	top: 0;
}
```

# 卸载已安装到全局的 node/npm
1. npm ls -g --depth=0 #查看已经安装在全局的模块，以便删除这些全局模块后再按照不同的 node 版本重新进行全局安装
2. sudo rm -rf /usr/local/lib/node_modules #删除全局 node_modules 目录
3. sudo rm /usr/local/bin/node #删除 node
4. cd /usr/local/bin && ls -l | grep "../lib/node_modules/" | awk '{print $9}'| xargs rm #删除全局 node 模块注册的软链


# 字符串模板中不能使用逻辑与判空，否则会返回undefined

# 那个编译之前 在项目的  deploy\framework\tools\tomcat\bin  下的catalina.bat (mac catalina.sh) 中新增下启动参数：
或者这个文件\deploy\target\web-deploy\bin\catalina.bat
```
-Dunit.routerule.group=UNITBRAIN_BAK_GROUP 
```

#修改vm不生效替换以下文件内容12行
- F:\alibaba-web\20180604_2341271_hzems_1\bundle\src\main\webapp\META-INF\autoconf\resources.xml.vm
```
<resource-alias pattern="/templates" name="/webroot/templates" />
<resource pattern="/templates">
	<res-loaders:file-loader basedir="${app.template.root}"/>
</resource>
改成
#if($curDevMode == "server")
	<resource-alias pattern="/templates" name="/webroot/templates" />
#end
#if($curDevMode == "dev")
	<resource pattern="/templates">
		<res-loaders:file-loader basedir="${app.template.root}"/>
	</resource>
#end
```

# viva内存溢出
node_modules/.bin/webpack.cmd
--max_old_space_size=8192

# Medium Start
104.16.120.127  medium.com
104.16.120.145  api.medium.com
104.16.120.145  cdn-static-1.medium.com
104.16.120.145  cdn-images-1.medium.com
104.16.120.145  cdn-images-2.medium.com
# Medium End
```
刷新DNS解析缓存
ipconfig /flushdns
```

# 新建分支必须要从master上面切

# react声明周期：
								start
								getDefaultProps
								getInitialState
								componentWillMount
								render
								componentDidMount

								running

	props changed				state changed					unmount
componentWillReceiveProps 	shouldComponentUpdate false		componentWillMount
								true							end
								componentWillUpdate
								render
								ComponentDidUpdate



# CORS
```
//必须的，表示接受任意域名的请求
res.header("Access-Control-Allow-Origin", "*");
//必须的，允许请求跨域的http方法
res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
res.header("Content-Type", "application/json;charset=utf-8");
```

# 提示Enter passphrase for key '/Users/MYNAME/.ssh/id_rsa':
```
ssh-add ~/.ssh/id_rsa 
```

# 安装 Homebrew
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
# 卸载
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/uninstall)"

# vscode 乱码
terminal.integrated.fontFamily：Meslo LG M for Powerline