## Linux

```python
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
* **删不掉.swp文件解决方法：结束vim.exe这个进程**
* 修改网卡不起作用  onboot=no  改成yes

## Nginx

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
```

## [docker](http://www.baidu.com)

```python
# 安装
yum install epel-release
yum install docker-io
docker images # 查看镜像
docker ps     # 查看启动容器
docker stop b620e82576b5  # 关闭容器
docker rm b620e82576b5  # 关闭容器
# 安装nginx例子
docker search nginx # 搜索
docker pull nginx
docker run -p 8080:80 -d docker.io/nginx # 启动nginx
docker run -it nginx /bin/bash # 进入容器
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

