## Linux
```perl
init 3  # 切换为命令行界面
init 5  # 切换为桌面
cd ~    # 切换到用户目录
df -hl  # 查看磁盘信息
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

cp      # 复制
cp a.txt b.txt   # 把文件a的内容复制到b文件
cp a.txt ./test  # 把文件a复制到text目录下
cp -a test test2 # 递归的把目录test下所有文件（包括隐藏的文件）复制到新的目录 test2

start   # 启动
enable  # 开机启动
ps -ef  # 查看所有进程
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
./configure
make
make install

iptables -I INPUT -p tcp --dport 3000 -j ACCEPT   # 开放3000端口

systemctl stop firewalld.service    # 停止firewall
systemctl disable firewalld.service # 禁止firewall开机启动
firewall-cmd --state                # 查看默认防火墙状态（关闭后显示notrunning，开启后显示running）


cat /proc/version  # 查看系统信息
```

## Nginx
```c
server {
	listen       80;
	server_name  html.test.com;

	location / {
		root   D:/workspace/nginx_html;
		index  index.html index.php;
		error_page 404 = /404.html;
	}
}
```