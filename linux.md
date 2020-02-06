[TOC]



## 云服务器配置

|           问题            |              解决方法              |
| :-----------------------: | :--------------------------------: |
| 云服务器无法远程连接mysql | 需要在云服务器安全组中配置开放端口 |
|         绑定域名          | 云服务器域名解析 -> 修改nginx配置  |



## Linux

```bash
shutdown -h 10        #计算机将于10分钟后关闭，且会显示在登录用户的当前屏幕中
shutdown -h now       #计算机会立刻关机
shutdown -h 22:22     #计算机会在这个时刻关机
shutdown -r now       #计算机会立刻重启
shutdown -r +10       #计算机会将于10分钟后重启
reboot                #重启
halt                  #关机

# 网卡设置ip
ip addr  # 查看ip 及网卡名
ip add ip addr add 192.168.10.111/24 dev ens33  # 给网卡ens33设置ip为192.168.10.111(临时)
# /24是指子网掩码的位数，一般为255.255.255.0，写作二进制有24个1

# 帮助信息
man  *
info *
* --help
init 3  # 切换为命令行界面
init 5  # 切换为桌面
cd ~    # 切换到用户目录
cd -    # 返回上一次目录
df -hl  # 查看磁盘信息
free -m # 查看内存使用情况
top -u root   # 查看任务管理器
rm -rf  # 强制删除
rmdir test   # 删除test文件夹
tm -i a.txt  # 删除文件前会有提示是否确定删除该文件
tar xf  # 解压
touch a.txt   # 建立一个名为a的txt类型文件
whereis # 用于查找文件、手册等。
find . -name PATTERN    # 从当前目录查找符合 PATTERN 的文件
find /home -name PATTERN -exec ls -l {} \;  # 从 /home 文件查找所有符合 PATTERN 的文件，并交由 ls 输出详细信息 
wget -c url   # 下载 url 并开启断点续传
chmod 777 test.sh  # test.sh添加最高权限
chmod u=rwx, go=rx test.sh # 这个命令中u表示拥有者，g表示group中的用户，o表示others，r可读，w可写，x可执行
less  # 分页查看文件内容 
vim 
u    # 返回上一步
dd   # 删除整行

cp      # 复制
cp a.txt b.txt   # 把文件a的内容复制到b文件
cp a.txt ./test  # 把文件a复制到text目录下
cp -a test test2 # 递归的把目录test下所有文件（包括隐藏的文件）复制到新的目录 test2

start   # 启动
enable  # 开机启动
ps -ef  # 查看所有进程
ps -ef|grep gnome  # 查看特定进程
rpm -qa # 查看所有安装的软件包
rpm -e name   # 卸载软件包
rpm -e name -nodeps   # 卸载软件包（强制卸载）
rpm -ql name  # 查看软件包安装位置

ls -la  # 列出当前目录下的所有文件和文件夹
ls a*   # 列出当前目录下所有以a字母开头的文件
ls -l *.txt  # 列出当前目录下所有后缀名为txt的文件

ln -s /home/web/log.txt link_log  # 设置软链接，类似windows快捷方式

mv a.txt b.txt  # 文件a重新命名为b
mv a.txt ./test # 把文件移动到一个目录下

# 编译
./configure --prefix=/usr/local/php #设置安装位置
make
make install

lsof -i:端口号   # 查看端口
iptables -I INPUT -p tcp --dport 3000 -j ACCEPT   # 开放3000端口

systemctl stop firewalld.service    # 停止firewall
systemctl disable firewalld.service # 禁止firewall开机启动
firewall-cmd --state                # 查看默认防火墙状态（关闭后显示notrunning，开启后显示running）


cat /proc/version  # 查看系统信息

tailf app.log  # 查看日志，自动更新
/boot/grub2/grub.cfg  # 修改命令行分辨率
```
```bash
# 压缩
tar -cvf examples.tar files|dir
#说明：
-c, --create  create a new archive 创建一个归档文件
-v, --verbose verbosely list files processed 显示创建归档文件的进程
-f, --file=ARCHIVE use archive file or device ARCHIVE  后面要立刻接被处理的档案名,比如--file=examples.tar

#举例：
tar -cvf file.tar file1       #file1文件
tar -cvf file.tar file1 file2 #file1，file2文件
tar -cvf file.tar dir         #dir目录

# 解压缩
tar -xvf examples.tar （解压至当前目录下）
tar -xvf examples.tar  -C /path (/path 解压至其它路径)
#说明：
-x, --extract, extract files from an archive 从一个归档文件中提取文件
#举例：
tar -xvf file.tar
tar -xvf file.tar -C /temp  #解压到temp目录下
```

```bash
useradd #添加用户
adduser #添加用户
passwd #为用户设置密码
usermod #修改用户命令，可以通过usermod 来修改登录名、用户的家目录等等；
pwcov #同步用户从/etc/passwd 到/etc/shadow
pwck #pwck是校验用户配置文件/etc/passwd 和/etc/shadow 文件内容是否合法或完整；
pwunconv #是pwcov 的立逆向操作，是从/etc/shadow和 /etc/passwd 创建/etc/passwd ，然后会删除 /etc/shadow 文件；
finger #查看用户信息工具 id #查看用户的UID、GID及所归属的用户组 chfn #更改用户信息工具

su #用户切换工具 sudo #sudo 是通过另一个用户来执行命令（execute a command as another user），su 是用来切换用户，然后通过切换到的用户来完成相应的任务，但sudo 能后面直接执行命令，比如sudo 不需要root 密码就可以执行root 赋与的执行只有root才能执行相应的命令；但得通过visudo 来编辑/etc/sudoers来实现；
visudo #visodo 是编辑 /etc/sudoers 的命令；也可以不用这个命令，直接用vi 来编辑 /etc/sudoers 的效果是一样的；
sudoedit #和sudo 功能差不多；

2）管理用户组（group）的工具或命令；
groupadd #添加用户组；
groupdel #删除用户组；
groupmod #修改用户组信息
groups #显示用户所属的用户组
grpck grpconv #通过/etc/group和/etc/gshadow 的文件内容来同步或创建/etc/gshadow ，如果/etc/gshadow 不存在则创建；
grpunconv #通过/etc/group 和/etc/gshadow 文件内容来同步或创建/etc/group ，然后删除gshadow文件；

# 将一个已有用户 cnzhx 增加到一个已有用户组 apache 中，使此用户组成为该用户的附加用户组，可以使用带 -a 参数的 usermod  指令。-a 代表 append， 也就是将用户添加到新用户组中而不必离开原有的其他用户组。不过需要与 -G 选项配合使用：
usermod -a -G apache cnzhx
# 如果要同时将 cnzhx 的主要用户组改为 apache，则直接使用 -g 选项：
usermod -g apache cnzhx
# 如果要将一个用户从某个组中删除，则
gpasswd -d user group
#但是这个时候需要保证 group 不是 user 的主组。

```

#### CentOS 7防火墙

在CentOS 7或RHEL 7或Fedora中防火墙由firewalld来管理

添加

```
`firewall-cmd ``--zone=public --add-port=80/tcp --permanent （--permanent永久生效，没有此参数重启后失效）` `firewall-cmd ``--zone=public --add-port=1000-2000/tcp --permanent`
```

重新载入

```
`firewall-cmd ``--reload`
```

查看

```
`firewall-cmd ``--zone=public --query-port=80/tcp`
```

删除

```
`firewall-cmd ``--zone=public --remove-port=80/tcp --permanent`
```

开启防火墙

```
`systemctl start firewalld.service`
```

关闭防火墙

```
`systemctl stop firewalld.service`
```

查看运行状态

```
`firewall-cmd --state ``//running 表示运行`
```

* **删不掉.swp文件解决方法：结束vim.exe这个进程**
* 修改网卡不起作用  onboot=no  改成yes

## Nginx

```nginx
# Nginx服务器js加载不全，报206 (Partial Content)错误
proxy_buffer_size 128k;
proxy_buffers   32 128k;
proxy_busy_buffers_size 128k;
```



```nginx
server{
    listen 3001;
    server_name 127.0.0.1;
    location   /test/  {
        # 请求/test/1.jpg（省略了协议和域名），将会返回文件/usr/local/1.jpg
        alias /usr/local/;
        # 请求/test/1.jpg，将会返回文件/usr/local/test/1.jpg。
        root /usr/local/;
        # 请求/test/1.jpg，将会被nginx转发请求到http://127.0.0.1:8080/1.jpg
        proxy_pass http://127.0.0.1:8080/;
    }
}
```



```nginx

start nginx    # 启动
nginx -s stop  # 关闭
./nginx -s reload  # 重启
nginx -t  # 测试nginx 配置

# nginx 参数配置
########### 每个指令必须有分号结束。#################
#user administrator administrators;  #配置用户或者组，默认为nobody nobody。
#worker_processes 2;  #允许生成的进程数，默认为1
#pid /nginx/pid/nginx.pid;   #指定nginx进程运行文件存放地址
error_log log/error.log debug;  #制定日志路径，级别。这个设置可以放入全局块，http块，server块，级别以此为：debug|info|notice|warn|error|crit|alert|emerg
events {
    accept_mutex on;   #设置网路连接序列化，防止惊群现象发生，默认为on
    multi_accept on;  #设置一个进程是否同时接受多个网络连接，默认为off
    #use epoll;      #事件驱动模型，select|poll|kqueue|epoll|resig|/dev/poll|eventport
    worker_connections  1024;    #最大连接数，默认为512
}
http {
    include       mime.types;   #文件扩展名与文件类型映射表
    default_type  application/octet-stream; #默认文件类型，默认为text/plain
    #access_log off; #取消服务日志    
    log_format myFormat '$remote_addr–$remote_user [$time_local] $request $status $body_bytes_sent $http_referer $http_user_agent $http_x_forwarded_for'; #自定义格式
    access_log log/access.log myFormat;  #combined为日志格式的默认值
    sendfile on;   #允许sendfile方式传输文件，默认为off，可以在http块，server块，location块。
    sendfile_max_chunk 100k;  #每个进程每次调用传输数量不能大于设定的值，默认为0，即不设上限。
    keepalive_timeout 65;  #连接超时时间，默认为75s，可以在http，server，location块。

    proxy_buffer_size 128k;
	proxy_buffers   32 128k;
	proxy_busy_buffers_size 128k;
    
    upstream mysvr {   
      server 127.0.0.1:7878;
      server 192.168.10.121:3333 backup;  #热备
    }
    error_page 404 https://www.baidu.com; #错误页
    server {
        keepalive_requests 120; #单连接请求上限次数。
        listen       4545;   #监听端口
        server_name  127.0.0.1;   #监听地址       
        location  ~*^.+$ {       #请求的url过滤，正则匹配，~为区分大小写，~*为不区分大小写。
           #root path;  #根目录
           #index vv.txt;  #设置默认页
           proxy_pass  http://mysvr;  #请求转向mysvr 定义的服务器列表
           deny 127.0.0.1;  #拒绝的ip
           allow 172.18.5.54; #允许的ip           
        } 
    }
}
1、1.$remote_addr 与$http_x_forwarded_for 用以记录客户端的ip地址； 2.$remote_user ：用来记录客户端用户名称； 3.$time_local ： 用来记录访问时间与时区；4.$request ： 用来记录请求的url与http协议；

  5.$status ： 用来记录请求状态；成功是200， 6.$body_bytes_s ent ：记录发送给客户端文件主体内容大小；7.$http_referer ：用来记录从那个页面链接访问过来的； 8.$http_user_agent ：记录客户端浏览器的相关信息；

2、惊群现象：一个网路连接到来，多个睡眠的进程被同事叫醒，但只有一个进程能获得链接，这样会影响系统性能。

3、每个指令必须有分号结束。



# 负载均衡添加服务器节点
upstream nodeserver1 {
    server localhost:3000;
    server localhost:3001;
}
server {
        listen       80;
        server_name  linux.test.com;

        location / {
            proxy_pass  http://nodeserver1;     # 反向代理
            index  index.html  index.htm;
        }
}

server {
	listen       80;
	server_name  brand-trade.qds.com;

	location / {
		proxy_pass http://localhost:8081;
	}
}

# 127.0.0.1:3001/www/index.html
# 目录 D:/site/ol_video/www/index.html
server{
    listen 3001;
    server_name 127.0.0.1;
    location /www/ {
        root D:/site/ol_video/;
    }
}
```

## [docker](http://www.baidu.com)

```bash
# 安装
yum install epel-release
yum install docker-io
docker images # 查看镜像
docker ps     # 查看启动容器
docker stop b620e82576b5  # 关闭容器
docker rm b620e82576b5  # 关闭容器
docker exec -it 00ee65f79c5d /bin/bash  # 进入容器
docker rm b620e82576b5  # 删除容器
docker commit afcaf46e8305 centos-vim   # 保存镜像
docker rmi b4e250e703el   # 删除镜像
# 安装nginx例子
docker search nginx # 搜索
docker pull nginx

docker run -it -p 3000:3000 -v /home/docker_node/test-node:/home/test-node2 --privileged=true node-test # 端口映射，目录挂载
        
docker run -it nginx /bin/bash # 运行容器
docker exec -it 0beeeb8d4f2f /bin/bash  # 进入容器

docker build -t test-node .  # Dockerfile文件目录下执行
```

```python
# docker 镜像迁移
[root@localhost ~]# mkdir /opt/soft/
[root@localhost ~]# docker save c3987965c15d > /opt/soft/postgres.img
[root@localhost ~]# cd /opt/soft
[root@localhost soft]# ls
postgres.img
[root@localhost soft]# sz postgres.img 
 
[root@localhost2 ~]# rz
[root@localhost2 ~]# docker load < postgres.img 
[root@localhost2 ~]# docker images
```


问题

**1.Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?**

```
systemctl daemon-reload
service docker restart
sudo service docker status (should see active (running))
sudo docker run hello-world
```

#### Dockerfile 参数

##### FROM

1. 功能为指定基础镜像，并且必须是第一条指令。
2. 如果不以任何镜像为基础，那么写法为：FROM scratch。

```bash
FROM <image>
FROM <image>:<tag>
FROM <image>:<digest> 
# 三种写法，其中<tag>和<digest> 是可选项，如果没有选择，那么默认值为latest
```

##### RUN

1. 功能为运行指定的命令

```bash
RUN <command>
RUN ["executable", "param1", "param2"]
第一种后边直接跟shell命令
  在linux操作系统上默认 /bin/sh -c
  在windows操作系统上默认 cmd /S /C
第二种是类似于函数调用。
  可将executable理解成为可执行文件，后面就是两个参数。
```

##### CMD

1. 功能为容器启动时要运行的命令

```bash
CMD ["executable","param1","param2"]
CMD ["param1","param2"]
CMD command param1 param2
# 这里边包括参数的一定要用双引号，就是",不能是单引号。千万不能写成单引号。
```

##### RUN & CMD

不要把RUN和CMD搞混了。

RUN是构件容器时就运行的命令以及提交运行结果

CMD是容器启动时执行的命令，在构件时并不运行，构件时紧紧指定了这个命令到底是个什么样子



##### LABEL

1. 功能是为镜像指定标签

```bash
LABEL <key>=<value> <key>=<value> <key>=<value> ...
```

##### MAINTAINER

1. 指定作者

##### EXPOSE

1. 功能为暴漏容器运行时的监听端口给外部
2. 但是EXPOSE并不会使容器访问主机的端口
3. 如果想使得容器与主机的端口有映射关系，必须在容器启动的时候加上 -P参数

##### ENV

1. 功能为设置环境变量

   语法有两种

   ```
   1. ENV <key> <value>
   2. ENV <key>=<value> ...
   ```

   两者的区别就是第一种是一次设置一个，第二种是一次设置多个

##### ADD

 一个复制命令，把文件复制到景象中。

如果把虚拟机与容器想象成两台linux服务器的话，那么这个命令就类似于scp，只是scp需要加用户名和密码的权限验证，而ADD不用。

语法如下：

```
1. ADD <src>... <dest>
2. ADD ["<src>",... "<dest>"]
```

<dest>路径的填写可以是容器内的绝对路径，也可以是相对于工作目录的相对路径

<src>可以是一个本地文件或者是一个本地压缩文件，还可以是一个url

如果把<src>写成一个url，那么ADD就类似于wget命令

如以下写法都是可以的：

```
ADD test relativeDir/ 
ADD test /relativeDir
ADD http://example.com/foobar /
```

尽量不要把<scr>写成一个文件夹，如果<src>是一个文件夹了，复制整个目录的内容,包括文件系统元数据

##### COPY

语法如下：

```
1. COPY <src>... <dest>
2. COPY ["<src>",... "<dest>"]
```

与ADD的区别

COPY的<src>只能是本地文件，其他用法一致

##### 

## linux 生成证书

```bash
1、生成RSA密钥的方法 

openssl genrsa -des3 -out privkey.pem 2048 
这个命令会生成一个2048位的密钥，同时有一个des3方法加密的密码，如果你不想要每次都输入密码，可以改成： 
openssl genrsa -out privkey.pem 2048 
建议用2048位密钥，少于此可能会不安全或很快将不安全。 

2、生成一个证书请求 
openssl req -new -key privkey.pem -out cert.csr 
这个命令将会生成一个证书请求，当然，用到了前面生成的密钥privkey.pem文件 
这里将生成一个新的文件cert.csr，即一个证书请求文件，你可以拿着这个文件去数字证书颁发机构（即CA）申请一个数字证书。CA会给你一个新的文件cacert.pem，那才是你的数字证书。 

如果是自己做测试，那么证书的申请机构和颁发机构都是自己。就可以用下面这个命令来生成证书： 
openssl req -new -x509 -key privkey.pem -out cacert.pem -days 1095 
这个命令将用上面生成的密钥privkey.pem生成一个数字证书cacert.pem 

3、使用数字证书和密钥 

## 有了privkey.pem和cacert.pem文件后就可以在自己的程序中使用了，比如做一个加密通讯的服务器
```



## 安装python

```
yum install zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel gcc make

wget https://www.python.org/ftp/python/3.7.0/Python-3.7.0.tgz

tar -zxvf Python-3.7.0.tgz

```

